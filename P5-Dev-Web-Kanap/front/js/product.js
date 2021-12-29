/*
*       Récupération Id KanapProduct 
*/

let urlSearchParams = (new URL(window.location.href)).searchParams
let productId = urlSearchParams.get('id')
let specProduct = null



/*
*       Récupération data de l'API en fonction de l'ID des Produits
*/

const searchKanapProduct = async () => {
    try {
        let responseApi = await fetch('http://localhost:3000/api/products/' + productId)

        let dataProduct = await responseApi.json()

        if (responseApi.ok) {
            kanapProduct(dataProduct)
        }

    }
    catch (e) {
        console.error(e)
    }
}


/*
*       fonction pour intégrer les éléments de l'API à la page product
*/

const kanapProduct = async (data) => {
    specProduct = data

    //article
    let carteProduct = document.createElement("article")
    document.querySelector("section.item").appendChild(carteProduct)



    //div img
    let divImg = document.createElement("div")
    carteProduct.appendChild(divImg)
    divImg.classList.add("item__img")

    //img
    let imgProduct = document.createElement("img")
    divImg.appendChild(imgProduct)
    imgProduct.setAttribute("src", specProduct.imageUrl)
    imgProduct.setAttribute("alt", specProduct.altTxt)



    //Div MÈRE
    let infos = document.createElement("div")
    carteProduct.appendChild(infos)
    infos.classList.add("item__content")



    //Div Titre/Prix
    let price = document.createElement("div")
    infos.appendChild(price)
    price.classList.add("item__content__titlePrice")

    //Titre
    let nameProduct = document.createElement("h1")
    price.appendChild(nameProduct)
    nameProduct.id = "title"
    nameProduct.textContent = specProduct.name

    //p Prix
    let priceTxt = document.createElement("p")
    price.appendChild(priceTxt)
    //p txt
    priceTxt.innerHTML = "Prix : <span id=\"price\">" + specProduct.price + "</span> €"








    //Div Description
    let description = document.createElement("div")
    infos.appendChild(description)
    description.classList.add("item__content__description")

    //p description titre
    let descriptionTitre = document.createElement("p")
    description.appendChild(descriptionTitre)
    descriptionTitre.classList.add("item__content__description__title")
    descriptionTitre.textContent = "Description :"

    //p description
    let descriptionProduct = document.createElement("p")
    description.appendChild(descriptionProduct)
    descriptionProduct.id = "description"
    descriptionProduct.textContent = specProduct.description



    //Div Paramètres
    let parametres = document.createElement("div")
    infos.appendChild(parametres)
    parametres.classList.add("item__content__settings")


    //Div Parametres Couleurs
    let colorProduct = document.createElement("div")
    parametres.appendChild(colorProduct)
    colorProduct.classList.add("item__content__settings__color")

    //Label Séléction Couleurs 
    let labelColors = document.createElement("label")
    colorProduct.appendChild(labelColors)
    labelColors.setAttribute("for", "color-select")
    labelColors.textContent = "Choisir une couleur :"

    //Select Couleurs
    let selectColors = document.createElement("select")
    colorProduct.appendChild(selectColors)
    selectColors.setAttribute("name", "color-select")
    selectColors.id = "colors"

    //Options Couleurs
    let choiceColor = document.createElement("option")
    selectColors.appendChild(choiceColor)
    choiceColor.value = "Choix"
    choiceColor.textContent = "--SVP, Choisissez une couleur --"

    //Boucle pour intégrer API-array couleurs 
    const colors = specProduct.colors
    colors.forEach(color => {
        let optionColor = document.createElement("option")
        optionColor.value = color
        optionColor.textContent = color
        selectColors.appendChild(optionColor)
    })


    //Div Paramètres Quantité
    let quantityProduct = document.createElement("div")
    parametres.appendChild(quantityProduct)
    quantityProduct.classList.add("item__content__settings__quantity")

    //Label Quantité
    let labelQuantity = document.createElement("label")
    quantityProduct.appendChild(labelQuantity)
    labelQuantity.setAttribute("for", "itemQuantity")
    labelQuantity.textContent = "Nombre d'article(s) (1-100) :"

    //Input Quantité
    let selectQuantity = document.createElement("input")
    quantityProduct.appendChild(selectQuantity)
    selectQuantity.setAttribute("type", "number")
    selectQuantity.setAttribute("name", "itemQuantity")
    selectQuantity.min = 1
    selectQuantity.max = 100
    selectQuantity.value = 0
    selectQuantity.id = "quantity"


    // Div Button 
    let addCart = document.createElement("div")
    infos.appendChild(addCart)
    addCart.classList.add("item__content__addButton")

    //Button Ajout au Panier 
    let buttonAdd = document.createElement("button")
    addCart.appendChild(buttonAdd)
    buttonAdd.id = "addToCart"
    buttonAdd.textContent = "Ajouter au panier"

}

searchKanapProduct()




/*
*      "Ajout au panier"
*/

// Fonction pour s'assurer que le document est correctement généré avant de récupérer les données. 
const docReady = function (fn) {
    // voir si DOM est disponible
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1)
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}


//convertir datas + sauvegarde localStorage + comparaison datas déjà dans localStorage
const pushProductInStorage = (data) => {
    let arrayKanap = []

    if (localStorage.getItem("kanap") == null || localStorage.getItem("kanap") == "undefined") {
        arrayKanap.push(data)
        localStorage.setItem("kanap", JSON.stringify(arrayKanap))

    } else { 
        //on récupère les datas du local storage => tableau.
        if (localStorage.getItem("kanap")) {
            arrayKanap = JSON.parse(localStorage.getItem("kanap"))

            // array pour repérer doublon (localstorage/nouveau produit select)
            const alreadyInCart = arrayKanap.filter((kanap) => 
                kanap.color === data.color && 
                kanap.productId === data.productId)


            //si doublon: somme quantité 2 produits ET chgt qtité dans tableau arrayKanap
                if (alreadyInCart.length) {
                    let sum = parseInt(data.quantity) + parseInt(alreadyInCart[0].quantity)

                    //retrouver l'élément doublon dans arrayKanap et modifier sa somme
                    const elementAlreadyInArrayKanap = arrayKanap.indexOf(alreadyInCart[0])
                    arrayKanap[elementAlreadyInArrayKanap].quantity = sum + ""
                } else {
                    arrayKanap.push(data)
                }


            localStorage.setItem("kanap", JSON.stringify(arrayKanap))
        }
    }
}



docReady(() => {
        const button = document.getElementById("addToCart")
        document.addEventListener('click', function (e) {
            if (e.target && e.target.id == 'addToCart') {
                // Récupération paramètres du Produit à ajouter au panier

                specProduct.color = document.getElementById("colors").value
                specProduct.quantity = document.getElementById("quantity").value

                // Vérification que les paramètres ont été séléctionnés
                if (specProduct.color === "Choix") {
                    alert("Choisissez une couleur ")
                } else {
                    if (specProduct.quantity < 1) {
                        alert("Choisissez une quantitée entre 1 et 100 ")
                    } else {
                        if (specProduct.quantity > 100) {
                            alert("Choisissez une quantitée entre 1 et 100 ")
                        } else {
                            pushProductInStorage(specProduct)
                        }
                    }
                }
            }
        })
    })

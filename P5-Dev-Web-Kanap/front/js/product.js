/*
*       Récupération Id KanapProduct 
*/

let urlSearchParams = (new URL(window.location.href)).searchParams;
let productId = urlSearchParams.get('id');




/*
*       Récupération data de l'API en fonction de l'ID des Produits
*/

const searchKanapProduct = async function () {
    try {
        let responseApi = await fetch ('http://localhost:3000/api/products/' + productId )

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

const kanapProduct = async function(data){
    const specProduct = data
        

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
        alert("Votre produit est ajouté au panier.")
        console.log(arrayKanap)
        console.log(localStorage)


    } else { 
        //on récupère les datas du local storage => tableau.
        if (localStorage.getItem("kanap")) {
            arrayKanap = JSON.parse(localStorage.getItem("kanap"))

            // array pour repérer doublon (localstorage/nouveau produit select)
            const alreadyInCart = arrayKanap.filter((kanap) => 
                kanap.selectedColor === data.selectedColor && 
                kanap.productId === data.productId)
            
            console.log(alreadyInCart.length)
            console.log(data.selectedColor)
            console.log(arrayKanap)


            //si doublon: somme quantité 2 produits ET chgt qtité dans tableau arrayKanap
                if (alreadyInCart.length) {
                    let sum = parseInt(data.selectedQuantity) + parseInt(alreadyInCart[0].selectedQuantity)
                    console.log(sum)
                    console.log(alreadyInCart[0].selectedQuantity)
                    console.log("Produit(s) déjà présent(s) dans le panier. Quantité actualisée: ", sum)
                    console.log(alreadyInCart[0])

                    //retrouver l'élément doublon dans arrayKanap et modifier sa somme
                    const elementAlreadyInArrayKanap = arrayKanap.indexOf(alreadyInCart[0])
                    console.log(elementAlreadyInArrayKanap)
                    arrayKanap[elementAlreadyInArrayKanap].selectedQuantity = sum;

                } else {
                    arrayKanap.push(data)
                }


            localStorage.setItem("kanap", JSON.stringify(arrayKanap))
            console.log("produit ajouté: ", data)
            alert("Votre produit est ajouté au panier.")
        }
    }
}



docReady(function() {
    const button = document.getElementById("addToCart")
    document.addEventListener('click',function(e){
        if(e.target && e.target.id == 'addToCart') {
            // Récupération paramètres du Produit à ajouter au panier
            let selectedColor = document.getElementById("colors").value
            
            let selectedQuantity = document.getElementById("quantity").value
        
            let selectedParam = {
                productId,
                selectedQuantity,
                selectedColor,
            }

            // Vérification que les paramètres ont été séléctionnés
            if (selectedParam.selectedColor === "Choix") {
                alert("Choisissez une couleur ")
            } else {
                if (selectedParam.selectedQuantity < 1) {
                    alert("Choisissez une quantitée entre 1 et 100 ")
                } else {
                    if (selectedParam.selectedQuantity > 100) {
                        alert("Choisissez une quantitée entre 1 et 100 ")
                    } else {
                        pushProductInStorage(selectedParam)
                    } 
                }
            }
        }
    })
})

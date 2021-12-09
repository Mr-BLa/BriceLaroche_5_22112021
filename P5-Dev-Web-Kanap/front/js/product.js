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
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1)
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}


//récupérer les données présentes dans le localStorage
const getProductStorage = () => {
    Object.keys(localStorage).forEach((key) => {
        console.log(localStorage.getItem(key))
    })
}

//convertir datas des produits séléctionnés en json, puis les save dans le localStorage 
const pushProductInStorage = (data) => {
    
    if (localStorage.getItem("kanap") == null || localStorage.getItem("kanap") == "undefined") {
        let arrayKanap = []
        arrayKanap.push(JSON.stringify(data))
        localStorage.setItem("kanap", arrayKanap)
        console.log(localStorage)
    } else { 
        
        let kanapInLocalStorage = []
        kanapInLocalStorage.push(JSON.parse(localStorage.getItem("kanap")))
        kanapInLocalStorage.push(JSON.stringify(data))
        console.log(kanapInLocalStorage)
        localStorage.setItem("kanap", kanapInLocalStorage)
    }
}



// Vérification datas déjà sauvegardés ds local storage



docReady(function() {
    const button = document.getElementById("addToCart")
    document.addEventListener('click',function(e){
        if(e.target && e.target.id== 'addToCart') {
            // Récupération paramètres du Produit à ajouter au panier
            let selectedColor = document.getElementById("colors").value
            
            let selectedQuantity = document.getElementById("quantity").value
        
            let selectedParam = {
                productId,
                selectedQuantity,
                selectedColor,
            }
            pushProductInStorage(selectedParam)
        }
    })
})


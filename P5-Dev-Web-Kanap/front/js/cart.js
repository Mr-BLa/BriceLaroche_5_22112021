/*
*       Récupération du panier/array via Local Storage 
*/
let specProduct = null

let getDataFromLocalStorage = () => {
    let arrayCart = []

    if (localStorage.getItem("kanap") == null || localStorage.getItem("kanap") == "undefined") {
        alert("Votre panier est vide")

    } else {
        if (localStorage.getItem("kanap")) {
            arrayCart = JSON.parse(localStorage.getItem("kanap"))
        }
    }

    for (let i = 0; i < arrayCart.length; i++) {
        const kanapInCart = arrayCart[i]
        elementDuPanier(kanapInCart)
    }

}


/*
 *          Génération <Article>
 */

let elementDuPanier = (data) => {
    specProduct = data
    console.log(specProduct)

    //article
    let carteProduct = document.createElement("article")
    document.querySelector("#cart__items").appendChild(carteProduct)
    carteProduct.setAttribute("data-id", specProduct._id)
    carteProduct.setAttribute("data-color", specProduct.color)
    carteProduct.classList.add("cart__item")



    //Div img 
    let divImg = document.createElement("div")
    carteProduct.appendChild(divImg)
    divImg.classList.add("cart__item__img")

    //img
    let imgProduct = document.createElement("img")
    divImg.appendChild(imgProduct)
    imgProduct.setAttribute("src", specProduct.imageUrl)
    imgProduct.setAttribute("alt", specProduct.altTxt)



    //Div Content
    let content = document.createElement("div")
    carteProduct.appendChild(content)
    content.classList.add("cart__item__content")


    //Div Description Content
    let description = document.createElement("div")
    content.appendChild(description)
    description.classList.add("cart__item__content__description")
    

    //Titre
    let nameProduct = document.createElement("h2")
    description.appendChild(nameProduct)
    nameProduct.textContent = specProduct.name

    //p couleur
    let colorTxt = document.createElement("p")
    content.appendChild(colorTxt)
    colorTxt.textContent = specProduct.color

    //p prix
    let priceTxt = document.createElement("p")
    content.appendChild(priceTxt)
    priceTxt.textContent = specProduct.price + " €"

    //Div Paramètres Content
    let settings = document.createElement("div")
    content.appendChild(settings)
    settings.classList.add("cart__item__content__settings")


    //Div Quantité
    let quantity = document.createElement("div")
    settings.appendChild(quantity)
    quantity.classList.add("cart__item__content__settings__quantity")

    //p quantité
    let qtityTxt = document.createElement("p")
    quantity.appendChild(qtityTxt)
    qtityTxt.textContent = "Qté : "

    //Input Quantité
    let selectQuantity = document.createElement("input")
    quantity.appendChild(selectQuantity)
    selectQuantity.setAttribute("type", "number")
    selectQuantity.classList.add("itemQuantity")
    selectQuantity.setAttribute("name", "itemQuantity")
    selectQuantity.min = 1
    selectQuantity.max = 100
    selectQuantity.value = specProduct.quantity


    // Div Suppr
    let suppr = document.createElement("div")
    settings.appendChild(suppr)
    suppr.classList.add("cart__item__content__settings__delete")

    //p supprimer
    let supprTxt = document.createElement("p")
    suppr.appendChild(supprTxt)
    supprTxt.classList.add("deleteItem")
    supprTxt.textContent = "Supprimer"
}

getDataFromLocalStorage()


/*

*/ 
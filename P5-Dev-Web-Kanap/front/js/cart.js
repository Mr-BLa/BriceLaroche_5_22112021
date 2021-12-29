/*
*       Récupération du panier/array via Local Storage 
*/
let specProduct = null
let arrayCart = []

let getDataFromLocalStorage = () => {

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

    // Article
    let carteProduct = document.createElement("article")
    document.querySelector("#cart__items").appendChild(carteProduct)
    carteProduct.setAttribute("data-id", specProduct._id)
    carteProduct.setAttribute("data-color", specProduct.color)
    carteProduct.classList.add("cart__item")



    // Div img 
    let divImg = document.createElement("div")
    carteProduct.appendChild(divImg)
    divImg.classList.add("cart__item__img")

    // Img
    let imgProduct = document.createElement("img")
    divImg.appendChild(imgProduct)
    imgProduct.setAttribute("src", specProduct.imageUrl)
    imgProduct.setAttribute("alt", specProduct.altTxt)



    // Div Content
    let content = document.createElement("div")
    carteProduct.appendChild(content)
    content.classList.add("cart__item__content")


    // Div Description Content
    let description = document.createElement("div")
    content.appendChild(description)
    description.classList.add("cart__item__content__description")
    

    // Titre
    let nameProduct = document.createElement("h2")
    description.appendChild(nameProduct)
    nameProduct.textContent = specProduct.name

    // P couleur
    let colorTxt = document.createElement("p")
    content.appendChild(colorTxt)
    colorTxt.textContent = specProduct.color

    // P prix
    let priceTxt = document.createElement("p")
    content.appendChild(priceTxt)
    priceTxt.textContent = specProduct.price + " €"

    // Div Paramètres Content
    let settings = document.createElement("div")
    content.appendChild(settings)
    settings.classList.add("cart__item__content__settings")


    // Div Quantité
    let quantity = document.createElement("div")
    settings.appendChild(quantity)
    quantity.classList.add("cart__item__content__settings__quantity")

    // P quantité
    let qtityTxt = document.createElement("p")
    quantity.appendChild(qtityTxt)
    qtityTxt.textContent = "Qté : "

    // Input Quantité
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
    

    // P supprimer
    let supprTxt = document.createElement("p")
    suppr.appendChild(supprTxt)
    supprTxt.classList.add("deleteItem")
    supprTxt.textContent = "Supprimer"
    console.log(arrayCart)
    console.log(localStorage)
    supprTxt.addEventListener("click", ()=>{
        if (confirm("Retirer le Produit du panier?")) {
            //Au clic, retrouver l'index du produit dans l'array Panier. 
            let indexOfProd = arrayCart.indexOf(specProduct)

            //Supprimer le produit de l'array Panier
            if (indexOfProd > -1) {
                arrayCart.splice(indexOfProd, 1)
            }

            //MàJ du localStorage pour y supprimer le produit
            localStorage.setItem("kanap", JSON.stringify(arrayCart))

            //Supprimer l'article correspondant
            supprTxt.closest("article").remove()
        }    
    })
}

getDataFromLocalStorage()


/*

*/ 
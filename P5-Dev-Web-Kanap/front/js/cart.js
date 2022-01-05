/*
*          RECUPERATION DU PANIER/ARRAY VIA LOCAL STORAGE
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
 *          GENERATION <ARTICLE>
 */

let elementDuPanier = (data) => {
    specProduct = data

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

    //Si changement de quantité de produits, sur la page panier
    selectQuantity.addEventListener('change', ()=>{
        //Au chgt, retrouver l'index du produit dans l'array Panier.
        let indexOfProd = arrayCart.indexOf(specProduct)

        //Si nouvelle valeur différente, modification dans l'array Panier et dans local Storage
        if (selectQuantity.value !== arrayCart[indexOfProd].quantity && 1 <= selectQuantity.value <= 100){
            let newQuantity = parseInt(selectQuantity.value)

            //Màj qtité dans l' Array Panier
            arrayCart[indexOfProd].quantity = newQuantity

            //MàJ du localStorage
            localStorage.setItem("kanap", JSON.stringify(arrayCart))

            //Modification de l'affichage du total, si modification de l'input quantité sur la page panier
            showTotal()
        }
    })



    // Div Suppr
    let suppr = document.createElement("div")
    settings.appendChild(suppr)
    suppr.classList.add("cart__item__content__settings__delete")
    

    // P supprimer
    let supprTxt = document.createElement("p")
    suppr.appendChild(supprTxt)
    supprTxt.classList.add("deleteItem")
    supprTxt.textContent = "Supprimer"

    supprTxt.addEventListener("click", ()=>{
        if (confirm("Retirer le Produit du Panier?")) {
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

            /*
            **          ATTENTION BUG A CORRIGER: SI ON ENLEVE LE 1ER ARTICLE DU PANIER, SUPPR LE DERNIER DANS LOCALSTORAGE
            */
        }    
    })


/*                  
*           GESTION SOMME & TOTAL
*/      

    //Dans arrayCart, on récupère et multiplie pour chaque élément du panier: le prix du produit et la quantité choisie. On réalise ensuite la somme des résultats obtenus
    let showTotal = () => {
        let resultSum = null
        let quantityOfProductInCart = null
        for (let i = 0; i < arrayCart.length; i++) {
            resultSum += (parseInt(arrayCart[i].price)) * (parseInt(arrayCart[i].quantity))

            //On récupère la somme des produits présents dans le panier
            quantityOfProductInCart += parseInt(arrayCart[i].quantity)

            // On transfère ces sommes à <div class="cart__price"> pour afficher le prix
            document.querySelector("#totalQuantity").textContent = quantityOfProductInCart
            document.querySelector("#totalPrice").textContent = resultSum
        }
    }
    showTotal()
}


getDataFromLocalStorage()






/*
*          SAISIE ET GESTION DES COORDONNéES
*/


//filterRegex1: trouve tous les caractères qui ne sont pas enregistrés comme: des lettres unicodes, des espaces et des "-"
let filterRegex1 = /[^\p{L}\s-]/giu

//filterRegex2: filterRegex1 avec en plus: chiffres et ","
let filterRegex2 = /[^0-9\p{L},\s-]/giu



// Input Prénom:
let inputFirstName = document.querySelector('input[name="firstName"]')

inputFirstName.addEventListener("input", (e) =>{
    if (filterRegex1.test(e.target.value)) {
        document.querySelector("#firstNameErrorMsg").textContent = "Le prénom doit uniquement contenir des lettres"
        //désactiver le bouton 
        document.querySelector("#order").setAttribute("disabled", true)
    }else{
        document.querySelector("#firstNameErrorMsg").textContent = null
        document.querySelector("#order").removeAttribute("disabled")
    }
})


// Input Nom: 
let inputLastName = document.querySelector('input[name="lastName"]')

inputLastName.addEventListener("input", (e) =>{
    if (filterRegex1.test(e.target.value)) {
        document.querySelector("#lastNameErrorMsg").textContent = "Le nom doit uniquement contenir des lettres"
        //désactiver le bouton 
        document.querySelector("#order").setAttribute("disabled", true)
    }else{
        document.querySelector("#lastNameErrorMsg").textContent = null
        document.querySelector("#order").removeAttribute("disabled")
    }
})


// Input Adresse 
let inputAddress = document.querySelector('input[name="address"]')

inputAddress.addEventListener("input", (e) =>{
    if (filterRegex2.test(e.target.value)) {
        document.querySelector("#addressErrorMsg").textContent = "Adresse invalide"
        //désactiver le bouton 
        document.querySelector("#order").setAttribute("disabled", true)
    }else{
        document.querySelector("#addressErrorMsg").textContent = null
        document.querySelector("#order").removeAttribute("disabled")
    }
})


// Input Ville 
let inputCity = document.querySelector('input[name="city"]')

inputCity.addEventListener("input", (e) =>{
    if (filterRegex1.test(e.target.value)) {
        document.querySelector("#cityErrorMsg").textContent = "Le nom de la Ville doit uniquement contenir des lettres"
        //désactiver le bouton 
        document.querySelector("#order").setAttribute("disabled", true)
    }else{
        document.querySelector("#cityErrorMsg").textContent = null
        document.querySelector("#order").removeAttribute("disabled")
    }
})
/*
*       Récupération du panier/array via Local Storage 
*/


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
        console.log(kanapInCart)
    }
}

getDataFromLocalStorage()


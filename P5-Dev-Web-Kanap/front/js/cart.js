/*
*       Récupération du panier/array via Local Storage 
*/



let getDataFromLocalStorage = (data) => {
    let arrayCart = []

    if (localStorage.getItem("kanap") == null || localStorage.getItem("kanap") == "undefined") {
        alert("Le panier est vide")
    } else {
        if (localStorage.getItem("kanap")) {
            arrayCart = JSON.parse(localStorage.getItem("kanap"))
            console.log(localStorage)
            console.log(arrayCart)
        }
    }

}




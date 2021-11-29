//fonction pour récupérer les items de la liste de l'API 

const kanapItems = async function () {
    try {
        let response = await fetch ('http://localhost:3000/api/products/')

        let listItems = await response.json()
        
        if (response.ok) {
            dataToCards(listItems)
        }

    }
    catch (e) {
        console.error(e)
    }
}


//fonction pour intégrer les éléments de l'API à la page index

const dataToCards = async function(data){

    for (let index = 0; index < data.length; index++) {
        const kanapProduct = data[index]

        let carteKanap = document.createElement("a")
        items.appendChild(carteKanap)
        carteKanap.setAttribute("href", "./product.html?id=" + kanapProduct._id)
        
        let articleKanap = document.createElement("article")
        carteKanap.appendChild(articleKanap)

        let imageKanap = document.createElement("img")
        articleKanap.appendChild(imageKanap)
        imageKanap.setAttribute("src", kanapProduct.imageUrl)
        imageKanap.setAttribute("alt", kanapProduct.altTxt)

        let nameKanap = document.createElement("h3")
        articleKanap.appendChild(nameKanap)
        nameKanap.classList.add("productName")
        nameKanap.textContent = kanapProduct.name

        let descriptionKanap = document.createElement("p")
        articleKanap.appendChild(descriptionKanap)
        descriptionKanap.classList.add("productDescription")
        descriptionKanap.textContent = kanapProduct.description

        console.log(carteKanap)
    }
}

kanapItems()
//fonction pour récupérer les items de la liste de l'API et les intégrer à la page Index
/*il faut créer un lien <a> pour chaque objet de la liste. Le faire via une fonction probablement. ou par le dom? à rechercher
*
*/


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

const dataToCards = async function(data){
    console.log(data) 
    for (let index = 0; index < data.length; index++) {
        const kanapProduct = data[index]

        let carteKanap = document.createElement("a")
        carteKanap.setAttribute("href", "./product.html?id="+kanapProduct._id)

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

/*<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a>

/*    //retranscrire éléments à l'emplacement approprié//

/*colors
 * _id
    name
    price
    imageUrl
    description
    altTxt
 */

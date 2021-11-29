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
    console.log(data); 
    for (let index = 0; index < data.length; index++) {
        const kanapProduct = data[index];

        let carteKanap = document.createElement("a");
        carteKanap.setAttribute("href", "./product.html?id="+kanapProduct._id);

        let articleKanap = document.createElement("article");
        carteKanap.appendChild(articleKanap);
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
//id
    .then(function(_id) {
        document
            .querySelector("#items a")
            .textContent = "./product.html?id=" + `${_id}`;
    })

//img url
    .then(function(imageUrl) {
        document
            .querySelector("#items a article img[src]")
            .textContent = `${imageUrl}`;
    })

//img alt txt
    .then(function(altTxt) {
        document
            .querySelector("#items a article img[alt]")
            .textContent = `${altTxt}`;
    })

//Nom produit
    .then(function(name) {
        document
            .getElementsByClassName("productName")
            .textContent = `${name}`;
    })

//Description Produit
    .then(function(description) {
        document
            .getElementsByClassName("productDescription")
            .textContent = `${description}`;
    })
    




// création Class Carte (pour chaque item)
class Carte {
    constructor(colors, id, name, price, imageUrl, description, altTxt) {
        this.colors = [colors];
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.altTxt = altTxt;
    }
}

// Utilisation res json avec boucle for/in, pour créer des cartes qui nous serviront dans la page index
let listeProduits = res.json();

for (let i in listeProduits) {
    for (let produit in listeProduits) {
        let cartes = [
            new Carte[i] = (`${produit[i].colors}`, `${produit[i]._id}`, `${produit[i].name}`, `${produit[i].price}`, `${produit[i].imageUrl}`, `${produit[i].description}`, `${produit[i].altTxt}` ) 
        ];
        }
}


/*colors
 * _id
    name
    price
    imageUrl
    description
    altTxt
 */

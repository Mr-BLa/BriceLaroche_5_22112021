//fonction pour récupérer les items de la liste de l'API et les intégrer à la page Index
/*il faut créer un lien <a> pour chaque objet de la liste. Le faire via une fonction probablement. ou par le dom? à rechercher
*
*/


let kanapItems = async function () {
    fetch("http://localhost:3000/api/products/")

    //récupérer résultats. Si resultats, ok=> retourner le format json//
    .then(function(res) {
        if (res.ok) {
            let result = res.json();
            return result; 
        }
    })
    //Si erreur
    .catch(function(err) {
        console.log(err);
    });
}
let myItems = await kanapItems();
console.log(myItems);
console.log(kanapItems());





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

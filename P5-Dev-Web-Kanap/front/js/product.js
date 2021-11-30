// Récupération Id KanapProduct 

let urlSearchParams = (new URL(window.location.href)).searchParams;
let productId = urlSearchParams.get('id');




// Récupération data de l'API en fonction de l'ID des Produits

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




//fonction pour intégrer les éléments de l'API à la page product

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
    
    //span ---->>>>  !!!DEFAUT AFFICHAGE!!!  <<<<----
    let priceProduct = document.createElement("span")
    priceTxt.appendChild(priceProduct)
    priceProduct.id = "price"
    priceProduct.textContent = specProduct.price

    //p txt
    priceTxt.textContent = "Prix : " + priceProduct.textContent +" €"



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
    let choixColor = document.createElement("option")
    selectColors.appendChild(choixColor)
    choixColor.value = "Choix"
    choixColor.textContent = "--SVP, Choisissez une couleur --"

    //Boucle pour intégrer array couleurs API
    const colors = specProduct.colors
    colors.forEach(color => {
        let optionColor = document.createElement("option")
        optionColor.value = color 
        optionColor.textContent = color 
        selectColors.appendChild(optionColor)
    });

    console.log(carteProduct)
}

searchKanapProduct()


/*          <div class="item__content__settings">

            <div class="item__content__settings__color">
                                <label for="color-select">Choisir une couleur :</label>
                                <select name="color-select" id="colors">
                                    <option value="">--SVP, choisissez une couleur --</option>
                                    <option value="vert">vert</option>
                                    <option value="blanc">blanc</option>
                                </select>
                                </div>

            <div class="item__content__settings__quantity">
                                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                                </div>
                                </div>



              <div class="item__content__addButton">
                                <button id="addToCart">Ajouter au panier</button>
                                </div>

            </div>
          </article>
        </section>
*/
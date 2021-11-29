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
        
    let carteProduct = document.createElement("article")
    document.querySelector("section.item").appendChild(carteProduct)
    console.log(carteProduct)

    ;
    /*let divImgProduct = document.createElement("div")
    carteProduct.appendChild(divImgProduct)
    divImgProduct.classList.add("item__img")

    let imgProduct = document.createElement("img")
    divImgProduct.appendChild(imgProduct)
    imgProduct.setAttribute("src", kanapProduct.imageUrl)
    imgProduct.setAttribute("alt", kanapProduct.altTxt)

    console.log(carteProduct)*/
}

searchKanapProduct()




/* STRUCTURE PRODUCT.HTML
<section class="item">
          <article>



            <div class="item__img">
              <img src="../images/logo.png" alt="Photographie d'un canapé">
            </div>




            <div class="item__content">


              <div class="item__content__titlePrice">
                <h1 id="title"> Nom du produit </h1>
                <p>Prix : <span id="price"> 42 </span>€</p>
              </div>


              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description"> Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
              </div>


              <div class="item__content__settings">
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

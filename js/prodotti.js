const jsoni = fetch('/E-Commerce/prodotti.json').then(results => results.json())

const testoRicompra = document.getElementById("testoRicompra")
const tuttiIProdotti = document.getElementById("prodotti")

jsoni.then(data => {

    fillAllProducts(data.Prodotti)
    //Top vendite prodotti
})

function fillAllProducts(arrayProdotti) {

    for(i = 0; i < arrayProdotti.length; i++) {
        var stringa = arrayProdotti[i].split(",")
        tuttiIProdotti.innerHTML += `
            <div id = "prodotto">
                <img src = "${stringa[1]}" alt = "Immagine ${stringa[0]}" style="width: 80%">
                <p class = "titoloProdotto">${stringa[0]}</p>
                <p class = "costoProdotto">${stringa[2]}€</p>
            </div>
        `
    }
}
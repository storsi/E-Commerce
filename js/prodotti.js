const testoRicompra = document.getElementById("testoRicompra")
const tuttiIProdotti = document.getElementById("prodotti")

//check box
const cb_informatica = document.getElementById("cb_informatica")
const cb_alimentare = document.getElementById("cb_alimentare")
const cb_cartoleria = document.getElementById("cb_cartoleria")

const linkCSV = '/prodotti.csv'

var data
Papa.parse(linkCSV, {
    download: true,
    complete: function(row) {
        data = row.data
        fillAllProducts()
    }
});

function fillAllProducts() {

    for(i = 1; i < data[0].length; i++) {
        tuttiIProdotti.innerHTML += `
            <div id = "prodotto">
                <img src = "${data[i][2]}" alt = "Immagine ${data[i][0]}" style="width: 80%">
                <p class = "titoloProdotto">${data[i][0]}</p>
                <p class = "costoProdotto">${data[i][1]}€</p>
            </div>
        `
    }
}

function ridisponiProdotti() {
    var tutto = true

    tuttiIProdotti.innerHTML = ""

    if(cb_informatica.checked) {
        tutto = false
        inserisciProdotti("Informatica")
    } 
    if(cb_alimentare.checked) {
        tutto = false
        inserisciProdotti("Alimentare")
    } 
    if(cb_cartoleria.checked) {
        tutto = false
        inserisciProdotti("Cartoleria")
    } 

    if(tutto) fillAllProducts()
}

function inserisciProdotti(categoria) {

    for(i = 1; i < data.length; i++) {
        if(data[i][3] == categoria) {
            tuttiIProdotti.innerHTML += `
                <div id = "prodotto">
                    <img src = "${data[i][2]}" alt = "Immagine ${data[i][0]}" style="width: 80%">
                    <p class = "titoloProdotto">${data[i][0]}</p>
                    <p class = "costoProdotto">${data[i][1]}€</p>
                </div>
            `
        }
    }
}
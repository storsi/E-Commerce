const testoRicompra = document.getElementById("testoRicompra")
const tuttiIProdotti = document.getElementById("prodotti")

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
const linkCSV = '/prodotti.csv'
const contenitoreProdotti = document.getElementById("contenitoreProdotti")
const menuSecondario = document.getElementById("menuSecondario")
let scelta = document.getElementsByClassName("scelta")

var data
var carrello
var indiceCarrello

if(localStorage.getItem("carrello") != null)
    carrello = JSON.parse(localStorage.getItem("carrello"))
else
    carrello = []

indiceCarrello = carrello.length

start()
sceltaPulsanti(scelta)



Papa.parse(linkCSV, {
    download: true,
    complete: function(row) {
        data = row.data
    }
});

function sceltaPulsanti(array) {
    array[0].addEventListener("click", function() {
        inserisciProdotti(" PS4")
    })
    array[1].addEventListener("click", function() {
        inserisciProdotti(" PS5")
        console.log("PS5")
    })
    array[2].addEventListener("click", function() {
        inserisciProdotti(" NINSW")
    })
    array[3].addEventListener("click", function() {
        inserisciProdotti(" XBOX")
    })
    array[4].addEventListener("click", function() {
        inserisciProdotti(" PC")
    })
    array[5].addEventListener("click", function() {
        inserisciProdotti(" ABBONAMENTO")
    })
}

function start() {
    contenitoreProdotti.innerHTML = `
        <div class="scelta"><h1 class="sceltaText">PLAYSTATION 4</h1></div>
        <div class="scelta"><h1 class="sceltaText">PLAYSTATION 5</h1></div>
        <div class="scelta"><h1 class="sceltaText">NINTENDO SWITCH</h1></div>
        <div class="scelta"><h1 class="sceltaText">XBOX</h1></div>
        <div class="scelta"><h1 class="sceltaText">PC</h1></div>
        <div class="scelta"><h1 class="sceltaText">ABBONAMENTI</h1></div>
    `
}

function inserisciProdotti(tipologia) {
    menuSecondario.innerHTML = `
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">PLAYSTATION 4</h1></div>
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">PLAYSTATION 5</h1></div>
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">NINTENDO SWITCH</h1></div>
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">XBOX</h1></div>
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">PC</h1></div>
        <div class="scelta" style="width:12%; height: 5vh; font-size: 1vh; margin-left: 2.5%"><h1 class="sceltaText">ABBONAMENTI</h1></div>
    `

    scelta = document.getElementsByClassName("scelta")

    sceltaPulsanti(scelta)

    contenitoreProdotti.innerHTML = ""

    for(i = 0; i < data.length; i++) {
        if(data[i][4] == tipologia) {
            contenitoreProdotti.innerHTML += `
                <div id="prodotto">
                    <img src="${data[i][3]}" alt="Immagine ${data[i][1]}" id="prodottoImg">
                    <h2 id="prodottoText">${data[i][1]}</h2>
                    <h3 id="prodottoText"">${data[i][2]}€</h1>
                    <button id = "prodottoBottone" onclick="aggiungiAlCarrello(${data[i][0]})">Aggiungi al carrello</button>
                </div>
            `
        }
    }
}

function aggiungiAlCarrello(numeroProdotto) {
    var fatto = false

    for(i = 0; i < carrello.length; i++) {
        const split = carrello[i].split('x')
        if(split[0] == numeroProdotto) {
            console.log(split[1])
            carrello[i] = split[0] + "x" + (parseInt(split[1]) + 1)
            fatto = true
            break
        }
    }

    if(!fatto) {
        carrello[indiceCarrello] = numeroProdotto + "x" + "1"
        indiceCarrello++
    }

    localStorage.setItem("carrello", JSON.stringify(carrello))

    console.log(carrello)
}
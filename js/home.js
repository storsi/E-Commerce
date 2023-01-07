const linkCSV = '/prodotti.csv'

let imgTop3
const giocoInSaldo = document.getElementsByClassName("giocoInSaldo")
let top3Text

const sliderSconti = document.getElementById("sliderSconti")

const account = document.getElementById("imgCarrello")
const carrello = document.getElementById("imgCarrello")

const divSaldi = document.getElementById("saldi")
const imgConsiglio = document.getElementsByClassName("slide")

var indiceSlide = 0
var data
var giochiInSconto = []
var scontoAiGiochi = []
var giochiConsigliati = []
mostraSlide(indiceSlide)

if(sessionStorage.getItem("accountSelezionato") == null) {
    sessionStorage.setItem("accountSelezionato", "-1")
}

Papa.parse(linkCSV, {
    download: true,
    complete: function(row) {
        data = row.data
        estraiSconti()
        estraiGiochiConsigliati()
    }
});

function estraiSconti() {

    console.log(data[133][2] == 0)
    var i = 0

    var random1 = Math.round(Math.random() * data.length)
    giochiInSconto[0] = data[random1]
    scontoAiGiochi[0] = Math.round((Math.random() * 4 + 1)) * 10
    
    var random2 = Math.round(Math.random() * data.length)
    giochiInSconto[1] = data[random2]
    scontoAiGiochi[1] = Math.round((Math.random() * 4 + 1)) * 10
    
    var random3 = Math.round(Math.random() * data.length)
    giochiInSconto[2] = data[random3]
    scontoAiGiochi[2] = Math.round((Math.random() * 4 + 1)) * 10

    localStorage.setItem("giochiInSconto", JSON.stringify(giochiInSconto))
    localStorage.setItem("scontoAiGiochi", JSON.stringify(scontoAiGiochi))

    giocoInSaldo[0].innerHTML = `
        <h1 class="top3Text">1</h1>
        <img src="${giochiInSconto[0][3]}" class="imgTop3" onclick="cercaGioco(${random1})">`

    giocoInSaldo[1].innerHTML = `
        <h1 class="top3Text">2</h1>
        <img src="${giochiInSconto[1][3]}" class="imgTop3" onclick="cercaGioco(${random2})">`

    giocoInSaldo[2].innerHTML = `
        <h1 class="top3Text">3</h1>
        <img src="${giochiInSconto[2][3]}" class="imgTop3" onclick="cercaGioco(${random3})">`

    imgTop3 = document.getElementsByClassName("imgTop3")
    top3Text = document.getElementsByClassName("top3Text")
}

function estraiGiochiConsigliati() {
    var random1 = Math.round(Math.random() * data.length)
    giochiConsigliati[0] = data[random1]

    var random2 = Math.round(Math.random() * data.length)
    giochiConsigliati[1] = data[random2]

    var random3 = Math.round(Math.random() * data.length)
    giochiConsigliati[2] = data[random3]

    imgConsiglio[0].innerHTML += `<img src="${giochiConsigliati[0][3]}" class="immagineSlide" onclick="cercaGioco(${random1})">`
    imgConsiglio[1].innerHTML += `<img src="${giochiConsigliati[1][3]}" class="immagineSlide" onclick="cercaGioco(${random2})">`
    imgConsiglio[2].innerHTML += `<img src="${giochiConsigliati[2][3]}" class="immagineSlide" onclick="cercaGioco(${random3})">`
}


giocoInSaldo[0].addEventListener("click", function() {
    top3Text[0].style.display = "none"
    imgTop3[0].style.display = "block"
})
giocoInSaldo[1].addEventListener("click", function() {
    top3Text[1].style.display = "none"
    imgTop3[1].style.display = "block"
})
giocoInSaldo[2].addEventListener("click", function() {
    top3Text[2].style.display = "none"
    imgTop3[2].style.display = "block"
})

function cercaGioco(numero) {
    window.open('http://127.0.0.1:5500/html/prodotti.html?numero=' + numero, '_self')
}

function slideSuccessiva(movimento) {
    mostraSlide(indiceSlide += movimento)
}

function selezionaSlide(indexSlide) {
    mostraSlide(indiceSlide = indexSlide)
}

function mostraSlide(index) {

    let slides = document.getElementsByClassName("slide")

    if(indiceSlide > slides.length - 1) indiceSlide = 0
    if(indiceSlide < 0) indiceSlide = slides.length - 1

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }

    slides[indiceSlide].style.display = "block"
}
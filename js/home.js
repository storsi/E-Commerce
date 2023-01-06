const jsoni = fetch('/account.json').then(results => results.json())


const sliderSconti = document.getElementById("sliderSconti")

const imgTop3 = document.getElementsByClassName("imgTop3")
const giocoInSaldo = document.getElementsByClassName("giocoInSaldo")
const top3Text = document.getElementsByClassName("top3Text")

const account = document.getElementById("imgCarrello")
const carrello = document.getElementById("imgCarrello")

var indiceSlide = 0
mostraSlide(indiceSlide)


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

jsoni.then(data => {

    //fillHomePage(data.Consigli, data.Riacquista)
    //Top vendite prodotti
})

function slideSuccessiva(movimento) {
    mostraSlide(indiceSlide += movimento)
}

function selezionaSlide(indexSlide) {
    mostraSlide(indiceSlide = indexSlide)
}

function mostraSlide(index) {

    let slides = document.getElementsByClassName("slide")
    let counterSlide = document.getElementsByClassName("counter-slide")

    if(indiceSlide > slides.length - 1) indiceSlide = 0
    if(indiceSlide < 0) indiceSlide = slides.length - 1

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        counterSlide[i].style.display = "none"
    }

    slides[indiceSlide].style.display = "block"
    counterSlide[indiceSlide].style.display = "block"
    counterSlide[indiceSlide].innerText = (indiceSlide + 1) + " / " + slides.length
}
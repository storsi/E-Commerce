const jsoni = fetch('/info.json').then(results => results.json())

const benvenuto = document.getElementById("benvenuto")
const titoloBen = document.getElementById("titoloBen")
const contenutoBen = document.getElementById("contenutoBen")

const inventario = document.getElementById("inventario")
const titoloInv = document.getElementById("titoloInv")
const contenutoInv = document.getElementById("contenutoInv")

const prezzi = document.getElementById("prezzi")
const titoloPrz = document.getElementById("titoloPrz")
const contenutoPrz = document.getElementById("contenutoPrz")

const esport = document.getElementById("esport")
const titoloEsp = document.getElementById("titoloEsp")
const contenutoEsp = document.getElementById("contenutoEsp")
const menuATendina = document.getElementById("menuATendina")
const contenutoMenuATendina = document.getElementById("contenutoMenuATendina")

var contenutoMenuATendinaBool = false

menuATendina.addEventListener("click", function() {
    if(contenutoMenuATendinaBool) {
        contenutoMenuATendina.style.display = "none"
    } else {
        contenutoMenuATendina.style.display = "block"
    }

    contenutoMenuATendinaBool = !contenutoMenuATendinaBool
})


jsoni.then(data => {
    titoloBen.innerText = data.titolo
    contenutoBen.innerText = data.primaParte
    benvenuto.innerHTML += `<img src="${data.immagine1}" id="imgAs">`

    titoloInv.innerText = data.titolo2
    contenutoInv.innerText = data.ilNostroInventario
    inventario.innerHTML += `<img src="${data.immagine2}" id="imgAs">`

    titoloPrz.innerText = data.titolo3
    contenutoPrz.innerText = data.iNostriPrezzi
    prezzi.innerHTML += `<img src="${data.immagine3}" id="imgAs">`

    titoloEsp.innerText = data.titolo4
    contenutoEsp.innerText = data.eSports
    esport.innerHTML += `<img src="${data.immagine4}" id="imgAs">`
})
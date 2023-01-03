const jsoni = fetch('/account.json').then(results => results.json())


const prodotto = document.getElementById("prodotto")

//Sezione consiglia
const testoConsiglia = document.getElementById("testoConsigli")
const prodottiConsigliati = document.getElementById("prodottiConsigliati")

//Sezione ricompra
const testoRicompra = document.getElementById("testoRicompra")
const prodottiRicompra = document.getElementById("prodottiRicompra")




jsoni.then(data => {

    fillHomePage(data.Consigli, data.Riacquista)
    //Top vendite prodotti
})

function fillHomePage(arrayConsigli, arrayRiacquista) {

    //Si occupa della sezione "Prodotti Consigliati"
    if(arrayConsigli.length > 0) {
        testoConsiglia.style.display = "block"
        var numeroComponenti
        if(arrayConsigli.length > 4) {
            numeroComponenti = 4
        } else {
            numeroComponenti = arrayConsigli.length
        }

        for( i = 0; i < numeroComponenti; i++) {
            var stringa = arrayConsigli[i].split(",")
            prodottiConsigliati.innerHTML += `
            <div id = "prodotto">
                <img src = "${stringa[1]}" alt = "Immagine ${stringa[0]}" style="width: 80%">
                <p class = "titoloProdotto">${stringa[0]}</p>
                <p class = "costoProdotto">${stringa[2]}€</p>
            </div>
            `
        }
    } else {
        testoConsiglia.style.display = "none"
        prodottiConsigliati.style.display = "none"
    }

    console.log(arrayConsigli.length)

    //Si occupa della sezione "Prodotti da Riacquistare"
    if(arrayRiacquista.length > 0) {
        testoRicompra.style.display = "block"
        var numeroComponenti
        if(arrayRiacquista.length > 4) {
            numeroComponenti = 4
        } else {
            numeroComponenti = arrayRiacquista.length
        }

        for(i = 0; i < numeroComponenti; i++) {
            var stringa = arrayRiacquista[i].split(",")
            ricompraProdotti.innerHTML += `
                <div id = "prodotto">
                    <img src = "${stringa[1]}" alt = "Immagine ${stringa[0]}" style="width: 80%">
                    <p class = "titoloProdotto">${stringa[0]}</p>
                    <p class = "costoProdotto">${stringa[2]}€</p>
                </div>
                `
        }
    } else {
        testoRicompra.style.display = "none"
        prodottiRicompra.style.display = "none"

    }

    //Si occupa della sezione "Top 3 Prodotti"
}
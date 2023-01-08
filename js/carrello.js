const linkCSV = '/prodotti.csv'

const prodottiCarrello = document.getElementById("prodottiCarrello")
const bottoneConferma = document.getElementById("bottoneConferma")
const nesunProdotto = document.getElementById("senzaProdotti")
const bloccaTutto = document.getElementById("bloccaTutto")
const avvertenza = document.getElementById("avvertenza")
const creaAccountBtn = document.getElementById("creaneUno")
const lasciaStare = document.getElementById("lasciaStare")
const menuATendina = document.getElementById("menuATendina")
const contenutoMenuATendina = document.getElementById("contenutoMenuATendina")

let spesaTot
var carrello
var data
var contenutoMenuATendinaBool = false

var accounts
var accountSelezionato

var giochiInSconto = JSON.parse(localStorage.getItem("giochiInSconto"))
var scontoAiGiochi = JSON.parse(localStorage.getItem("scontoAiGiochi"))

if(localStorage.getItem("accounts") != null)
    accounts = JSON.parse(localStorage.getItem("accounts"))
else
    accounts = []

if(sessionStorage.getItem("accountSelezionato") >= 0) 
    accountSelezionato = parseInt(sessionStorage.getItem("accountSelezionato")) 
else
    accountSelezionato = -1

Papa.parse(linkCSV, {
    download: true,
    complete: function(row) {
        data = row.data
        stampaCarrello()
    }
});

menuATendina.addEventListener("click", function() {
    if(contenutoMenuATendinaBool) {
        contenutoMenuATendina.style.display = "none"
    } else {
        contenutoMenuATendina.style.display = "block"
    }

    contenutoMenuATendinaBool = !contenutoMenuATendinaBool
})

function stampaCarrello() {
    prodottiCarrello.innerHTML = ""
    spesaTot = 0

    if(accountSelezionato == -1) {
        bottoneConferma.disabled = true
        nesunProdotto.style.display = "block";
    } else {

        carrello = accounts[accountSelezionato][8]
        if(carrello.length == 0) {
            bottoneConferma.disabled = true
            bottoneConferma.innerText = "CONFERMA ORDINE"
            nesunProdotto.style.display = "block";
        } else {
            nesunProdotto.style.display = "none";
            bottoneConferma.disabled = false
    
            for(i = 0; i < carrello.length; i++) {
                const split = carrello[i].split('x')
                if(split[0] == giochiInSconto[0][0] || split[0] == giochiInSconto[1][0] || split[0] == giochiInSconto[2][0]) {
                    var prezzo = stampaProdottoScontato(split[0], split[1])

                    spesaTot += parseFloat(prezzo) * split[1]
                } else {
                    prodottiCarrello.innerHTML += `
                    <div id="prodotto">
                        <img src="${data[split[0]][3]}" alt="Immagine ${data[split[0]][1]}" id="prodottoImg">
                        <h2 id="prodottoText">${data[split[0]][1]}</h2>
                        <h3 id="prodottoText"">x${split[1]}&nbsp;&nbsp;${(data[split[0]][2] * split[1]).toFixed(2)}€</h1>
                        <button id = "eliminaDalCarrello" onclick="eliminaElemento(${i})">-</button>
                        <button id = "aggiungiAlCarrello" onclick="aggiungiElemento(${i})">+</button>
                    </div>
                    `
        
                    spesaTot += (parseFloat(data[split[0]][2]) * split[1])
                }
            }
        
            bottoneConferma.innerText = "CONFERMA ORDINE  -  Totale: " + spesaTot.toFixed(2) + "€"
        }
    }
}

function stampaProdottoScontato(numProdotto, quantita) {
    var prodotto = data[numProdotto]
    var nuovoPrezzo
    var valoreSconto
    if(prodotto[0] == giochiInSconto[0][0]) {
        nuovoPrezzo = parseFloat(prodotto[2]) * ((100 - parseFloat(scontoAiGiochi[0])) / 100)
        valoreSconto = scontoAiGiochi[0]
    }
    if(prodotto[0] == giochiInSconto[1][0]) {
        nuovoPrezzo = parseFloat(prodotto[2]) * ((100 - parseFloat(scontoAiGiochi[1])) / 100)
        valoreSconto = scontoAiGiochi[1]
    }
    if(prodotto[0] == giochiInSconto[2][0]) {
        nuovoPrezzo = parseFloat(prodotto[2]) * ((100 - parseFloat(scontoAiGiochi[2])) / 100)
        valoreSconto = scontoAiGiochi[2]
    }

    prodottiCarrello.innerHTML += `
        <div id="prodotto" style="margin: 2%">
            <img src="${prodotto[3]}" alt="Immagine ${prodotto[1]}" id="prodottoImg">
            <h2 id="prodottoText">${prodotto[1]}</h2>
            <h3 id="prodottoText"">x${quantita}&nbsp;&nbsp;<s>${(prodotto[2] * quantita).toFixed(2)}€</s>&nbsp&nbsp${(nuovoPrezzo * quantita).toFixed(2)}€</h3>
            <h3>-${valoreSconto}%</h3>
            <button id = "eliminaDalCarrello" onclick="eliminaElemento(${i})">-</button>
            <button id = "aggiungiAlCarrello" onclick="aggiungiElemento(${i})">+</button>
        </div>
    `

    console.log(nuovoPrezzo)
    return nuovoPrezzo
}

function aggiungiElemento(posizione) {
    const split = carrello[posizione].split('x')
    carrello[posizione] = split[0] + "x" + (parseInt(split[1]) + 1)

    accounts[accountSelezionato][8] = carrello
    stampaCarrello()
}

function eliminaElemento(posizione) {
    const split = carrello[posizione].split('x')

    if(parseInt(split[1]) > 1){
        carrello[posizione] = split[0] + "x" + (parseInt(split[1]) - 1)
    } else {
        for(i = posizione + 1; i < carrello.length; i++) {
            carrello[i - 1] = carrello[i]
        }
    
        carrello.pop()
    }

    accounts[accountSelezionato][8] = carrello
    localStorage.setItem("accounts", JSON.stringify(accounts))
    stampaCarrello()
}

bottoneConferma.addEventListener("click", function() {
    if(carrello.length > 0) {
        confermaOrdine()
    }
})

creaAccountBtn.addEventListener("click", function() {
    bloccaTutto.style.display = "none"
    avvertenza.style.display = "none"
    document.getElementsByTagName("body")[0].style.overflowY = "auto"
    window.open('http://127.0.0.1:5500/html/account.html', '_self')
})

lasciaStare.addEventListener("click", function() {
    bloccaTutto.style.display = "none"
    avvertenza.style.display = "none"
    document.getElementsByTagName("body")[0].style.overflowY = "auto"
})

function confermaOrdine() {

    if(accounts[accountSelezionato][5] == "..." || accounts[accountSelezionato][6] == "..." || accounts[accountSelezionato][7] == "...") {
        bloccaTutto.style.display = "block"
        avvertenza.style.display = "block"
        document.getElementsByTagName("body")[0].style.overflowY = "hidden"
    } else {
        console.log("Manda email")
        carrello = []
        accounts[accountSelezionato][8] = carrello
        bottoneConferma.innerText = "CONFERMA ORDINE"
        localStorage.setItem("accounts", JSON.stringify(accounts))
        stampaCarrello()
    }
}
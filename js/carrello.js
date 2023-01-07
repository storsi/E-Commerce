const linkCSV = '/prodotti.csv'

const prodottiCarrello = document.getElementById("prodottiCarrello")
const bottoneConferma = document.getElementById("bottoneConferma")
const nesunProdotto = document.getElementById("senzaProdotti")

let spesaTot
var carrello
var data

var accounts
var accountSelezionato

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
        
            bottoneConferma.innerText = "CONFERMA ORDINE  -  Totale: " + spesaTot.toFixed(2) + "€"
        }
    }
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

function confermaOrdine() {
    console.log("Manda email")
    carrello = []
    accounts[accountSelezionato][8] = carrello
    bottoneConferma.innerText = "CONFERMA ORDINE"
    localStorage.setItem("accounts", JSON.stringify(accounts))
    stampaCarrello()
}
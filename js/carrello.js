const linkCSV = '/prodotti.csv'

const prodottiCarrello = document.getElementById("prodottiCarrello")
const bottoneConferma = document.getElementById("bottoneConferma")
const nesunProdotto = document.getElementById("senzaProdotti")

let spesaTot
var carrello
var data

if(localStorage.getItem("carrello") != null)
    carrello = JSON.parse(localStorage.getItem("carrello"))
else
    carrello = [] 

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

    if(carrello.length == 0) {
        bottoneConferma.disabled = true
        nesunProdotto.style.display = "block";
    } else {
        nesunProdotto.style.display = "none";
        bottoneConferma.disabled = false

        for(i = 0; i < carrello.length; i++) {
            const split = carrello[i].split('x')
            console.log(split[0] + " " + split[1])
            prodottiCarrello.innerHTML += `
            <div id="prodotto">
                <img src="${data[split[0]][3]}" alt="Immagine ${data[split[0]][1]}" id="prodottoImg">
                <h2 id="prodottoText">${data[split[0]][1]}</h2>
                <h3 id="prodottoText"">x${split[1]}&nbsp;&nbsp;${(data[split[0]][2] * split[1]).toFixed(2)}€</h1>
                <button id = "eliminaDalCarrello" onclick="eliminaElemento(${i})">-</button>
                <button id = "aggiungiAlCarrello" onclick="aggiungiElemento(${i})">+</button>
            </div>
            `
    
            console.log(spesaTot)
            spesaTot += (parseFloat(data[split[0]][2]) * split[1])
        }
    
        var spTot = spesaTot.toFixed(2)
        bottoneConferma.innerText = "CONFERMA ORDINE  -  Totale: " + spTot + "€"
    }
}

function aggiungiElemento(posizione) {
    const split = carrello[posizione].split('x')
    carrello[posizione] = split[0] + "x" + (parseInt(split[1]) + 1)

    localStorage.setItem("carrello", JSON.stringify(carrello))
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

    console.log(carrello)
    localStorage.setItem("carrello", JSON.stringify(carrello))
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
    bottoneConferma.innerText = "CONFERMA ORDINE"
    localStorage.setItem("carrello", JSON.stringify(carrello))
    stampaCarrello()
}
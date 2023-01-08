const linkCSV = '/prodotti.csv'
const contenitoreProdotti = document.getElementById("contenitoreProdotti")
const menuSecondario = document.getElementById("menuSecondario")
let scelta = document.getElementsByClassName("scelta")
const divRicerca = document.getElementById("divRicerca")
const ricerca = document.getElementById("ricerca")
const nessunProdotto = document.getElementById("nessunProdottoTrovato")
const bloccaTutto = document.getElementById("bloccaTutto")
const avvertenza = document.getElementById("avvertenza")
const creaAccountBtn = document.getElementById("creaneUno")
const lasciaStare = document.getElementById("lasciaStare")
const menuATendina = document.getElementById("menuATendina")
const contenutoMenuATendina = document.getElementById("contenutoMenuATendina")

var contenutoMenuATendinaBool = false

var dati
var carrello
var indiceCarrello
var piattaforma = " PS4"

var parametri = window.location.search

if(localStorage.getItem("carrello") != null)
    carrello = JSON.parse(localStorage.getItem("carrello"))
else
    carrello = []

indiceCarrello = carrello.length

var accounts = JSON.parse(localStorage.getItem("accounts"))
var accountSelezionato

var giochiScontati = JSON.parse(localStorage.getItem("giochiInSconto"))
var scontoAiGiochi = JSON.parse(localStorage.getItem("scontoAiGiochi"))

if(sessionStorage.getItem("accountSelezionato") >= 0) {
    accountSelezionato = parseInt(sessionStorage.getItem("accountSelezionato"))
} else {
    accountSelezionato = -1
}

nessunProdotto.style.display = "none"


Papa.parse(linkCSV, {
    download: true,
    complete: function(row) {
        dati = row.data
        inizia()
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

function inizia() {
    if(parametri != "") {
        cercaParametro()
    } else {
        start()
        sceltaPulsanti(scelta)
    }
}

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

function sceltaPulsanti(array) {
    array[0].addEventListener("click", function() {
        piattaforma = " PS4"
        inserisciProdotti()
        attivaBottone()
    })
    array[1].addEventListener("click", function() {
        piattaforma = " PS5"
        inserisciProdotti()
        attivaBottone()
    })
    array[2].addEventListener("click", function() {
        piattaforma = " NINSW"
        inserisciProdotti()
        attivaBottone()
    })
    array[3].addEventListener("click", function() {
        piattaforma = " XBOX"
        inserisciProdotti()
        attivaBottone()
    })
    array[4].addEventListener("click", function() {
        piattaforma = " PC"
        inserisciProdotti()
        attivaBottone()
    })
    array[5].addEventListener("click", function() {
        piattaforma = " ABB"
        inserisciProdotti()
        attivaBottone()
    })
}

function attivaBottone() {
    for(i = 0; i < scelta.length; i++) {
        scelta[i].style.backgroundColor = "white"
    }

    switch(piattaforma) {
        case " PS4": scelta[0].style.backgroundColor = "rgb(200, 200, 200)" 
        break
        case " PS5": scelta[1].style.backgroundColor = "rgb(200, 200, 200)" 
        break
        case " NINSW": scelta[2].style.backgroundColor = "rgb(200, 200, 200)" 
        break
        case " XBOX": scelta[3].style.backgroundColor = "rgb(200, 200, 200)" 
        break
        case " PC": scelta[4].style.backgroundColor = "rgb(200, 200, 200)" 
        break
        case " ABB": scelta[5].style.backgroundColor = "rgb(200, 200, 200)" 
        break
    }
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

function ricercaPrecisa(numero) {
    menuSecondario.innerHTML = `
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PLAYSTATION 4</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PLAYSTATION 5</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">NINTENDO SWITCH</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">XBOX</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PC</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">ABBONAMENTI</h1></div><br>
    `

    scelta = document.getElementsByClassName("scelta")

    sceltaPulsanti(scelta)

    for(i = 1; i < dati.length; i++) {
        if(dati[i][0] == numero) {
            if(parseInt(dati[i][0]) == parseInt(giochiScontati[0][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[1][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[2][0])) {
                stampaProdottoScontato(dati[i])
                break
            } else {
                console.log("OUT")
                contenitoreProdotti.innerHTML += `
                    <div id="prodotto" style="margin: 2%">
                        <img src="${dati[i][3]}" alt="Immagine ${dati[i][1]}" id="prodottoImg">
                        <h2 id="prodottoText">${dati[i][1]}</h2>
                        <h3 id="prodottoText"">${dati[i][2]}€</h1>
                        <button id = "prodottoBottone" onclick="aggiungiAlCarrello(${dati[i][0]})">Aggiungi al carrello</button>
                    </div>
                `
                break
            }
        }
    }
}

function stampaProdottoScontato(prodotto) {
    var nuovoPrezzo
    var valoreSconto
    if(prodotto[0] == giochiScontati[0][0]) {
        nuovoPrezzo = parseFloat(dati[i][2]) * ((100 - parseFloat(scontoAiGiochi[0])) / 100)
        valoreSconto = scontoAiGiochi[0]
    }
    if(prodotto[0] == giochiScontati[1][0]) {
        nuovoPrezzo = parseFloat(dati[i][2]) * ((100 - parseFloat(scontoAiGiochi[1])) / 100)
        valoreSconto = scontoAiGiochi[1]
    }
    if(prodotto[0] == giochiScontati[2][0]) {
        nuovoPrezzo = parseFloat(dati[i][2]) * ((100 - parseFloat(scontoAiGiochi[2])) / 100)
        valoreSconto = scontoAiGiochi[2]
    }

    contenitoreProdotti.innerHTML += `
        <div id="prodotto" style="margin: 2%">
            <img src="${prodotto[3]}" alt="Immagine ${prodotto[1]}" id="prodottoImg">
            <h2 id="prodottoText">${prodotto[1]}</h2>
            <h3 id="prodottoText""><s>${prodotto[2]}€</s>&nbsp&nbsp${nuovoPrezzo.toFixed(2)}€</h3>
            <h3>-${valoreSconto}%</h3>
            <button id = "prodottoBottone" onclick="aggiungiAlCarrello(${prodotto[0]})">Aggiungi al carrello</button>
        </div>
    `
}

function inserisciProdotti() {
    var conProdotti = false

    menuSecondario.innerHTML = `
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PLAYSTATION 4</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PLAYSTATION 5</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">NINTENDO SWITCH</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">XBOX</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">PC</h1></div>
        <div id="sceltaSec" class="scelta"><h1 class="sceltaText">ABBONAMENTI</h1></div><br>
    `

    scelta = document.getElementsByClassName("scelta")

    sceltaPulsanti(scelta)

    if(ricerca.value != "") {
        contenitoreProdotti.innerHTML = ""

        for(i = 1; i < dati.length; i++) {
            if(dati[i][4] == piattaforma && dati[i][1].toLowerCase().includes(ricerca.value.toLowerCase())) {
                conProdotti = true
                if(parseInt(dati[i][0]) == parseInt(giochiScontati[0][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[1][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[2][0])) {
                    stampaProdottoScontato(dati[i])
                } else {
                    contenitoreProdotti.innerHTML += `
                    <div id="prodotto" style="margin: 2%">
                        <img src="${dati[i][3]}" alt="Immagine ${dati[i][1]}" id="prodottoImg">
                        <h2 id="prodottoText">${dati[i][1]}</h2>
                        <h3 id="prodottoText"">${dati[i][2]}€</h1>
                        <button id = "prodottoBottone" onclick="aggiungiAlCarrello(${dati[i][0]})">Aggiungi al carrello</button>
                    </div>
                    `
                }
            }
        }
    } else {
        contenitoreProdotti.innerHTML = ""

        for(i = 1; i < dati.length; i++) {
            if(dati[i][4] == piattaforma) {
                conProdotti = true
                if(parseInt(dati[i][0]) == parseInt(giochiScontati[0][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[1][0]) || parseInt(dati[i][0]) == parseInt(giochiScontati[2][0])) {
                    stampaProdottoScontato(dati[i])
                } else {
                    contenitoreProdotti.innerHTML += `
                    <div id="prodotto" style="margin: 2%">
                        <img src="${dati[i][3]}" alt="Immagine ${dati[i][1]}" id="prodottoImg">
                        <h2 id="prodottoText">${dati[i][1]}</h2>
                        <h3 id="prodottoText"">${dati[i][2]}€</h1>
                        <button id = "prodottoBottone" onclick="aggiungiAlCarrello(${dati[i][0]})">Aggiungi al carrello</button>
                    </div>
                    `
                }
            }
        }
    }

    if(!conProdotti) {
        nessunProdotto.style.display = "block"

        if(piattaforma == " PS4") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>PLAYSTATION 4</span>"
        if(piattaforma == " PS5") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>PLAYSTATION 5</span>"
        if(piattaforma == " XBOX") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>XBOX</span>"
        if(piattaforma == " NINSW") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>NINTENDO SWITCH</span>"
        if(piattaforma == " PC") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>PC</span>"
        if(piattaforma == " ABB") nessunProdotto.innerHTML = "Nessun elemento trovato nella sezione<br><span id='link'>ABBONAMENTI</span>"
            
    } else {
        nessunProdotto.style.display = "none"
    }
}

function cercaParametro() {
    const split = parametri.split('=')
    piattaforma = dati[split[1]][4]
    ricerca.value = dati[split[1]][1]
    ricercaPrecisa(split[1])
    attivaBottone()
}

function annullaRicerche() {
    ricerca.value = ""
    inserisciProdotti()
    attivaBottone()
}

function aggiungiAlCarrello(numeroProdotto) {

    if(parseInt(sessionStorage.getItem("accountSelezionato")) >= 0) {
        var fatto = false
        carrello = accounts[accountSelezionato][8]

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

        accounts[accountSelezionato][8] = carrello

        localStorage.setItem("accounts", JSON.stringify(accounts))
    } else {
        bloccaTutto.style.display = "block"
        avvertenza.style.display = "block"
        document.getElementsByTagName("body")[0].style.overflowY = "hidden"
    }
}
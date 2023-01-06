const creaAccountBtn1 = document.getElementById("creaAccountBtn1")
const creaAccountBtn2 = document.getElementById("creaAccountBtn2")
const creaAccount = document.getElementById("creaAccount")
const accediAccount = document.getElementById("accediAccount")
const nome = document.getElementById("nome")
const cognome = document.getElementById("cognome")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confermaPassword = document.getElementById("confermaPassword")
const linkCambio1 = document.getElementById("link1")
const linkCambio2 = document.getElementById("link2")
const titolo = document.getElementById("titoloAccount")
const sottotitolo = document.getElementById("sottoTitolo")
const emailAccedi = document.getElementById("emailAccedi")
const passwordAccedi = document.getElementById("passwordAccedi")
const errore = document.getElementById("errore")
const tuttiIDati = document.getElementById("tuttiIDati")
const saluto = document.getElementById("saluto")
const infoPersonali = document.getElementById("infoPersonali")
const infoPagamento = document.getElementById("infoPagamento")

var accounts
var account
var accountSelezionato

if(sessionStorage.getItem("accountSelezionato") != null)
    accountSelezionato = JSON.parse(sessionStorage.getItem("accountSelezionato"))
else
    accountSelezionato = -1

if(localStorage.getItem("accounts") != null)
    accounts = JSON.parse(localStorage.getItem("accounts"))
else
    accounts = [] 

if(accountSelezionato != -1) {
    if(accounts[accountSelezionato])
        stampaAccount()
    else   
        sessionStorage.setItem("accountSelezionato", "-1")
}

linkCambio1.addEventListener("click", function() {
    creaAccount.style.display = "none"
    accediAccount.style.display = "block"

    titolo.innerText = "ACCEDI AL TUO ACCOUNT"
})

linkCambio2.addEventListener("click", function() {
    accediAccount.style.display = "none"
    creaAccount.style.display = "block"

    titolo.innerText = "CREA UN ACCOUNT"

    accediAccountBool = false
})

creaAccountBtn2.addEventListener("click", function() {
    for(i = 0; i < accounts.length; i++) {
        if(accounts[i][3] == emailAccedi.value && accounts[i][4] == passwordAccedi.value) {
            accountSelezionato = i
            sessionStorage.setItem("accountSelezionato", JSON.stringify(accountSelezionato))
        }
    }

    if(accountSelezionato == -1) {
        errore.innerText = "ACCOUNT INESISTENTE"
    } else {
        stampaAccount()
    }
})


creaAccountBtn1.addEventListener("click", function() {

    account = []

    if(password.value == confermaPassword.value) {
        var emailUguale = false

        for(i = 0; i < accounts.length; i++) {
            if(accounts[i][3] == email) {
                emailUguale = true
            }
        }
        if(!emailUguale) {
            account[0] = accounts.length
            account[1] = nome.value
            account[2] = cognome.value
            account[3] = email.value
            account[4] = password.value
            account[5] = "..."
            account[6] = "..."
            account[7] = "..."

            accountSelezionato = accounts.length
            sessionStorage.setItem("accountSelezionato", JSON.stringify(accountSelezionato))
            console.log(accountSelezionato)
            accounts[accounts.length] = account

            nome.value = ""
            cognome.value = ""
            email.value = ""
            password.value = ""
            confermaPassword.value = ""

            localStorage.setItem("accounts", JSON.stringify(accounts))
            errore.innerText = ""
            stampaAccount()
        } else {
            errore.innerText = "EMAIL GIÀ IN USO"
        }
    } else {
        errore.innerText = "LE PASSWORD NON CORRISPONDONO"
    }
    
})

function stampaPrivato(stringa) {

    if(stringa != "...") {
        var nuovaStringa = ""

        for(i = 0; i < stringa.length; i++) {
            nuovaStringa += "*"
        }

        return nuovaStringa
    } else {
        return "..."
    }
}

function stampaAccount() {
    titolo.style.display = "none"
    accediAccount.style.display = "none"
    creaAccount.style.display = "none"
    tuttiIDati.style.display = "block"
    console.log(accountSelezionato)
    saluto.innerHTML = "GENTILE CLIENTE,&nbsp<span id='link'> " + accounts[accountSelezionato][1].toUpperCase() + "&nbsp  " + accounts[accountSelezionato][2].toUpperCase() + "</span>"
    infoPersonali.innerHTML = `
        <h2>NOME: ${accounts[accountSelezionato][1]}</h2>
        <h2>COGNOME: ${accounts[accountSelezionato][2]}</h2>
        <h2>EMAIL: ${accounts[accountSelezionato][3]}</h2>
        <h2>PASSWORD: ${stampaPrivato(accounts[accountSelezionato][4])}</h2>
        <button onclick="modificaInfoPersonali()">MODIFICA INFORMAZIONI</button>
    `

        infoPagamento.innerHTML = `
            <h2>NUMERO CARTA: ${stampaPrivato(accounts[accountSelezionato][5])}</h2>
            <h2>DATA DI SCADENZA: ${stampaPrivato(accounts[accountSelezionato][6])}</h2>
            <h2>CODICE DI SICUREZZA: ${stampaPrivato(accounts[accountSelezionato][7])}</h2>
            <button onclick="modificaInfoPagamento()">MODIFICA INFORMAZIONI</button>
        `
}

function modificaInfoPersonali() {
    infoPersonali.innerHTML = `
        <h2>NOME: <input type="text" id="nuovoNome" placeholder="${accounts[accountSelezionato][1]}"></h2>
        <h2>COGNOME: <input type="text" id="nuovoCognome" placeholder="${accounts[accountSelezionato][2]}"></h2>
        <h2>EMAIL: <input type="text" id="nuovaMail" placeholder="${accounts[accountSelezionato][3]}"></h2>
        <h2>PASSWORD: <input type="password" id="nuovaPassword" placeholder="${accounts[accountSelezionato][4]}"></h2>
        <button onclick="modificaIPFatta('personale')">FATTO</button>
    `

    let nuovoNome = document.getElementById("nuovoNome")
    let nuovoCognome = document.getElementById("nuovoCognome")
    let nuovaMail = document.getElementById("nuovaMail")
    let nuovaPassword = document.getElementById("nuovaPassword")
}

function modificaInfoPagamento() {
    infoPagamento.innerHTML = `
        <h2>NUMERO DI CARTA: <input type="text" id="nuovoNCarta" placeholder="${accounts[accountSelezionato][5]}"></h2>
        <h2>DATA DI SCADENZA: <input type="text" id="nuovaDataScad" placeholder="${accounts[accountSelezionato][6]}"></h2>
        <h2>CODICE DI SICUREZZA: <input type="text" id="nuovoCodSicurezza" placeholder="${accounts[accountSelezionato][7]}"></h2>
        <button onclick="modificaIPFatta('pagamento')">FATTO</button>
    `

    let nuovoNCarta = document.getElementById("nuovoNCarta")
    let nuovaDataScad = document.getElementById("nuovaDataScad")
    let nuovoCodSicurezza = document.getElementById("nuovoCodSicurezza")
}

function modificaIPFatta(tipo) {
    if(tipo == "personale") {
        if(nuovoNome.value != "") accounts[accountSelezionato][1] = nuovoNome.value
        if(nuovoCognome.value != "") accounts[accountSelezionato][2] = nuovoCognome.value
        if(nuovaMail.value != "") accounts[accountSelezionato][3] = nuovaMail.value
        if(nuovaPassword.value != "") accounts[accountSelezionato][4] = nuovaPassword.value
    } else {
        if(nuovoNCarta.value != "") accounts[accountSelezionato][5] = nuovoNCarta.value
        if(nuovaDataScad.value != "") accounts[accountSelezionato][6] = nuovaDataScad.value
        if(nuovoCodSicurezza.value != "") accounts[accountSelezionato][7] = nuovoCodSicurezza.value
    }

    localStorage.setItem("accounts", JSON.stringify(accounts))

    stampaAccount()
}
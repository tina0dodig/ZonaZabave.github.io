let korisnik=localStorage.getItem("korisnik");
let korisnickoIme=document.getElementById("imeKorisnika");
korisnickoIme.innerHTML=`${korisnik}`;


let kucice = document.querySelectorAll(".kucica");
let stanje = document.querySelector("#stanje");
let resetiraj = document.querySelector("#resetiraj");
let pokretanje = false;
let uvjetiZaPobjedu = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let opcije = ["", "", "", "", "", "", "", "", ""];
let trenutniIgrac = "X";
postaviIgru();

function postaviIgru() {
    kucice.forEach(kucica => kucica.addEventListener("click", kucicaKliknuta));
    resetiraj.addEventListener("click", resetirajIgru);
    stanje.textContent = `Na redu je igrač ${trenutniIgrac}`;
    pokretanje = true;
}

function kucicaKliknuta() {
    let kuciceIndex = this.getAttribute("kuciceIndex");
    if (opcije[kuciceIndex] != "" || !pokretanje) {
        return;
    }

    promjenaKucice(this, kuciceIndex);
    provjeraPobjede();


}

function promjenaKucice(kucica, index) {
    opcije[index] = trenutniIgrac;
    kucica.textContent = trenutniIgrac;
}

function promijeniIgraca() {
    trenutniIgrac = (trenutniIgrac == 'X') ? 'O' : 'X';
    stanje.textContent = `Na redu je igrač ${trenutniIgrac}`;
}

function provjeraPobjede() {
    let pobjednickaRunda = false;

    for (i = 0; i < uvjetiZaPobjedu.length; i++) {
        let uvjeti = uvjetiZaPobjedu[i];
        let kucicaA = opcije[uvjeti[0]];
        let kucicaB = opcije[uvjeti[1]];
        let kucicaC = opcije[uvjeti[2]];

        if (kucicaA == "" || kucicaB == "" || kucicaC == "") {
            continue;
        }

        if (kucicaA == kucicaB && kucicaB == kucicaC) {
            pobjednickaRunda = true;
            break;
        }
    }

    if (pobjednickaRunda) {
        stanje.textContent = `Igrač ${trenutniIgrac} je pobijedio!`;
        pokretanje = false;
    }

    else if (!opcije.includes("")) {
        stanje.textContent = "Igra je neriješena!"
        pokretanje = false;
    }
    else {
        promijeniIgraca();
    }

}

function resetirajIgru() {
    trenutniIgrac = "X";
    opcije = ["", "", "", "", "", "", "", "", ""];
    stanje.textContent = `Na redu je igrač ${trenutniIgrac}`;
    kucice.forEach(kucica => kucica.textContent = "");
    pokretanje = true;
}

resetirajIgru();
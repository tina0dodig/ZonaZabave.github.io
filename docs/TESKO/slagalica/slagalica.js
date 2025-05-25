let korisnik=localStorage.getItem("korisnik");
let korisnickoIme=document.getElementById("imeKorisnika");
korisnickoIme.innerHTML=`${korisnik}`;

let kucica, pokusaji = 0, pKucica, kKucica, redci, stupci, mapa, slike, standardniPoredak;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("razine").addEventListener("change", pokretanjeIgre);
    igra = document.getElementById("igra")
    pokretanjeIgre();
})

//pokrece se kada je odabrana neka od opcija
function pokretanjeIgre() {
    pokusaji = 0;
    igra.innerHTML = "";
    let odabir = document.getElementById("razine").value;
    //napravila sam pojedine znacajke za svaku razinu
    if (odabir == "lagano") {
        redci = 3;
        stupci = 3;
        mapa = "slagalica2/";
        slike = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
        standardniPoredak = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        igra.style.gridTemplateColumns = `repeat(${3}, 1fr)`;//ovo sam dodala kako nebi trebala definirati sirinu i visinu slika u css-u
    }

    if (odabir == "srednje") {
        redci = 4;
        stupci = 4;
        mapa = "slagalica3/";
        slike = ["13", "4", "10", "2", "11", "8", "16", "5", "12", "1", "6", "14", "7", "9", "15", "3"];
        standardniPoredak = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
        igra.style.gridTemplateColumns = `repeat(${4}, 1fr)`;
    }

    if (odabir == "tesko") {
        redci = 5;
        stupci = 5;
        mapa = "slagalica1/"
        slike = ["4", "22", "18", "5", "11", "9", "3", "16", "24", "6", "13", "21", "14", "19", "7", "23", "15", "8", "20", "1", "17", "12", "2", "25", "10"];
        standardniPoredak = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
        igra.style.gridTemplateColumns = `repeat(${5}, 1fr)`;
    }

    for (let r = 0; r < redci; r++) {
        for (let s = 0; s < stupci; s++) {
            let kucica = document.createElement("img");
            kucica.id = r.toString() + "-" + s.toString();
            kucica.src = mapa + slike.shift() + ".jpeg";

            kucica.addEventListener("dragstart", dragStart);
            kucica.addEventListener("dragover", dragOver);
            kucica.addEventListener("dragEnter", dragEnter);
            kucica.addEventListener("dragend", dragEnd);
            kucica.addEventListener("drop", dragDrop);

            document.getElementById("igra").appendChild(kucica);
        }
    }
}

function dragStart() {
    pKucica = this;
}

function dragOver(e) {
    e.preventDefault(); //ovo mi je event da se ne blokira funkcija drop
}
function dragEnter(e) {
    e.preventDefault(); //ovo mi je event da se ne blokira funkcija drop
}

function dragDrop() {
    kKucica = this; //this mi se odnosi na img tag
}

//ovdje sam dodala koordinate kako se slika moze premjestati u samo u istom stupcu i retku i azurira mi se broj pokusaja
function dragEnd() {
    let pKoordinate = pKucica.id.split("-");
    let r = parseInt(pKoordinate[0]);
    let s = parseInt(pKoordinate[1]);

    let kKoordinate = kKucica.id.split("-");
    let r2 = parseInt(kKoordinate[0]);
    let s2 = parseInt(kKoordinate[1]);

    let pomakLijevo = r == r2 && s2 == s - 1;
    let pomakDesno = r == r2 && s2 == s + 1;
    let pomakGore = s == s2 && r2 == r - 1;
    let pomakDolje = s == s2 && r2 == r + 1;

    let pomakJeDozvoljen = pomakLijevo || pomakDesno || pomakDolje || pomakGore;

    if (pomakJeDozvoljen) {
        let pSlika = pKucica.src;
        let kSlika = kKucica.src;

        pKucica.src = kSlika;
        kKucica.src = pSlika;

        pokusaji++;
        document.getElementById("pokusaji").innerText = pokusaji;

        provjeriRedoslijed();
    }
    //ovom funkcijom provjeravam je li korisnik ispravno slozio slagalicu
    function provjeriRedoslijed() {
        let sveSlike = document.querySelectorAll("#igra img");
        niz = [];

        for (let i = 0; i < sveSlike.length; i++) {
            let ime = sveSlike[i].src.split("/").pop();
            let br = ime.split(".")[0];
            niz.push(br);
        }
        if (JSON.stringify(niz) == JSON.stringify(standardniPoredak)) {
            setTimeout(() => {
                alert("BRAVO! Uspješno si složio slagalicu.")
            }, 200)
        }

    }


}

let korisnik=localStorage.getItem("korisnik");
let korisnickoIme=document.getElementById("imeKorisnika");
korisnickoIme.innerHTML=`${korisnik}`;

let igrac, racunalo, bodoviIgrac = 0, bodoviRcunalo = 0;
let zapocniIgru = document.getElementById("pocetak");
let otkrij = document.querySelector(".hidden");

let opcije = [
    "kamen",
    "skare",
    "papir"
];

zapocniIgru.onclick = function () {
    ponovnaIgra();
    for (let i = 0; i < 3; i++) {
        let odabir = document.createElement("img");
        odabir.id = opcije[i];
        odabir.src = "kamen-skare-papir/" + opcije[i] + ".png";
        odabir.addEventListener("click", izabranaOpcija);
        document.getElementById("odabir").append(odabir);
    }
    otkrij.classList.remove("hidden");

}

function izabranaOpcija() {
    igrac = this.id;
    document.getElementById("slika1").src = "kamen-skare-papir/" + igrac + ".png";

    racunalo = opcije[Math.floor(Math.random() * 3)];
    document.getElementById("slika2").src = "kamen-skare-papir/" + racunalo + ".png";

    if (igrac == racunalo) {
        bodoviIgrac++;
        bodoviRcunalo++;
    }
    else {
        if (igrac == "kamen") {
            if (racunalo == "skare") {
                bodoviIgrac++;
            }
            else if (racunalo == "papir") {
                bodoviRcunalo++;
            }
        }
        else if (igrac == "skare") {
            if (racunalo == "kamen") {
                bodoviRcunalo++;
            }
            else if (racunalo == "papir") {
                bodoviIgrac++;
            }
        }
        else if (igrac == "papir") {
            if (racunalo == "kamen") {
                bodoviIgrac++;
            }
            else if (racunalo == "skare") {
                bodoviRcunalo++;
            }
        }
    }


    document.getElementById("bodovi1").innerHTML = `<h1>Bodovi igrača: ${bodoviIgrac}</h1>`;
    document.getElementById("bodovi2").innerHTML = `<h1>Bodovi računala: ${bodoviRcunalo}</h1>`;

    if (bodoviIgrac == 5 || bodoviRcunalo == 5) {
        setTimeout(() => {
            if (bodoviIgrac == 5 && bodoviRcunalo == 5) {
                alert(`Izjednačeni ste!`);
                ponovnaIgra();
            }
            else if (bodoviIgrac == 5) {
                alert(`Pobijedili ste!`);
                ponovnaIgra();
            }
            else if (bodoviRcunalo == 5) {
                alert(`Izgubili ste! Pokušajte ponovno!`);
                ponovnaIgra();
            }

        }, 500)
    }
}

function ponovnaIgra() {
    bodoviIgrac = 0;
    bodoviRcunalo = 0;
    document.getElementById("odabir").innerHTML = "";
    document.getElementById("bodovi1").innerHTML = "0";
    document.getElementById("bodovi2").innerHTML = "0";
    document.getElementById("slika1").src = "";
    document.getElementById("slika2").src = "";
    otkrij.classList.add("hidden");
}


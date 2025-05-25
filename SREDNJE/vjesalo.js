let korisnik = localStorage.getItem("korisnik");
let korisnickoIme = document.getElementById("imeKorisnika");
korisnickoIme.innerHTML = `${korisnik}`;

let slova = document.getElementById("slova");
let opcije = document.getElementById("opcije");
let upis = document.getElementById("upis");
let novaIgra = document.getElementById("novaIgra");
let btnNovaIgra = document.getElementById("btn-novaIgra");
let canvas = document.getElementById("canvas");
let ispis = document.getElementById("ispis");

let opcije1 = {
  voće: ["Jabuka", "Borovnica", "Klementina", "Lubenica", "Banana", "Dunja", "Mandarina", "Dinja", "Jagoda", "Grejp", "Malina"],
  životinje: ["Nosorog", "Krokodil", "Leopard", "Tigar", "Paun", "Papagaj", "Lav", "Sova", "Mravojed", "Medvjed", "Ris", "Anakonda", "Mrav", "Slon", "Krava", "Magarac", "Lisica", "Vjeverica", "Bumbar", "Tarantula"],
  gradovi: ["Split", "Imotski", "Zagreb", "Obrovac", "Crikvenica", "Ozalj", "Trogir", "Vukovar", "Lepoglava", "Novalja", "Makarska", "Rijeka", "Vinkovci", "Bjelovar", "Dubrovnik"],
};

let brojacPobjeda = 0;
let brojac = 0;

let izabranaRijec = "";

let prikaziOpcije = () => {
  opcije.innerHTML += `<h3>Odaberite opciju i krenite u avanturu:</h3>`;
  let klikOpcije = document.createElement("div");
  for (let value in opcije1) {
    klikOpcije.innerHTML += `<button class="opcije2" onclick="odabranaRijec('${value}')">${value}</button>`;
  }
  opcije.appendChild(klikOpcije);
};

let onemoguci = () => {
  let btnOpcije = document.querySelectorAll(".opcije2");
  let btnSlova = document.querySelectorAll(".slova1");
  btnOpcije.forEach((button) => {
    button.disabled = true;
  });
  btnSlova.forEach((button) => {
    button.disabled.true;
  });
  novaIgra.classList.remove("hide");
};

let odabranaRijec = (vrijednostOpcija) => {
  let btnOpcije = document.querySelectorAll(".opcije2");
  btnOpcije.forEach((button) => {
    if (button.innerText.toLowerCase() === vrijednostOpcija) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  slova.classList.remove("hide");
  upis.innerText = "";

  let nizOpcija = opcije1[vrijednostOpcija];

  izabranaRijec = nizOpcija[Math.floor(Math.random() * nizOpcija.length)];
  izabranaRijec = izabranaRijec.toUpperCase();

  let prikazSlova = izabranaRijec.replace(/./g, '<span class="crtice">_</span>');

  upis.innerHTML = prikazSlova;
};

let prepoznavatelj = () => {
  brojacPobjeda = 0;
  brojac = 0;

  upis.innerHTML = "";
  opcije.innerHTML = "";
  slova.classList.add("hide");
  novaIgra.classList.add("hide");
  slova.innerHTML = "";

  for (let i = 65; i < 91; i++) {
    let btn = document.createElement("button");
    btn.classList.add("slova1");
    btn.innerText = String.fromCharCode(i);
    btn.addEventListener("click", () => {
      let nizZnakova = izabranaRijec.split("");
      let crtice = document.getElementsByClassName("crtice");
      if (nizZnakova.includes(btn.innerText)) {
        nizZnakova.forEach((znak, index) => {
          if (znak === btn.innerText) {
            crtice[index].innerText = znak;
            brojacPobjeda++;
            if (brojacPobjeda == nizZnakova.length) {
              ispis.innerHTML = `<h2 class='pPoruka'>Pobijedio/la si!!</h2><p>Tvoja riječ je bila: <span>${izabranaRijec}</span></p>`;
              onemoguci();
            }
          }
        });
      } else {
        brojac++;
        crtajCovjeculjka(brojac);
        if (brojac == 6) {
          ispis.innerHTML = `<h2 class='gPoruka'>Izgubio/la si!!</h2><p>Tvoja riječ je bila: <span>${izabranaRijec}</span></p>`;
          onemoguci();
        }
      }
      btn.disabled = true;
    });
    slova.append(btn);
  }

  prikaziOpcije();
  let { crtez } = canvasCreator();
  crtez();
};
//pronasla sam na internetu kako uz pomoc canvasa napraviti linije za covjeculjka
let canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;
  let linija = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  let glava = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  let tijelo = () => {
    linija(70, 40, 70, 80);
  };

  let lijevaRuka = () => {
    linija(70, 50, 50, 70);
  };

  let desnaRuka = () => {
    linija(70, 50, 90, 70);
  };

  let lijevaNoga = () => {
    linija(70, 80, 50, 110);
  };

  let desnaNoga = () => {
    linija(70, 80, 90, 110);
  };

  let crtez = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    linija(10, 130, 130, 130);
    linija(10, 10, 10, 131);
    linija(10, 10, 70, 10);
    linija(70, 10, 70, 20);
  };

  return { crtez, glava, tijelo, lijevaRuka, desnaRuka, lijevaNoga, desnaNoga };
};

let crtajCovjeculjka = (brojac) => {
  let { glava, tijelo, lijevaRuka, desnaRuka, lijevaNoga, desnaNoga } = canvasCreator();
  switch (brojac) {
    case 1:
      glava();
      break;
    case 2:
      tijelo();
      break;
    case 3:
      lijevaRuka();
      break;
    case 4:
      desnaRuka();
      break;
    case 5:
      lijevaNoga();
      break;
    case 6:
      desnaNoga();
      break;
    default:
      break;
  }
};
btnNovaIgra.addEventListener("click", prepoznavatelj);
window.onload = prepoznavatelj;
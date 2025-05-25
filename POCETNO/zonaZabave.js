if (!sessionStorage.getItem('startTime')) {
    sessionStorage.setItem('startTime', Date.now());
}

document.getElementById('kraj').addEventListener('click', () => {
    let krajVremena = Date.now();
    let pocetakVremena = sessionStorage.getItem('startTime');


    let sec = Math.floor((krajVremena - pocetakVremena) / 1000);

    document.getElementById('krajnjeVrijeme').textContent = `Provedeno vrijeme igrajući: ${sec} sekundi`;
    document.getElementById('vrijeme').classList.remove('hidden');
});
function natrag() {
    document.getElementById('vrijeme').classList.add('hidden');
}
function odjava() {
    localStorage.removeItem("korisnik");
    sessionStorage.removeItem('startTime');
    window.location.href = 'index.html';
}
/*https://www.w3schools.com/jsref/prop_win_sessionstorage.asp*/
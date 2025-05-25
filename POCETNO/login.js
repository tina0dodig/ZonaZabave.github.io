function ispravnaPrijava(e) {
    e.preventDefault();
    let ime = document.getElementById("ime").value;
    let lozinka = document.getElementById("lozinka").value;

    if (ime === "" || lozinka === "") {
        alert(`Unesite valjano korisničko ime i lozinku!`);
    }
    else {
        localStorage.setItem("korisnik",ime);
        window.location.href = "zonaZabave.html";
    }
}
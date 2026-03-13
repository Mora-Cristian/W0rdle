const usernameInput = document.getElementById("username");
const bottone = document.getElementById("login-btn");
const risultato = document.getElementById("risultato");

bottone.addEventListener("click", () => {
    const username = usernameInput.value.trim();

    if (username === "") {
        risultato.textContent = "Inserisci uno username!";
        return;
    }
    risultato.textContent = "Accesso in corso...";
    setTimeout(() => {
        window.location.href = "main.html?user=" + username;
    }, 800);

});
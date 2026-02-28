let listaSoluzioni;
let parolaSegreta;
async function scaricoDati(file) {
    await fetch(file)
        .then(response => response.json())
        .then(data => {
            listaSoluzioni = data;
        })
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//FUNZIONE PAROLA SEGRETA:
function creaParolaSegreta(lista) {
    nRandom = randomInt(0, lista.length - 1);
    parolaSegreta = lista[nRandom];
}

//FUNZIONE CONTROLLO PAROLA:
function controlloParola(parolaInput, parolaDaindovinare) {
    if (parolaInput == parolaDaindovinare) {
        return true;
    }
    return false;
}


//FUNZIONE INIZIALE: scarico tutto il json su una variabile e poi INIZIO CON IL RESTO DEL PROGRAMMA
scaricoDati("/5lettere.json").then(() => {
    creaParolaSegreta(listaSoluzioni)
    console.log(parolaSegreta)

    //QUANDO SCRIVO PASSO ALLA RIGA SUCCESSIVA
    document.querySelectorAll('.cella').forEach((input, index, array) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < array.length - 1) {
                array[index + 1].focus(); // passa alla cella successiva
            }
        });
    });
    //PAROLA INSERITA:
    let parola;
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            parola = ''; // inizializza come stringa vuota!

            document.querySelectorAll(".cella").forEach((cella) => {
                parola += cella.value; // prendi il valore dell'input
            });

            console.log(parola);
        }
        if (controlloParola(parola, parolaSegreta)) {
            alert("Hai vinto! premi ok per fare una nuova partita!!")
            setTimeout(() => {
                location.reload();
            }, 1000); // refresh dopo 1 secondi
        }
        else {
            //to do
        }
    });



});
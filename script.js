let listaSoluzioni;
let parolaSegreta;
let contatore = 0;
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

//
//FUNZIONE PAROLA SEGRETA:
function creaParolaSegreta(lista) {
    nRandom = randomInt(0, lista.length - 1);
    parolaSegreta = lista[nRandom];
}

//FUNZIONE CONTROLLO PAROLA:
function controlloParola(parolaInput, parolaDaindovinare) {
    if (parolaInput.toLowerCase() == parolaDaindovinare) {
        return true;
    }
    return false;
}

//funzione controllo caselle:
function controlloCaselle(listaCelle, parolaDaindovinare) {
    listaSegreta = [];
    for (let i = 0; i < parolaDaindovinare.length; i++) {
        listaSegreta.push(parolaDaindovinare[i]);
    };

    //caselle verdi:
    listaCelle.forEach((element, index) => {
        if (element.value.toLowerCase() == listaSegreta[index]) {
            element.classList.add("classeVerde");
            listaSegreta[index] = null;
        }
    });

    //caselle gialle:
    listaCelle.forEach((element) => {
        if (!element.classList.contains("classeVerde")) {
            //indexOf ritorna l'indice se è presente altrimenti -1
            let pos = listaSegreta.indexOf(element.value.toLowerCase());  

            if (pos !== -1) {  
                element.classList.add("classeGialla");
            }
        }
})
}

//funzione aggiungi caselle:
function aggiungiRiga() {
    contatore++;
    let id = "cella" + contatore;
    const griglia = document.getElementById("griglia");
    // Crea nuova riga
    const nuovaRiga = document.createElement("div");
    nuovaRiga.classList.add("riga");

    // Crea 5 celle
    for (let i = 0; i < 5; i++) {
        const cella = document.createElement("input");
        cella.type = "text";
        cella.id = id;
        cella.classList.add("cella");
        cella.maxLength = 1;
        nuovaRiga.appendChild(cella);
    }

    griglia.appendChild(nuovaRiga);

    // Aggiungi eventi alle nuove celle
    id = "#" + id;
    const nuoveCelle = nuovaRiga.querySelectorAll(id);
    nuoveCelle.forEach((input, index, array) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < array.length - 1) {
                array[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value === '' && index > 0) {
                array[index - 1].focus();
            }
        });
    });

    // Focus sulla prima cella della nuova riga
    nuoveCelle[0].focus();
    listaCelle = nuoveCelle;
}


//FUNZIONE INIZIALE: scarico tutto il json su una variabile e poi INIZIO CON IL RESTO DEL PROGRAMMA
scaricoDati("/5lettere.json").then(() => {
    id = "#cella" + contatore;
    creaParolaSegreta(listaSoluzioni)
    console.log(parolaSegreta)
    let parola = '';
    listaCelle = document.querySelectorAll(id);
    //QUANDO SCRIVO PASSO ALLA RIGA SUCCESSIVA
    listaCelle.forEach((input, index, array) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < array.length - 1) {
                array[index + 1].focus(); // passa alla cella successiva
            }
        });
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value === '' && index > 0) {
                array[index - 1].focus();
            }
        });
    });
    document.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {
            let parola = "";
            listaCelle.forEach((cella) => {
                parola += cella.value;
            });
            if (parola.length == 5) {
                if (listaSoluzioni.includes(parola.toLowerCase())) {
                    if (controlloParola(parola, parolaSegreta)) {
                        alert("Hai vinto! premi ok per fare una nuova partita!!");
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        controlloCaselle(listaCelle, parolaSegreta);
                        setTimeout(() => {
                            aggiungiRiga();
                        }, 1000);
                    }
                } else {
                    alert("Non esiste questa parola!")
                }
            }
            else {
                alert("Inserisci 5 lettere!");
            }
        }
    });
});

//PAROLA INSERITA:





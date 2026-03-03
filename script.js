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

//funzione aspetta, siccome in java non c'è un qualcosa per bloccare il programma per tot
function aspetta(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
            aggiornaTastiera(element.value, "verde")
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
                aggiornaTastiera(element.value, "giallo");
                listaSegreta[pos] = null;
            } else {
                aggiornaTastiera(element.value, "grigio");
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

//creazione tastiera:
function creaTastiera() {
    const righe = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['INVIO', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    const tastiera = document.getElementById('tastiera');

    righe.forEach(riga => {
        const rigaDiv = document.createElement('div');
        rigaDiv.classList.add('riga-tastiera');

        riga.forEach(lettera => {
            const tasto = document.createElement('button');
            tasto.textContent = lettera;
            tasto.classList.add('tasto');
            tasto.id = 'tasto-' + lettera;

            // Tasti speciali più larghi
            if (lettera === 'INVIO' || lettera === '⌫') {
                tasto.style.width = '8vh';
                tasto.style.fontSize = '1.5vh';
            }

            // Click sul tasto
            tasto.addEventListener('click', () => {
                gestisciTasto(lettera);
            });

            rigaDiv.appendChild(tasto);
        });

        tastiera.appendChild(rigaDiv);
    });
}

function gestisciTasto(lettera) {
    if (lettera === '⌫') {
        cancellaLettera();
    } else if (lettera === 'INVIO') {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    } else {
        inserisciLettera(lettera);
    }
}

function inserisciLettera(lettera) {
    for (let cella of listaCelle) {
        if (cella.value === '') {
            cella.value = lettera.toLowerCase();
            cella.dispatchEvent(new Event('input'));
            break;
        }
    }
}

function cancellaLettera() {
    for (let i = listaCelle.length - 1; i >= 0; i--) {
        if (listaCelle[i].value !== '') {
            listaCelle[i].value = '';
            listaCelle[i].focus();
            break;
        }
    }
}

function aggiornaTastiera(lettera, colore) {
    const tasto = document.getElementById('tasto-' + lettera.toUpperCase());
    if (tasto.classList.contains('verde') || tasto.classList.contains('giallo') || tasto.classList.contains('grigio'))
        return;
    if (tasto) {
        if (colore === 'verde') {
            tasto.classList.add('verde');
        } else if (colore === 'giallo') {
            tasto.classList.add('giallo');
        } else if (colore === 'grigio') {
            tasto.classList.add('grigio');
        }
    }
}

//FUNZIONE INIZIALE: scarico tutto il json su una variabile e poi INIZIO CON IL RESTO DEL PROGRAMMA

scaricoDati("/5lettere.json").then(() => {
    creaTastiera();
    aggiungiRiga();
    id = "#cella" + contatore;
    creaParolaSegreta(listaSoluzioni)
    console.log(parolaSegreta)
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
    document.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            let parola = "";
            listaCelle.forEach((cella) => {
                parola += cella.value;
            });
            if (parola.length == 5) {
                if (listaSoluzioni.includes(parola.toLowerCase())) {
                    if (controlloParola(parola, parolaSegreta)) {
                        controlloCaselle(listaCelle, parolaSegreta);
                        setTimeout(() => {
                            alert("Hai vinto! premi ok per fare una nuova partita!!");
                            location.reload();
                        }, 1500);
                    } else {
                        controlloCaselle(listaCelle, parolaSegreta);
                        await aspetta(500);
                        await aggiungiRiga();

                    }
                } else {
                    alert("Non esiste questa parola!")
                }

                if (contatore == 6){
                    alert("Hai perso: la parola segreta era " + parolaSegreta);
                    location.reload();
                }
            }
            else {
                alert("Inserisci 5 lettere!");
            }

        }
    });
});






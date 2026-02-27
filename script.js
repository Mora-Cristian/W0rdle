let listaSoluzioni;
let parolaSegreta;
async function scaricoDati(file) {
    await fetch(file)
        .then(response => response.json())
        .then(data => {
            listaSoluzioni = data;
            datiCaricati = true;
        })
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//FUNZIONE PAROLA SEGRETA:
function creaParolaSegreta(lista){
    nRandom = randomInt(0, lista.lenght);
    parolaSegreta = lista[nRandom];
}

//FUNZIONE INIZIALE: scarico tutto il json su una variabile e poi INIZIO CON IL RESTO DEL PROGRAMMA

scaricoDati("/5lettere.json").then(() => {
    creaParolaSegreta(listaSoluzioni)
    console.log(parolaSegreta)
});
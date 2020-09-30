"use strict"

window.onload = function () {
    let studente = {
        "nome": "mario",
        "cognome": "rossi",
        "eta": 16,
        "studente": true,
        "images": ["smile.gif", "grim.gif", "frown.gif", "bomb.gif"],
        "hobbies": [], // vettore al momento vuoto
        "pos": { "x": 40, "y": 300 }, // oggetto annidato
        "stampa": function () { alert("Hello " + this.nome); },
        "fullName": function () { return this.nome + " " + this.cognome; }
    };

    this.console.log(studente["eta"]);
    studente.eta++;
    this.console.log(studente.eta);
    this.console.log(studente.fullName());
    // this.console.log(studente["fullName"]());.

    // aggiunta di una nuova chiave
    studente["residenza"] = "Fossano";
    studente.classe = "4B info";
    this.console.log(studente.residenza);
    if ("classe" in studente) //se classe appartiene a studente...
        this.console.log(studente["classe"]);
    else
        this.console.log("chiave inesistente");

    //dichiarazione di un nuovo object
    let studente2 = {};

    studente2.nome = "Pluto";
    studente2.residenza = "Alba";

    //scansione della proprietà di un oggetto
    this.console.log("STUDENTE2");
    for (const key in studente2) {
        if (studente2.hasOwnProperty(key)) {
            this.console.log(key + " = " + studente2[key]);
        }
    }

    this.console.log("STUDENTE");
    for (const key in studente) {
        if (/*!studente[key].toString().includes("function")*/ typeof(studente[key]) != "function") {
            this.console.log(key + " = " + studente[key]);
        }
    }

    // serializzazione di un oggetto
    this.console.log(studente); // console.log serializza in automatico; alert no
    this.alert(this.JSON.stringify(studente));  // in questo modo serializzo anche l'alert

    // vettore enumerativo delle chiavi
    let keys = Object.keys(studente);  //restituisce un vettore di chiavi

    for (const iterator of keys) {  // questo ciclo consente di scorrere i valori di un vettore enumerativo (le chiavi)
        console.log(iterator);
    }
}
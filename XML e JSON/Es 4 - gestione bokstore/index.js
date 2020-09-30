"use strict"

window.onload = function () {
    let json = this.localStorage.getItem("bookstore_json");
    this.console.log(json);
    // alert(json);
    let jsonVet = this.JSON.parse(json);
    let _table = this.document.createElement("table");
    let _bodies = document.getElementsByTagName("body");
    let _body = _bodies[0];
    // appendo la table al body
    _body.appendChild(_table);

    // crea intestazioni
    creaIntestazioni();
    // carica dati
    caricaDati();

    // creazione dei dettaglio
    let _divDettagli = document.createElement("div");
    _body.appendChild(_divDettagli);
    _divDettagli.setAttribute("class", "dettagli");

    // per navigare i libri
    let indicelibroCorrente = 0;
    visualizzaDettagli();

    // creazione pulsanti
    creaPulsanti();

    function creaIntestazioni() {
        // Creazione dell'instestazione
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        let intestazioni = ["title", "author", "category", "price"];
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }
    }

    function caricaDati() {
        // letura e caricamento dati
        for (const item of jsonVet) {
            let _tr = document.createElement("tr");
            _table.appendChild(_tr);
            let _td;

            _td = document.createElement("td");
            _td.innerHTML = item.title;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            // authors è un vettore enumerativo
            // join restituisce una stringa contenente tutte le voci del vettore separate da una virgola; funziona solo con i vettoreri enumerativi non associati
            // _td.innerHTML = item.authors.join(",");
            // serializzazione viene fata in automatico nel caso dei vettori enumerativi
            _td.innerHTML = item.authors;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            _td.innerHTML = item.category;
            _tr.appendChild(_td);

            _td = document.createElement("td");
            _td.innerHTML = item.price;
            _tr.appendChild(_td);
        }
    }

    function visualizzaDettagli() {
        _divDettagli.innerHTML = "";
        let libroCorrente = jsonVet[indicelibroCorrente]; // variabile intermedia facoltativa
        // jsonVet è un vettore enumerativo
        for (const key in libroCorrente /* jsonVet[indicelibroCorrente] */) {
            // creo l'intestazione e lo appendo
            let _p1 = document.createElement("p");
            _p1.innerHTML = key + ": ";
            _p1.style.textAlign = "right";
            _p1.style.fontWeight = "bold";
            _divDettagli.appendChild(_p1);

            // creo il contenuto e lo appendo
            let _p2 = document.createElement("p");
            _p2.innerHTML = libroCorrente[key];
            _divDettagli.appendChild(_p2);
        }
    }

    function creaPulsanti() {
        let _divPulsantiNavigazione = document.createElement("div");
        _divPulsantiNavigazione.setAttribute("class", "pulsantiNavigazione");
        _body.appendChild(_divPulsantiNavigazione);

        // vettore enumerativo
        let nomiPulsanti = ["Primo", "Indietro", "Avanti", "Ultimo"];
        for (const item of nomiPulsanti) {
            let _button = document.createElement("button");
            //assegno come id il nome stesso del pulsante in modo che sia accessibile alle altre procedure
            _button.id = item;
            _button.innerHTML = item;
            _button.style.padding = "5px, 10px";
            _button.style.margin = "3px";
            _button.addEventListener("click", navigazione);
            _divPulsantiNavigazione.appendChild(_button);
        }
        document.getElementById("Indietro").disabled = true;
    }

    function navigazione() {
        let _indietro = document.getElementById("Indietro");
        let _avanti = document.getElementById("Avanti");
        // per capire che cosa fare vado a leggermi il testo del pulsante premuto
        switch (this.innerHTML) {
            case 'Primo':
                indicelibroCorrente = 0;
                _indietro.disabled = true;
                _avanti.disabled = false;
                break;
            case 'Indietro':
                indicelibroCorrente--;
                if (indicelibroCorrente == 0) {
                    _indietro.disabled = true;
                }
                _avanti.disabled = false;
                break;
            case 'Avanti':
                indicelibroCorrente++;
                if (indicelibroCorrente == jsonVet.length - 1) {
                    _avanti.disabled = true;
                }
                _indietro.disabled = false;
                break;
            case 'Ultimo':
                indicelibroCorrente = jsonVet.length - 1;
                _avanti.disabled = true;
                _indietro.disabled = false;
                break;
        }
        visualizzaDettagli();
    }
}
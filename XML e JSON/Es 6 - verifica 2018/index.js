"use strict"

window.onload = function() {
    let _listBox = document.getElementById("lstNazioni");
    let _thead = document.getElementById("thead");
    let _tbody = document.getElementById("tbody");
    let _divDettagli = document.getElementById("dettagli");
    let vetJson = json.results;

    // vettore d'appoggio
    let vetAusNat = [];

    // variabili ausiliarie
    let ok = true;
    let j = 0;

    caricaListBox();
    caricaTabella();

    _listBox.addEventListener("change", caricaTabella);

    // ********************************************

    function caricaListBox() {
        _listBox.innerHTML = "";

        // imposto la prima opzione del listBox
        let _option = document.createElement("option");
        _option.innerHTML = "tutti";
        _listBox.appendChild(_option);

        // carico le altre nazionalità
        for (const item of vetJson) {
            for (let i = 0; i < j; i++) {
                if (item.nat == vetAusNat[i])
                    ok = false;
            }
            if (ok == true) {
                let _option = document.createElement("option");
                _option.innerHTML = item.nat;
                _listBox.appendChild(_option);
                vetAusNat[j] = item.nat;
                j++;
            } else
                ok = true;
        }
    }

    function caricaTabella() {
        _thead.innerHTML = "";
        _tbody.innerHTML = "";
        _divDettagli.innerHTML = "";

        let _tr = document.createElement("tr");
        _thead.appendChild(_tr);

        // intestazioni tabella
        let intestazioni = ["name", "username", "state", "nat", "img"];
        for (let i = 0; i < 5; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _tr.appendChild(_th);
        }

        // dati tabella
        ok = true;

        let itemSelezionato = _listBox.value;

        for (let i = 0; i < vetJson.length; i++) {
            let item = vetJson[i];
            if (_listBox.value == "tutti" || itemSelezionato == item.nat) {
                let item = vetJson[i];
                let _tr = document.createElement("tr");
                _tbody.appendChild(_tr);

                // name
                let _td = document.createElement("td");
                _td.innerText = item.name.first + " " + item.name.last;
                _tr.appendChild(_td);

                // username
                _td = document.createElement("td");
                _td.innerText = item.login.username;
                _tr.appendChild(_td);

                // state
                _td = document.createElement("td");
                _td.innerText = item.location.state;
                _tr.appendChild(_td);

                // nazione
                _td = document.createElement("td");
                _td.innerText = item.nat;
                _tr.appendChild(_td);

                // img
                _td = document.createElement("td");
                let _img = document.createElement("img");
                _img.src = item.picture.thumbnail;
                _img.style.width = "50px";
                _img.style.height = "50px";
                _td.appendChild(_img);
                _tr.appendChild(_td);
                _img.idimg = item.id;
                _img.addEventListener("click", visualizzaDettagli);
            }
        }
    }

    function visualizzaDettagli() {
        _divDettagli.innerHTML = "";

        for (let i = 0; i < vetJson.length; i++) {
            let item = vetJson[i];
            if (this.idimg == item.id) {
                // img
                let _img = document.createElement("img");
                _img.src = item.picture.large;
                _divDettagli.appendChild(_img);

                // informazioni
                let _p = document.createElement("p");
                _p.innerHTML = item.name.first + " " + item.name.last;
                _divDettagli.appendChild(_p);

                _p = document.createElement("p");
                _p.innerHTML = item.email;
                _divDettagli.appendChild(_p);

                _p = document.createElement("p");
                _p.innerHTML = item.phone;
                _divDettagli.appendChild(_p);

                _p = document.createElement("p");
                _p.innerHTML = item.cell;
                _divDettagli.appendChild(_p);

                // btn elimina
                let _btnElimina = document.createElement("button");
                _btnElimina.innerHTML = "Elimina";
                _divDettagli.appendChild(_btnElimina);
                _btnElimina.addEventListener("click", eliminaRecord);
                _btnElimina.eliminaRecord = i;
            }
        }
    }

    function eliminaRecord() {
        vetJson.splice(this.eliminaRecord, 1);
        caricaTabella();
    }
}
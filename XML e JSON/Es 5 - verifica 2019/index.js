"use strict"

window.onload = function () {
    let intestazioni = ["", "id", "name", "alcoholic", "main ingradient", ""];
    let larghezze = [40, 40, 60, 70, 70, 40];
    let _table = this.document.getElementById("table");
    let _listbox = document.getElementById("lstIngredienti");

    let _optTutti = document.getElementById("optTutti");
    let _optAlcolici = document.getElementById("optAlcoholic");
    let _optNonAlcolici = document.getElementById("optNonAlcoholic");
    _optTutti.addEventListener("click", caricaTabellaCocktails);
    _optAlcolici.addEventListener("click", caricaTabellaCocktails);
    _optNonAlcolici.addEventListener("click", caricaTabellaCocktails);

    _listbox.addEventListener("change", caricaTabellaCocktails);

    caricaListaIngredienti();
    caricaTabellaCocktails();

    /************************************    FUNCTION    ************************************/
    function creaIntestazione() {
        let _tr = document.createElement("tr");
        _table.appendChild(_tr);
        for (let i = 0; i < intestazioni.length; i++) {
            let _th = document.createElement("th");
            _th.innerHTML = intestazioni[i];
            _th.style.width = larghezze[i] + "px";
            _tr.appendChild(_th);
        }
    }

    function caricaListaIngredienti() {
        let vetIngradienti = ingredients.ingredients;
        // let vetIngradienti=ingredients['ingredients'];

        vetIngradienti.sort(function (record1, record2) {
            let str1 = record1.strIngredient1.toUpperCase();
            let str2 = record2.strIngredient1.toUpperCase();
            if (str1 < str2) return -1;
            else if (str1 > str2) return 1;
            else return 0;
        });
        console.log(vetIngradienti);

        let _option = document.createElement("option");
        _option.innerHtml = "";
        _listbox.appendChild(_option);

        for (const item of vetIngradienti) {
            let _option = document.createElement("option");
            _option.innerHTML = item["strIngredient1"];
            _listbox.appendChild(_option)
        }
    }

    function caricaTabellaCocktails() {
        let vetCocktails = cocktails.drinks;
        _table.innerHTML = "";
        creaIntestazione();
        for (const item of vetCocktails) {
            if ((_optTutti.checked || (_optAlcolici.checked && item.strAlcoholic == "Alcoholic") || (_optNonAlcolici.checked && item.strAlcoholic == "Non alcoholic")) &&
                (_listbox.value=="" || _listbox.value==item.strIngredient1)) {
                let _tr = document.createElement("tr");
                _table.appendChild(_tr);

                // immagine
                let _td = document.createElement("td");
                _tr.appendChild(_td);
                let _img = document.createElement("img");
                _td.appendChild(_img);
                _img.src = item.strDrinkThumb;
                _img.style.width = "40px";

                // id
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.idDrink;

                // Name
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strDrink;

                // Alcoholic
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strAlcoholic;

                // Main ingradient
                _td = document.createElement("td");
                _tr.appendChild(_td);
                _td.innerHTML = item.strIngredient1;

                // dettagli
                _td = document.createElement("td");
                _tr.appendChild(_td);
                let _a = document.createElement("a");
                _td.appendChild(_a);
                _a.href = "#";
                _a.innerHTML = "Dettagli";
                _a.idDrink = item.idDrink;
                _a.addEventListener("click", visualizzaDettagli);
            }
        }
    };

    function visualizzaDettagli() {
        let _divDettagli = document.getElementById("dettagli");
        _divDettagli.innerHTML = "";

        for (const item of cocktails.drinks) {
            if (item.idDrink == this.idDrink) {
                let _h3 = document.createElement("h3");
                _h3.innerHTML = item.strDrink;

                // h3
                _divDettagli.appendChild(_h3);
                let ingredients = "";
                for (let i = 1; i <= 5; i++) {
                    if (item["strIngredient" + i] != null) {
                        ingredients += item["strIngredient" + i] + " - ";
                    }
                }
                let _pIngredients = document.createElement("p");
                _divDettagli.appendChild(_pIngredients);
                _pIngredients.innerHTML = ingredients;

                // img
                let _img = document.createElement("img");
                _divDettagli.appendChild(_img);
                _img.src = item.strDrinkThumb;
                _img.style.width = "140px";

                break;
            }
        }
    }
}

"use strict";
let intestazioni = ["Gender", "Code", "Price", "Color", "Image"]


window.onload = function() {
    let _table = document.getElementById("table")
    let _btnInserisci = document.getElementsByTagName("button")[0];

    _table.style.width = "1020px";
    _table.style.border = "2px solid black";
    _table.style.margin = "20px auto";
    _table.border = "1";

    let list = JSON.parse(localStorage.getItem("orologi.json"))
    console.log(list);

    creaTabella();

    _btnInserisci.addEventListener("click", function() {
        window.location.href = "inserisci.html";
    });

    // ***********************************************
    function creaIntestazioni() {
        let _tr = document.createElement("tr");
        _tr.style.backgroundColor = "#CCC"
        _table.appendChild(_tr);

        for (const item of intestazioni) {
            let _th = document.createElement("th");
            _th.innerHTML = item;
            _th.style.height = "25px";
            _tr.appendChild(_th);
        }
    }

    function creaTabella() {
        _table.innerHTML = "";
        creaIntestazioni();

        for (const item of list) {
            let gender = item.gender;
            let models = item.models;

            for (const model of models) {
                let code = model.code;
                let price = model.price;
                let swatches = model.swatches;

                for (const swatch of swatches) {
                    let color = swatch.color;
                    let path = swatch.image;

                    let _tr = document.createElement("tr");
                    _tr.style.textAlign = "center";
                    _table.appendChild(_tr);

                    let _td = document.createElement("td");
                    _td.innerHTML = gender;
                    _tr.appendChild(_td);

                    _td = document.createElement("td");
                    _td.innerHTML = code;
                    _tr.appendChild(_td);

                    _td = document.createElement("td");
                    _td.innerHTML = price;
                    _tr.appendChild(_td);

                    _td = document.createElement("td");
                    _td.innerHTML = color;
                    _tr.appendChild(_td);

                    _td = document.createElement("td");
                    let _img = document.createElement("img");
                    _img.src = "img/" + path;
                    _img.style.width = "50px";
                    _img.style.height = "50px";
                    _td.appendChild(_img);
                    _tr.appendChild(_td);
                }
            }
        }
    }
}
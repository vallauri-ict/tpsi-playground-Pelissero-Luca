"use strict";

$(document).ready(function() {
    let btnIndietro = $("#btnIndietro");
    let btnAvanti = $("#btnAvanti");
    let img = $("#img");

    // other
    let contImg = 1;

    // grafica pulsanti
    // larghezza
    btnAvanti.css("width", "140px");
    btnIndietro.css("width", "140px");
    // altezza
    btnAvanti.css("height", "40px");
    btnIndietro.css("height", "40px");
    // testo
    btnAvanti.css("font-weight", "bold");
    btnIndietro.css("font-weight", "bold");
    // sfondo
    btnAvanti.css("background-color", "orange");
    btnIndietro.css("background-color", "orange");
    // bordi
    btnAvanti.css("border-radius", "50%");
    btnIndietro.css("border-radius", "50%");
    // allineamento
    btnAvanti.css("vertical-align", "center");
    btnIndietro.css("vertical-align", "center");

    // grafica img
    img.css("width", "400px")
    img.prop("src", "img/img1.jpg");

    // gestione bottoni
    btnIndietro.prop("disabled", true);

    btnIndietro.on("click", function() {
        if (btnAvanti.prop("disabled")) {
            btnAvanti.prop("disabled", false);
        }
        contImg--;
        if (contImg == 1) {
            $(this).prop("disabled", true);
            img.prop("src", "img/img" + contImg + ".jpg");
        } else {
            img.prop("src", "img/img" + contImg + ".jpg");
        }
    })

    btnAvanti.on("click", function() {
        btnIndietro.prop("disabled", false);
        contImg++;
        if (contImg == 7) {
            $(this).prop("disabled", true);
            img.prop("src", "img/img" + contImg + ".jpg");
        } else {
            img.prop("src", "img/img" + contImg + ".jpg");
        }
    })

});
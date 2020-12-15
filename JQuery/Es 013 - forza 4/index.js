"use strict";

const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "rgb(255, 255, 0)";
const ROSSO = "rgb(255, 0, 0)";
const GRIGIO = "rgb(187, 187, 187)";

let turno = GIALLO;

$(document).ready(function() {

    let _wr = $("#wrapper");
    let _header = $("#header");

    // creazione pedine intestazione
    for (var i = 0; i < COLONNE; i++) {
        let pedina = $("<div>");
        pedina.addClass("pedina");
        pedina.appendTo(_header);
        // pedina.hover(
        //   function () { $(this).css({"background-color": turno}) },
        //   function () { $(this).css({"background-color": GRIGIO}) }
        // );
    }

    // utilizzo i delegated events perchè nel caso in cui passi più volte in quella parte di codice li accoda
    // e poi i verificheranno più volte
    _header.on("mouseenter", "div", function() { $(this).css({ "background-color": turno }) })
    _header.on("mouseleave", "div", function() { $(this).css({ "background-color": GRIGIO }) })
    _header.on("click", "div", down);

    // creazione pedine wrapper
    for (var i = 0; i < RIGHE; i++) {
        for (var j = 0; j < COLONNE; j++) {
            let pedina = $("<div>");
            pedina.addClass("pedina");
            pedina.appendTo(_wr);
            pedina.prop("id", `btn-${i}-${j}`);
        }
    }

    function down() {
        // restituisce l'indice di $(this) all'interno del contenitore
        let colonna = _header.children("div").index($(this));
        let riga = RIGHE - 1; // posizione della prima cella libera

        for (var i = 0; i < RIGHE; i++) {
            let p = $(`#btn-${i}-${colonna}`);
            if (p.css("background-color") != GRIGIO) {
                riga = i - 1;
                break;
            }
        }

        // controllo se la riga è già piena o no
        if (riga != -1) {
            // creo la nuova pedina
            let pedina = $("<div>");
            pedina.appendTo(_wr);
            pedina.css({
                "background-color": turno,
                "position": "absolute",
                "top": -60, // se omentto i "px" poso anche omettere le ""
                "left": colonna * 60 + 5
            });
            _header.off("click");

            let _turno = turno; // variabile ausiliaria di turno

            // cambio il turno
            if (turno == GIALLO)
                turno = ROSSO;
            else turno = GIALLO;

            // triggheriamo l'evento sulla pedina corrente
            // così la pedina cambia colore anche se non mi muovo
            $(this).trigger("mouseenter");

            // animazione
            pedina.animate({ "top": riga * 60 + 5 }, 200 * (riga + 1), function() {
                $(`#btn-${riga}-${colonna}`).css({ "background-color": _turno })
                _header.on("click", "div", down);
            });
        } else {
            alert("Mossa non valida")
        }
    }

});
"use strict"

$(document).ready(function() {
    let _calciatore = $("#calciatore");
    let _palla = $("#palla");

    let btnEntra = $("#btnEntra")
    let btnEsci = $("#btnEsci")
    let btnVisualizzaPalla = $("#btnVisualizzaPalla")
    let btnNascondiPalla = $("#btnNascondiPalla")
    let btnTira = $("#btnTira")

    // inizialmente nascondiamo alcuni elementi
    _calciatore.hide();
    _palla.hide();
    // mi faccio una property e la inizializzo a false
    _palla.prop("goal", false)

    // non mantine la posizione dei pulsanti
    // btnEsci.hide();
    // lo nasconde mantenendo la posizione : sono metodi equivalenti
    btnEsci.css("visibility", "hidden");
    btnNascondiPalla.css({ "visibility": "hidden" });
    btnTira.css({ "visibility": "hidden" });

    // .on è l'equivalente di addEventListener
    btnEntra.on("click", function() {
        // this.css({ "visibility": "hidden" }); errore
        // this è sempre un puntatore javaScript
        // il dollaro serve per usare un puntatore java con jQuery, 
        // altrimenti non funzionerebbe
        $(this).css({ "visibility": "hidden" });
        // nel tempo di due secondi compare il calciatore
        //il tempo di defaul di show e hide è zero
        _calciatore.show(2000, function() {
            // la inserisco qui dentro così prima fa l'animazione e poi 
            // visualizza il pulsante
            btnEsci.css("visibility", "visible");
            checkTira();
        });
    });

    btnEsci.on("click", function() {
        $(this).css({ "visibility": "hidden" });
        _calciatore.hide(2000, function() {
            btnEntra.css("visibility", "visible");
            btnTira.css({ "visibility": "hidden" });
        });
    })

    btnVisualizzaPalla.on("click", function() {
        $(this).css({ "visibility": "hidden" });
        _palla.fadeIn(2000, function() {
            btnNascondiPalla.css("visibility", "visible");
            checkTira();
        });
    })

    btnNascondiPalla.on("click", function() {
        $(this).css({ "visibility": "hidden" });
        _palla.fadeOut(2000, function() {
            btnVisualizzaPalla.css("visibility", "visible");
            btnTira.css({ "visibility": "hidden" });
            // this equivale alla palla perchè siamo dentro alla callBack della palla
            if ($(this).prop("goal")) {
                // ritorna alla posizione originale
                let pos = {
                    "left": "",
                    "top": "",
                    "width": "",
                    "height": ""
                }
                $(this).css(pos);
                $(this).prop("goal", false)
            }
        });
    })

    function checkTira() {
        // .is mi restituisce true o false
        if (_calciatore.is(":visible") && _palla.is(":visible")) {
            btnTira.css("visibility", "visible");
        }
    }

    btnTira.on("click", function() {
        $(this).css({ "visibility": "hidden" });

        // json di property
        let pos = {
            "left": "1025px",
            "top": "300px",
            "width": "50px",
            "height": "50px"
        }
        _palla.animate(pos, 1500, function() {
            $(this).prop("goal", true);
        })
    })

    $("#btnRosso").on("click", function() {
        _palla.prop("src", "img/pallaRossa.jpg")
    })

    $("#btnBianco").on("click", function() {
        _palla.prop("src", "img/palla.jpg")
    })

});
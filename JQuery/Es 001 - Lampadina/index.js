"use strict"

$(document).ready(function() {
    let _lampadina = $(".lampadina");
    // collezione jquery che contiene un solo elemento (sono vettori)
    let _btnSpegni = $("#btnSpegni");
    let _btnAccendi = $("#btnAccendi");
    let _descrizione = $("#descrizione");
    let _contenuto = $("#contenuto");

    // alle collezioni jquery si possono usare sempre solo metodi jquery
    _btnSpegni.hide(); // quando parte nasconde il bottone spegni
    _lampadina.hide();

    _btnAccendi.on("click", function() {
        _lampadina.addClass("accesa");
        _lampadina.fadeIn(2000, function() {
            _btnSpegni.show();
            _btnAccendi.hide();
        });
    });

    _btnSpegni.on("click", function() {
        _lampadina.removeClass("accesa");
        _lampadina.fadeOut(2000, function() {
            _btnSpegni.hide();
            _btnAccendi.show();
        });
    });

    let descrizione = {
        "width": "160px",
        "height": "40px",
        "text-align": "center",
        "line-height": "40px",
        "background-color": "#aaa",
        "text-decoration": "underline",
        "font-size": "14pt",
        "cursor": "pointer",
        "border-radius": "10px",
        "margin-left": "10px"
    }

    // vettore json per settare le property css
    _descrizione.css(descrizione);
    _contenuto.hide();

    _descrizione.on("mouseover", function() {
        _contenuto.slideDown(1000);
    });

    _descrizione.on("mouseout", function() {
        _contenuto.slideUp(1000);
    });
});
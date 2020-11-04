"use strict";

$(document).ready(function() {

    // _p è una collezione jQuery (vettore enumerativo di puntatori)
    let _p = $("p"); //accedo a tutti gli elementi della collezione p
    console.log(_p.length);
    _p.css("backgroundColor", "#FF0");

    $(".primo").css("backgroundColor", "#F00");
    console.log(_p.css("backgroundColor")); // in lettura restituisce il colore del primo

    // _p.hide(800) //alle collezioni jQery applico i metodi jQuery

    _p[2].innerHTML = "nuovo valore";

    for (const obj of _p) {
        obj.style.backgroundColor = "green"
    }

    // js
    let p1 = document.getElementsByClassName("primo")[0]; //puntatore al primo elemento
    p1.innerHTML = "sono il primo elemento"

    // jQ
    let _p1 = $(p1);
    _p1.css("backgroundColor", "#00F")

    // js
    let aus = _p1[0];
    aus.style.color = "#FFF";
});
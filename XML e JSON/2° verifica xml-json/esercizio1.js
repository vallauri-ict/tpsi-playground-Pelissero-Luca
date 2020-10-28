"use strict";

window.onload = function() {
    let _btn = document.getElementById("btn");
    _btn.addEventListener("click", salva);

    function salva() {
        localStorage.setItem("orologi.json", JSON.stringify(swatches));
    }
}
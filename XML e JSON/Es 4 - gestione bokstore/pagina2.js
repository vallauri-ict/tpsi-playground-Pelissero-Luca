"use strict"

function salva() {
    let _txtTitolo = document.getElementById("txtTitolo");
    let _txtCategoria = document.getElementById("txtCategoria");
    let _txtLingua = document.getElementById("txtLingua");
    let _txtAnno = document.getElementById("txtAnno");
    let _txtPrezzo = document.getElementById("txtPrezzo");

    let json = localStorage.getItem("bookstore_json");
    let jsonVet = JSON.parse(json);
    console.log(jsonVet);

    jsonVet.length++;

    jsonVet[jsonVet.length - 1] = {
        "title": _txtTitolo.value,
        "category" : _txtCategoria.value,
        "year" : _txtAnno.value,
        "lan"
    }

}
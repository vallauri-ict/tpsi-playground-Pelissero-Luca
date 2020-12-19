"use strict";

$(document).ready(function() {
    let wrapper = $('#elencoArticoli')
    let details = $(".details")

    $.ajax({
        url: "http://localhost:3000/fotocamere",
        type: "GET",
        success: success,
        error: errore
    })

});

function success(data, textStatus, jqXHR) {
    console.log(JSON.stringify(data));
}

function errore(jqXHR, textStatus, str_error) {
    if (jqXHR.status == 0)
        alert("connection refused or server timeout");
    else if (jqXHR.status == 200)
        alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
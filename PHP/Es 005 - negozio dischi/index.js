"use strict"

$(document).ready(function() {
    let table = $("#table>div");

    let request = inviaRichiesta("get", "server/elencoDischi.php");
    request.fail(errore)
    request.done(function(data) {
        console.log.apply(data);
        for (const item of data) {
            // let div = $("<div>")
            // div.appendTo(table);
            let txt = $("<input [type=text]>")
            txt.val(item.id);
            txt.appendTo(table);
            txt = $("<input[type=text]>")
            txt.val(item.autore);
            txt.appendTo(table);
            txt = $("<input[type=text]>")
            txt.val(item.titolo);
            txt.appendTo(table);
            txt = $("<input[type=text]>")
            txt.val(item.anno);
            txt.appendTo(table);

            let button = $("<button>")
            button.text("Salva");
            button.appendTo(table);
        }
    })
})
"use strict";

$(document).ready(function() {
    const finalUrl = "https://randomuser.me/api";
    let _table = $("#wrapper table")

    $.ajax({
        "url": finalUrl + "?results=50",
        // data rappresenta il json già parsificato restituito dal server
        "success": function(data) {
            console.log(data);


            for (const person of data.results) {
                let tr = $("<tr>")
                tr.appendTo(_table.children("tbody"))
                let name = person.name.first + " " + person.name.last;
                $("<td>").appendTo(tr).text(name);
                $("<td>").appendTo(tr).text(person.nat);
                $("<td>").appendTo(tr).text(person.location.country);
                $("<td>").appendTo(tr).text(person.location.state);
                $("<td>").appendTo(tr).text(person.cell);
                let td = $("<td>").appendTo(tr);
                $("<img>").appendTo(td).prop("src", person.picture.thumbnail)
            }
            /* Se lancio .DataTable() prima che la tabella sia stata popolata, l'applicazione funziona ugualmente,
               però visualizza un fastidioso msg iniziale di tabella vuota */
            _table.DataTable({
                "bPaginate": true, // paginazione dei record da visualizzare
                "bLengthChange": true, // n. di record per pagina
                "bFilter": true, // ricerca della voce impostata
                "bSort": true // ordinamento dei record sul click on the header
            });
        },
        "error": errore
    });
});





function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}
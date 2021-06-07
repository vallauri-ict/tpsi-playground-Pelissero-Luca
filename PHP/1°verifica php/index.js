'use strict'

$(document).ready(function() {

    let _tbody = $("#tbody")
    $("#divDettagli").hide();

    let request = inviaRichiesta("post", "server/elencoTitoli.php");
    request.fail(errore);
    request.done(function(data) {
        for (const item of data) {
            let tr = $("<tr>");
            tr.appendTo(_tbody);

            $("<td>").text(item.id).appendTo(tr);
            $("<td>").text(item.titolo).appendTo(tr);
            $("<td>").text(item.ultimoContratto).appendTo(tr);
            $("<td>").text(item.volumi).appendTo(tr);

            let img = $("<img>");
            img.prop("src", "lente.jpg");
            img.css({ "width": "25px", "cursor": "pointer" })
            img.prop("cDettagli", item.codDettagli)
            img.on("click", dettagli);
            img.appendTo($("<td>").appendTo(tr))

            let td = $("<td>");
            td.appendTo(tr);
            let input = $("<input type='text'>");
            input.prop("id", "nVolumi");
            input.appendTo(td);
            let btn = $("<button>");
            btn.text("aqcuista");
            btn.prop("idTit", item.id);
            btn.on("click", aqcuista);
            btn.appendTo(td);
        }
    })

    $("#divRicerca").on("click", "input[type=button]", function() {
        _tbody.empty();
        let param = { "ricerca": $("#divRicerca").children("input[type=text]").val() }
        let request = inviaRichiesta("post", "server/cerca.php", param);
        request.fail(errore);
        request.done(function(data) {
            for (const item of data) {
                let tr = $("<tr>");
                tr.appendTo(_tbody);

                $("<td>").text(item.id).appendTo(tr);
                $("<td>").text(item.titolo).appendTo(tr);
                $("<td>").text(item.ultimoContratto).appendTo(tr);
                $("<td>").text(item.volumi).appendTo(tr);

                let img = $("<img>");
                img.prop("src", "lente.jpg");
                img.css({ "width": "25px", "cursor": "pointer" })
                img.prop("cDettagli", item.codDettagli)
                img.on("click", dettagli);
                img.appendTo($("<td>").appendTo(tr))

                let td = $("<td>");
                td.appendTo(tr);
                let input = $("<input type='text'>");
                input.prop("id", "nVolumi");
                input.appendTo(td);
                let btn = $("<button>");
                btn.text("aqcuista");
                btn.prop("idTit", item.id);
                btn.on("click", aqcuista);
                btn.appendTo(td);
            }
        })
    })

    function aqcuista() {
        let param = {
            "idTit": $(this).prop("idTit"),
            "nVolumi": $(this).prev().val()
        }
        let request = inviaRichiesta("post", "server/acquista.php", param);
        request.fail(errore);
        request.done(function(data) {
            alert("volume aggiornato correttamente")
            window.location.reload();
        })
    }

    function dettagli() {
        $(".descrizione").empty();
        $("#divDettagli").show();
        let param = {
            "cDettagli": $(this).prop("cDettagli")
        }
        let request = inviaRichiesta("post", "server/dettagli.php", param);
        request.fail(errore);
        request.done(function(data) {
            $("<h3>").text(data.nomeAzienda).appendTo($(".descrizione"));
            $("<p>").text(data.descrizione).appendTo($(".descrizione"));

            // mappa
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': data.indirizzo },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        let mapOption = {
                            "center": results[0].geometry.location,
                            "zoom": 17
                        }
                        let mappa = new google.maps.Map($(".mappa")[0], mapOption);
                        let marcatore = new google.maps.Marker({
                            "map": mappa,
                            "position": results[0].geometry.location,
                            "title": "sede " + data.nomeAzienda
                        })
                    } else
                        alert("Stringa immessa non valida");
                }
            );
        })
    }
});
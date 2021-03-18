"option strict"

$(document).ready(function() {
    const _lstCitta = $("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro = $("#btnFiltro")
    const _tbody = $("table tbody");
    const _divDettagli = $("#divDettagli")

    _divDettagli.hide();
    caricaComboCitta();
    caricaComboGeneri();
    caricaTabella();

    /* ************************************************* */
    _lstCitta.on("click", "li", function() {
        let record = $(this).prop("citta")
        _lstCitta.prop("citta", record);
        if (record == undefined) {
            _lstCitta.prev().html("Tutti <span class='caret'></span>");
            _lstCitta.prop("citta", null);
        } else
            _lstCitta.prev().html(record.citta + " <span class='caret'></span>");
    })

    _lstGeneri.on("click", "li", function() {
        let genere = $(this).prop("genere");
        _lstGeneri.prop("genere", genere);
        if (genere == undefined) {
            _lstGeneri.prev().html("Tutti <span class='caret'></span>");
            _lstGeneri.prop("genere", null);
        } else
            _lstGeneri.prev().html(genere.genere + " <span class='caret'></span>");
    })

    _btnFiltro.on("click", function() {
            caricaTabella();
        })
        /* ****************************** */
    function caricaComboCitta() {
        let li = $("<li>");
        li.appendTo(_lstCitta);
        li.text("Tutti");
        let request = inviaRichiesta("get", "/citta");
        request.fail(errore);
        request.done(function(citta) {
            for (const item of citta) {
                li = $("<li>");
                li.appendTo(_lstCitta);
                li.text(item.citta);
                li.prop("citta", item);
            }
        })
    }

    function caricaComboGeneri() {
        let li = $("<li>");
        li.appendTo(_lstGeneri);
        li.text("Tutti");
        let request = inviaRichiesta("get", "/generi");
        request.fail(errore);
        request.done(function(generi) {
            for (const genere of generi) {
                li = $("<li>");
                li.appendTo(_lstGeneri);
                li.text(genere.genere);
                li.prop("genere", genere);
            }
        })
    }
    /* ********************************** */
    function caricaTabella() {
        let genere = _lstGeneri.prop("genere");
        let citta = _lstCitta.prop("citta");
        let json = {};
        // push funziona solo su vettori enumerativi
        if (genere != null) {
            json.codGenere = genere.id;
        }
        if (citta != null) {
            json["codCitta"] = citta.id;
        }
        let request = inviaRichiesta("get", "/concerti", json);
        request.fail(errore);
        request.done(visualizzaConcerti);
        _divDettagli.hide();
    }

    function visualizzaConcerti(concerti) {
        _tbody.empty();
        for (const concerto of concerti) {
            let tr = $("<tr>");
            tr.appendTo(_tbody);

            let td = $("<td>");
            td.text(concerto.id);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.cantante);
            td.appendTo(tr);

            td = $("<td>");
            td.text(concerto.data);
            td.appendTo(tr);

            let tdGenere = $("<td>");
            tdGenere.appendTo(tr);
            let requestGeneri = inviaRichiesta("get", "/generi/" + concerto.codGenere);
            requestGeneri.fail(errore);
            requestGeneri.done(function(genere) {
                tdGenere.text(genere.genere);
            })

            let tdCitta = $("<td>");
            tdCitta.appendTo(tr);
            let tdStruttura = $("<td>");
            tdStruttura.appendTo(tr);
            let tdNPosti = $("<td>");
            tdNPosti.appendTo(tr);
            let nPostiMax;
            let requestCitta = inviaRichiesta("get", "/citta/" + concerto.codCitta);
            requestCitta.fail(errore);
            requestCitta.done(function(citta) {
                nPostiMax = citta.nPosti;
                tdCitta.text(citta.citta);
                tdStruttura.text(citta.struttura);
                tdNPosti.text(citta.nPosti);

                let tdButton = $("<td>");
                tdButton.appendTo(tr);
                let button = $("<button>");
                button.text("DETTAGLI");
                button.addClass("btn btn-info btn-xs");
                button.appendTo(tdButton);
                button.on("click", function() {
                    _divDettagli.show();
                    if (concerto.nPostiOccupati != undefined)
                        _divDettagli.children("textarea").text(concerto.dettagli + "\n Numero posti occupati: " + concerto.nPostiOccupati);
                    else
                        _divDettagli.children("textarea").text(concerto.dettagli + "\n Numero posti occupati: 0");
                })

                tdButton = $("<td>");
                tdButton.appendTo(tr);
                button = $("<button>");
                button.addClass("btn btn-success btn-xs");
                button.text("PRENOTA");
                button.prop("nPosti", concerto.nPostiOccupati);
                if (concerto.nPostiOccupati == undefined || parseInt(concerto.nPostiOccupati) < nPostiMax)
                    button.appendTo(tdButton);
            })
        }
    }

    /* ***************************************** */
    _tbody.on("click", "button.btn-success", function() {
        let id = $(this).parent().siblings().eq(0).text();
        let nPosti = $(this).prop("nPosti");
        let nPostiMax = parseInt($(this).parent().siblings().eq(6).text());
        if (nPosti == undefined) {
            nPosti = 1;
        } else {
            nPosti = parseInt(nPosti) + 1;
            if (nPosti == nPostiMax)
                alert("Hai preso l'ultimo biglietto");
        }
        let request = inviaRichiesta("PATCH", "/concerti/" + id, { "nPostiOccupati": nPosti });
        request.fail(errore);
        request.done(function(infoData) {
            console.log(infoData);
            alert("Prenotazione eseguita correttamente");
            caricaTabella();
        })
    })
})
"option strict"

$(document).ready(function() {
    const _lstCitta = $("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro = $("#btnFiltro")
    const _tbody = $("table tbody");
    const _divDettagli = $("#divDettagli")

    _divDettagli.hide()

    caricaComboCitta();
    caricaComboGeneri();
    caricaTabella();

    _lstCitta.on("click", "li", function() {
        let record = $(this).prop("citta");
        _lstCitta.prop("citta", record);
        if (record == undefined) {
            _lstCitta.prev().html("All <span class='caret'></span>");
            _lstCitta.prop("citta", null)
        } else {
            _lstCitta.prev().html(record.citta + "<span class='caret'></span>");
        }
    })

    _lstGeneri.on("click", "li", function() {
        let record = $(this).prop("genere");
        _lstGeneri.prop("genere", record);
        if (record == undefined) {
            _lstGeneri.prev().html("All <span class='caret'></span>");
            _lstGeneri.prop("generi", null)
        } else {
            _lstGeneri.prev().html(record.genere + "<span class='caret'></span>");
        }
    })

    _btnFiltro.on("click", caricaTabella);

    // ----------------------------------------------------

    function caricaComboCitta() {
        let li = $("<li>");
        li.text("All");
        li.appendTo(_lstCitta);

        let request = inviaRichiesta("get", "/citta");
        request.fail(errore);
        request.done(function(citta) {
            for (const item of citta) {
                li = $("<li>");
                li.text(item.citta);
                li.prop("citta", item);
                li.appendTo(_lstCitta);
            }
        })
    }

    function caricaComboGeneri() {
        let li = $("<li>");
        li.text("All");
        li.appendTo(_lstGeneri);

        let request = inviaRichiesta("get", "/generi");
        request.fail(errore);
        request.done(function(generi) {
            for (const genere of generi) {
                li = $("<li>");
                li.text(genere.genere);
                li.prop("genere", genere);
                li.appendTo(_lstGeneri);
            }
        })
    }

    function caricaTabella() {
        let genere = _lstGeneri.prop("genere");
        let citta = _lstCitta.prop("citta");
        let json = {};
        // push funge solo su i vettore enumerativi
        // json = {
        //     "codGenere": _lstGeneri.prop("genere").id,
        //     "codCitta": _lstCitta.prop("citta").id
        // }

        if (genere != null)
            json.codGenere = genere.id;
        if (citta != null)
            json["codCitta"] = citta.id;

        let request = inviaRichiesta("get", "/concerti", json);
        request.fail(errore);
        request.done(visualizzaConcerti);
    }

    function visualizzaConcerti(concerti) {
        _tbody.html("");
        for (const concerto of concerti) {
            let tr = $("<tr>")
            tr.appendTo(_tbody);

            let td = $("<td>")
            td.text(concerto.id);
            td.appendTo(tr);

            td = $("<td>")
            td.text(concerto.cantante);
            td.appendTo(tr);

            td = $("<td>")
            td.text(concerto.data);
            td.appendTo(tr);

            let tdGenere = $("<td>")
            tdGenere.appendTo(tr);
            let requestGeneri = inviaRichiesta("get", "/generi/" + concerto.codGenere);
            requestGeneri.fail(errore);
            requestGeneri.done(function(genere) {
                tdGenere.text(genere.genere);
            })

            let tdCitta = $("<td>")
            tdCitta.appendTo(tr);
            let tdStruttura = $("<td>")
            tdStruttura.appendTo(tr);
            let tdNPosti = $("<td>")
            tdNPosti.appendTo(tr);
            let requestCitta = inviaRichiesta("get", "/citta/" + concerto.codCitta);
            requestCitta.fail(errore);
            requestCitta.done(function(citta) {
                tdCitta.text(citta.citta);
                tdStruttura.text(citta.struttura);
                tdNPosti.text(citta.nPosti);
            })

            td = $("<td>")
            let button = $("<button>")
            button.text("DETTAGLI")
            button.appendTo(td);
            button.addClass("btn btn-info btn-xs")
            td.appendTo(tr);

            td = $("<td>")
            button = $("<button>")
            button.text("PRENOTA")
            button.appendTo(td);
            button.addClass("btn btn-success btn-xs")
            td.appendTo(tr);
        }
    }
})
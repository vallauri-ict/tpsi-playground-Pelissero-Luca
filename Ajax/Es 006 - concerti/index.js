"option strict"

const URL = "http://localhost:3000"

$(document).ready(function() {
    const _lstCitta = $("#lstCitta")
    const _lstGeneri = $("#lstGeneri")
    const _btnFiltro = $("#btnFiltro")
    const _tbody = $("table tbody");
    const _divDettagli = $("#divDettagli")

    let idGenere;
    let idCitta;
    let struttura;
    let nPosti;

    let filtraClick = false;

    _divDettagli.hide()

    creaDropDown();
    caricaTabellaAll();
    // -------------------------------------------

    function creaDropDown() {
        let request1 = inviaRichiesta("get", URL + "/generi/");
        request1.fail(errore);
        request1.done(function(generi) {

            _lstGeneri.addClass("dropdown");

            let btn = $("<button>");
            btn.addClass("btn btn-primary dorpdown-toggle");
            btn.prop("type", "button");
            btn.attr("data-toggle", "dropdown");
            btn.text("Generi");
            btn.appendTo(_lstGeneri);

            let span = $("<span>");
            span.addClass("caret");
            span.appendTo(btn);

            let ul = $("<ul>")
            ul.addClass("dropdown-menu")
            ul.appendTo(_lstGeneri);

            let li = $("<li>")
            li.appendTo(ul);

            let a = $("<a>");
            a.text("All");
            a.on("click", function() {
                btn.text(a.text());
                span = $("<span>");
                span.addClass("caret");
                span.appendTo(btn);
                idCitta = "All";
            })
            a.appendTo(li)

            for (const genere of generi) {
                let li = $("<li>")
                li.appendTo(ul);
                let a = $("<a>");
                a.text(genere.genere);
                a.prop("json", genere);
                a.on("click", function() {
                    btn.text(a.text());
                    span = $("<span>");
                    span.addClass("caret");
                    span.appendTo(btn);
                    idGenere = genere.id;
                })
                a.appendTo(li)
            }
        })

        //  lst citta
        let request2 = inviaRichiesta("get", URL + "/citta/");
        request2.fail(errore);
        request2.done(function(jsonCitta) {

            _lstCitta.addClass("dropdown");

            let btn = $("<button>");
            btn.addClass("btn btn-secondary dorpdown-toggle");
            btn.prop("type", "button");
            btn.attr("data-toggle", "dropdown");
            btn.text("Città");
            btn.appendTo(_lstCitta);

            let span = $("<span>");
            span.addClass("caret");
            span.appendTo(btn);

            let ul = $("<ul>")
            ul.addClass("dropdown-menu")
            ul.appendTo(_lstCitta);

            let li = $("<li>")
            li.appendTo(ul);

            let a = $("<a>");
            a.text("All");
            a.on("click", function() {
                btn.text(a.text());
                span = $("<span>");
                span.addClass("caret");
                span.appendTo(btn);
                idCitta = "All";
            })
            a.appendTo(li)

            for (const nCitta of jsonCitta) {
                let li = $("<li>")
                li.appendTo(ul);
                let a = $("<a>");
                a.text(nCitta.citta);
                a.prop("json", nCitta);
                a.on("click", function() {
                    btn.text(a.text());
                    span = $("<span>");
                    span.addClass("caret");
                    span.appendTo(btn);
                    idCitta = nCitta.id;
                    struttura = nCitta.struttura;
                    nPosti = nCitta.nPosti;
                })
                a.appendTo(li)
            }
        })
    }

    function caricaTabellaAll() {
        _divDettagli.hide()

        let request = inviaRichiesta("get", URL + "/concerti/")
        request.fail(errore);
        request.done(function(concerti) {
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

                // genere
                let requestGenere = inviaRichiesta("get", URL + "/generi?id=" + concerto.codGenere);
                requestGenere.fail(errore);
                requestGenere.done(function(jsonGenere) {
                    let tdGen = $("<td>")
                    tdGen.text(jsonGenere[0].genere);
                    tdGen.appendTo(tr);

                    // citta
                    let requestCitta = inviaRichiesta("get", URL + "/citta?id=" + concerto.codCitta);
                    requestCitta.fail(errore);
                    requestCitta.done(function(jsonCitta) {
                        let tdCitta = $("<td>")
                        tdCitta.text(jsonCitta[0].citta);
                        tdCitta.appendTo(tr);

                        tdCitta = $("<td>")
                        tdCitta.text(jsonCitta[0].struttura);
                        tdCitta.appendTo(tr);

                        tdCitta = $("<td>")
                        tdCitta.text(jsonCitta[0].nPosti);
                        tdCitta.appendTo(tr);

                        let tdBtn1 = $("<td>");
                        let btnDettagli = $("<button>")
                        btnDettagli.addClass("btn btn-info btn-xs");
                        btnDettagli.prop("type", "button");
                        btnDettagli.prop("jsonConcerto", concerto);
                        btnDettagli.prop("dettagliConcerto", concerto.dettagli);
                        btnDettagli.text("DETTAGLI");
                        btnDettagli.on("click", visualizzaDettagli);
                        btnDettagli.appendTo(tdBtn1);
                        tdBtn1.appendTo(tr);

                        let tdBtn2 = $("<td>");
                        let btnPrenota = $("<button>")
                        btnPrenota.addClass("btn btn-success btn-xs");
                        btnPrenota.prop("type", "button");
                        btnPrenota.prop("numPosti", concerto.nPosti);
                        btnPrenota.on("click", prenota);
                        btnPrenota.text("PRENOTA");
                        btnPrenota.appendTo(tdBtn2);
                        tdBtn2.appendTo(tr);
                    })
                })
            }
        })
    }

    _btnFiltro.on("click", function() {
        _divDettagli.hide()

        filtraClick = true;

        if (idGenere == undefined) {
            idGenere = "All";
        }
        if (idCitta == undefined) {
            idCitta = "All";
        }

        let url = "";

        if (idGenere == "All" && idCitta != "All") {
            url = URL + "/concerti?codCitta=" + idCitta;
        } else if (idGenere != "All" && idCitta == "All") {
            url = URL + "/concerti?codGenere=" + idGenere;
        } else if (idGenere == "All" && idCitta == "All") {
            caricaTabellaAll();
        } else if (idGenere != "All" && idCitta != "All") {
            url = URL + "/concerti?codGenere=" + idGenere + "&codCitta=" + idCitta;
        }

        _tbody.empty();

        let request = inviaRichiesta("get", url);
        request.fail(errore);
        request.done(function(concerti) {
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

                td = $("<td>");
                td.text(_lstGeneri.children("button").text());
                td.appendTo(tr);

                td = $("<td>");
                td.text(_lstCitta.children("button").text());
                td.appendTo(tr);

                td = $("<td>");
                td.text(struttura);
                td.appendTo(tr);

                td = $("<td>");
                td.text(nPosti);
                td.appendTo(tr);

                td = $("<td>");
                let btnDettagli = $("<button>")
                btnDettagli.addClass("btn btn-info btn-xs");
                btnDettagli.prop("type", "button");
                btnDettagli.prop("dettagliConcerto", concerto.dettagli);
                btnDettagli.text("DETTAGLI");
                btnDettagli.on("click", visualizzaDettagli);
                btnDettagli.appendTo(td);
                td.appendTo(tr);

                td = $("<td>");
                let btnPrenota = $("<button>")
                btnPrenota.addClass("btn btn-success btn-xs");
                btnPrenota.prop("type", "button");
                btnPrenota.prop("numPosti", concerto.nPosti);
                btnPrenota.text("PRENOTA");
                btnPrenota.on("click", prenota);
                btnPrenota.appendTo(td);
                td.appendTo(tr);
            }
        })
    })

    function visualizzaDettagli() {
        _divDettagli.show()
        _divDettagli.children("textarea").text("");
        _divDettagli.children("textarea").text($(this).prop("dettagliConcerto"))
    }

    function prenota() {
        let url = URL + "/citta?nPosti=" + $(this).prop("numPosti");
        let request = inviaRichiesta("patch", url, { "numPosti": parseInt($(this).prop("numPosti")) - 1 });

        request.fail(errore);
        request.done(function() {
            if (filtraClick) {
                _btnFiltro.trigger("click");
            } else {
                caricaTabellaAll();
            }
            alert("nPosti aggiotnato")
        })
    }
})
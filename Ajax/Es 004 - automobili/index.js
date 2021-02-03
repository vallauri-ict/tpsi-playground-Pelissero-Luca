"use strict"

const URL = "http://localhost:3000"
let intestazione = [{
        "tag": "th",
        "text": "nomeModello",
        "width": "15%",
    },
    {
        "tag": "th",
        "text": "colore",
        "width": "15%",
    },
    {
        "tag": "th",
        "text": "nomeModello",
        "width": "15%",
    },
    {
        "tag": "th",
        "text": "anno",
        "width": "10%",
    },
    {
        "tag": "th",
        "text": "img",
        "width": "20%",
    },
    {
        "tag": "th",
        "text": "Dettagli",
        "width": "13%",
    },
    {
        "tag": "th",
        "text": "Elimina",
        "width": "12%",
    }
]

$(document).ready(function() {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
    let _table = $("table")
    let _dettagli = $(".row").eq(2).children("div").eq(1)

    _dettagli.hide()

    let request = inviaRichiesta("get", URL + "/marche");
    request.fail(errore);
    request.done(function(marche) {
        for (const marca of marche) {
            let op = $("<option>");
            op.val(marca.id);
            op.text(marca.nome);
            op.appendTo(_lstMarche);
        }
        _lstMarche.prop("selectedIndex", -1);
    });

    // ------------------------------------------------

    _lstMarche.on("change", function() {
        _lstModelli.html("");
        let codMarca = _lstMarche.val();
        let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + codMarca);
        request.fail(errore);
        request.done(function(modelli) {
            for (const modello of modelli) {
                let op = $("<option>");
                op.val(modello.id);
                op.text(modello.nome + " - " + modello.alimentazione);
                op.appendTo(_lstModelli);
            }
            _lstModelli.prop("selectedIndex", -1);
        });
    })

    _lstModelli.on("change", function() {
        _table.empty();

        let opzioneSelezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex")).text();
        _lstModelli.prop("nome", opzioneSelezionata.split(" - ")[0]);
        _lstModelli.prop("alimentazione", opzioneSelezionata.split(" - ")[1]);

        let codModello = _lstModelli.val();
        let request = inviaRichiesta("get", URL + "/automobili?codModello=" + codModello);

        request.fail(errore);
        request.done(function(automobili) {
            let thead = $("<thead>");
            thead.appendTo(_table);
            let tr = $("<tr>");
            tr.appendTo(thead);
            for (let i = 0; i < intestazione.length; i++) {
                let th = $(`<${intestazione[i].tag}>`);
                th.appendTo(tr);
                th.text(intestazione[i].text);
                th.css("with", intestazione[i].width);
            }
            let tbody = $("<tbody>");
            tbody.appendTo(_table);
            for (const auto of automobili) {
                let tr = $("<tr>");
                tr.appendTo(tbody);

                let td = $("<td>");
                td.appendTo(tr);
                td.text(_lstModelli.prop("nome"))

                td = $("<td>");
                td.appendTo(tr);
                td.text(_lstModelli.prop("alimentazione"))

                td = $("<td>");
                td.appendTo(tr);
                td.text(auto.colore);

                td = $("<td>");
                td.appendTo(tr);
                td.text(auto.anno)

                td = $("<td>");
                td.appendTo(tr);
                let img = $("<img>")
                img.appendTo(td);
                img.prop("src", `img/${auto.img}`)
                img.css("height", "65px")

                td = $("<td>");
                td.appendTo(tr);
                let btn = $("<button>")
                btn.appendTo(td);
                btn.text("Dettagli")

                td = $("<td>");
                td.appendTo(tr);
                btn = $("<button>")
                btn.appendTo(td);
                btn.text("Elimina")
            }
        });
    })

});
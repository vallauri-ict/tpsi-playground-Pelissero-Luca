"use strict"

const URL = "http://localhost:3000";
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

    let modelloSelezionato;

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

                //  dentro ogni opzione salvo le infomazioni del modello
                // op.prop("modello", modello);
            }
            _lstModelli.prop("selectedIndex", -1);
        });
    })

    _lstModelli.on("change", function() {
        _table.empty();

        modelloSelezionato = _lstModelli.val();

        // let opzioneSelezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex"));

        // salvo dentro il listbox le info del modello selezionato
        // _lstModelli.prop("modello", opzioneSelezionata.prop("modello"));
        // _lstModelli.prop("nome", opzioneSelezionata.split(" - ")[0]);
        // _lstModelli.prop("alimentazione", opzioneSelezionata.split(" - ")[1]);

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
                td.text((_lstModelli.prop("modello")).nome)

                td = $("<td>");
                td.appendTo(tr);
                td.text((_lstModelli.prop("modello")).alimentazione)

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
                btn.addClass("btn btn-xs btn-success");
                btn.appendTo(td);
                btn.text("Dettagli")
                btn.prop("automobile", auto)
                btn.on("click", dettagliClick)

                td = $("<td>");
                td.appendTo(tr);
                btn = $("<button>")
                btn.addClass("btn btn-xs btn-secondary");
                btn.appendTo(td);
                btn.prop("id", auto.id);
                btn.text("Elimina")
                btn.on("click", eliminaClick);
            }
        });
    })

    function dettagliClick() {
        _dettagli.show();

        $("#txtId").val(($(this).prop("automobile")).id);
        $("#txtTarga").val(($(this).prop("automobile")).targa);
        $("#txtColore").val(($(this).prop("automobile")).colore);
        $("#txtAnno").val(($(this).prop("automobile")).anno);
        $("#txtKm").val(($(this).prop("automobile")).km);
        $("#txtPrezzo").val(($(this).prop("automobile")).prezzo);

        let url = URL + "/modello/" + modelloSelezionato;
        let request = inviaRichiesta("get", url);
        request.fail(errore);
        request.done(function(modello) {
            $("#txtNome").val(modello.nome);
            $("#txtAlimentazione").val(modello.alimentazione);
            $("#txtCilindrata").val(modello.cilindrata);
        })
    }

    let btnSalva = $("#btnSalva");
    btnSalva.on("click", function() {
        let url = URL + "/automobili/" + $("#txtId").val();
        let request = inviaRichiesta("patch", url, { "prezzo": parseInt($("#txtPrezzo").val()) });
        request.fail(errore);
        request.done(function() {
            alert("Prezzo aggiornato correttamente");
            _lstModelli.trigger("change");
        })
    });

    function eliminaClick() {
        let url = URL + "/automobili/" + ($(this).prop("id"));
        let request = inviaRichiesta("delete", url);
        request.fail(errore);
        request.done(function() {
            alert("Automobile eliminata correttamente");
            // forza l'evento change come se avessi cliccato con il mouse (aggiorna il listBox)
            _lstModelli.trigger("change");
        })
    }

});
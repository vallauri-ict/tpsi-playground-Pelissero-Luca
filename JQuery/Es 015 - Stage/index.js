"use strict"

$(document).ready(function() {

    let _wrapper = $("#wrapper");
    let _timer = $("#timer");
    let _header = $("#header");
    let _mainSection = $("#mainSection");

    animazioneHeader();

    // ---------------------------------------------------- funzioni

    function animazioneHeader() {
        _header.animate({ "width": 60 * 15, "height": 6 * 15, "font-size": 2 * 15, "line-height": 6 * 15 }, 1500, creaElementi);
    }

    // creazione elementi e gestione timer
    function creaElementi() {
        let cont = 0;

        for (var item1 of elencoDomande) {
            // creazione fieldset
            let fieldset = $("<fieldset>");
            fieldset.addClass("fieldset");
            fieldset.appendTo(_mainSection);

            // creazione legend
            let legend = $("<legend>");
            legend.text(item1.argomento);
            legend.css({ "color": "blue", "font-size": 12 });
            legend.appendTo(fieldset);

            // creazione domande e radio button
            for (var item2 of item1.domande) {
                cont++;

                let domanda = $("<p>");
                domanda.text(item2.domanda);
                domanda.appendTo(fieldset);

                let radioT = $("<input>");
                radioT.prop({ "type": "radio", "name": `opt${cont}`, "value": "T" });
                radioT.appendTo(domanda);

                let lblT = $("<label>");
                lblT.text("T");
                lblT.prop("id", "lbl");
                lblT.appendTo(domanda);

                let radioF = $("<input>");
                radioF.prop({ "type": "radio", "name": `opt${cont}`, "value": "F" });
                radioF.appendTo(domanda);

                let lblF = $("<label>");
                lblF.text("F");
                lblF.prop("id", "lbl");
                lblF.appendTo(domanda);

                if (item2.risposta == "T") {
                    radioT.prop("risposta", "ok");
                    radioF.prop("risposta", "nok");
                } else {
                    radioT.prop("risposta", "nok");
                    radioF.prop("risposta", "ok");
                }
            }
        }

        // creazione timer
        let secondi = $("<span>");
        let txtSecondi = 0;
        secondi.text(":0" + txtSecondi);
        let mySeconds = setInterval(function() {
            txtSecondi++;
            if (txtSecondi < 10)
                secondi.text(":0" + txtSecondi);
            else
                secondi.text(":" + txtSecondi);
            if (txtSecondi == 59)
                txtSecondi = 0;
        }, 1000);

        let minuti = $("<span>");
        let txtMin = 0;
        minuti.text("0" + txtMin);
        let myMinutes = setInterval(function() {
            txtMin++;
            if (txtSecondi < 10)
                minuti.text("0" + txtMin);
            else
                minuti.text(txtMin);
        }, 60000);

        minuti.appendTo(_timer);
        secondi.appendTo(_timer);

        // creazione bottone invia
        let btn = $("<input>")
        btn.prop({ "type": "button", "value": "Invia" });
        btn.addClass("invia");
        btn.appendTo(mainSection)

        btn.on("click", function() {
            $(this).prop("disabled", true);
            $(this).css({ "background-color": "#CCC" })
            clearInterval(mySeconds);
            clearInterval(myMinutes);
            calcolaPunti();
        });

        // timer >= 2min
        if (txtMin == 2) {
            clearInterval(mySeconds);
            clearInterval(myMinutes);
            btn.prop("disabled", true);
            btn.css({ "background-color": "#CCC" });
            calcolaPunti();
        }
    }

    function calcolaPunti() {

        let punti = 0;
        let radio = _mainSection.find("input[type=radio]");
        let lbl = _mainSection.find("label");

        for (var i = 0; i < radio.length; i++) {
            if (radio.eq(i).prop("checked") && radio.eq(i).prop("risposta") == "ok") {
                punti++;
            } else if (radio.eq(i).prop("checked") && radio.eq(i).prop("risposta") != "ok") {
                punti = punti - 0.25;
                lbl.eq(i).css({ "color": "red" });
            }
        }
        alert(`Hai totalizzato ${punti} punti`);
    }

});



// Una semplice funzione per aggiungere uno 0 davanti ad un numero < 10
function pad(number) {
    return (number < 10 ? '0' : '') + number;
}
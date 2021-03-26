"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"
const ROSSO = "rgba(255, 0, 0, 0.5)"
const BLU = "rgba(0, 0, 255, 0.5)"

let nomeFila = ["T", "S", "R", "Q", "P", "O", "N", "M", "L", "I", "H", "G", "F", "E", "D", "C", "B", "A"]
let nomeColonna = [28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27]

let inizioFine = [
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },
    { "inizio": 0, "fine": 27 },

    { "inizio": 1, "fine": 26 },
    { "inizio": 2, "fine": 25 },
    { "inizio": 2, "fine": 25 },
    { "inizio": 3, "fine": 24 },
    { "inizio": 3, "fine": 24 },
    { "inizio": 4, "fine": 23 },
    { "inizio": 4, "fine": 23 },
    { "inizio": 4, "fine": 23 },
]


$(document).ready(function() {
    let wrapper = $("#wrapper")
    let divSpettacoli = $("#divSpettacoli")
    let divMappa = $("#divMappa")
    let mappa = divMappa.children("div").eq(0)
    let titolo = wrapper.children("h3")
    let sottotitolo = wrapper.children("p")
    let btnAcquista = divMappa.children("button")

    let dataOggi = "2021-03-24"

    divMappa.hide();
    caricaConcerti()

    // -------------------------------------------------------------------

    function caricaConcerti() {
        let request = inviaRichiesta("get", "/spettacoli")
        request.fail(errore);
        request.done(function(spettacoli) {
            for (const spettacolo of spettacoli) {
                let div = $("<div>");
                div.appendTo(divSpettacoli);

                let divImg = $("<div>");
                divImg.addClass("img");
                divImg.appendTo(div);

                let divDetails = $("<div>");
                divDetails.addClass("details");
                divDetails.appendTo(div);

                let img = $("<img>");
                img.prop("src", "img/" + spettacolo.titolo + ".jpg");
                img.appendTo(divImg);

                let p = $("<p>");
                p.text(spettacolo.titolo)
                p.appendTo(divDetails);

                p = $("<p>");
                p.text("di " + spettacolo.autore)
                p.appendTo(divDetails);

                p = $("<p>");
                p.text(spettacolo.data)
                p.appendTo(divDetails);

                p = $("<p>");
                p.text(spettacolo.prezzo)
                p.appendTo(divDetails);

                let btn = $("<button>")
                btn.text("Acquista biglietti")
                btn.on("click", acquista)
                btn.prop("spet", spettacolo);
                if (spettacolo["data-utc"] < dataOggi) {
                    btn.prop("disabled", true);
                }
                btn.appendTo(divDetails);
            }
        })
    }

    function acquista() {
        divSpettacoli.fadeOut(500);
        divMappa.fadeIn(500);
        titolo.text($(this).prop("spet").titolo)
        sottotitolo.text($(this).prop("spet").data)


        let request = inviaRichiesta("get", "/mappaPoltrone_" + $(this).prop("spet").id)
        request.fail(errore);
        request.done(function(poltrone) {
            for (let riga = 0; riga < 18; riga++) {
                for (let col = 0; col < 28; col++) {
                    let divPol = $("<div>")
                    divPol.addClass("poltrona")
                    divPol.prop("nome", nomeFila[riga] + "" + nomeColonna[col])
                    divPol.css({ "top": X0 + (17.5 * riga), "left": Y0 + (16.5 * col), "background-color": VERDE });
                    divPol.appendTo(divMappa.children("div").eq(0))
                }
            }
        })
    }
});
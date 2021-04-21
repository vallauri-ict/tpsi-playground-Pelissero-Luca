"use strict"

$(document).ready(function() {
    let _divFilm = $("#div_Film")
    let _divDettagli = $("#div_Dettagli")
    let _divRiproduzione = $("#div_Riproduzione")
    let _divElencoFilm = $(".elencoFilm")

    let idFilmSel;
    let titleFilmSel;

    _divDettagli.hide();
    _divRiproduzione.hide();

    caricaGeneri();
    caricaFilm();

    // ---------------------------------

    function caricaGeneri() {
        let request = inviaRichiesta("get", "/generi")
        request.fail(errore)
        request.done(function(generi) {
            let op = $("<option>")
            op.text("tutti");
            op.val(0);
            op.appendTo(_divFilm.find("select"))

            for (const genere of generi) {
                op = $("<option>")
                op.text(genere.nome);
                op.val(genere.id);
                op.appendTo(_divFilm.find("select"))
            }
        })
    }

    function caricaFilm() {
        let request = inviaRichiesta("get", "/film")
        request.fail(errore)
        request.done(function(films) {
            for (const film of films) {
                let div = $("<div>")
                div.prop("info", film);
                div.on("click", dettagliFilm)
                div.appendTo(_divElencoFilm);

                let img = $("<img>")
                img.prop("src", "img/" + film.titolo + ".png")
                img.appendTo(div);
            }
        })
    }

    _divFilm.find("button").on("click", function() {
        _divElencoFilm.empty();
        let optSel = _divFilm.find("select").prop("selectedIndex");

        if (optSel == 0) {
            caricaFilm();
        } else {
            let url;
            if (_divFilm.find("input").prop("checked") == true) {
                url = "/film?genere=" + optSel + "&prezzo=free";
            } else {
                url = "/film?genere=" + optSel;
            }
            let request = inviaRichiesta("get", url)
            request.fail(errore)
            request.done(function(films) {
                for (const film of films) {
                    let div = $("<div>")
                    div.prop("info", film);
                    div.on("click", dettagliFilm);
                    div.appendTo(_divElencoFilm);

                    let img = $("<img>")
                    img.prop("src", "img/" + film.titolo + ".png")
                    img.appendTo(div);
                }
            })
        }
    })


    function dettagliFilm() {
        _divFilm.hide();
        _divDettagli.show();

        idFilmSel = $(this).prop("info").id;
        titleFilmSel = $(this).prop("info").titolo;
        _divDettagli.children("p").eq(0).text($(this).prop("info").titolo)
        _divDettagli.children("p").eq(1).text("prezzo: " + $(this).prop("info").prezzo)
        _divDettagli.children("p").eq(2).text($(this).prop("info").descrizione)
        _divDettagli.children("p").eq(3).text("visualizzazioni: " + $(this).prop("info").nVisualizzazioni)
        _divDettagli.children("img").prop("src", "img/" + $(this).prop("info").titolo + ".png")
    }

    _divDettagli.children("div").on("click", function() {
        _divFilm.show();
        _divDettagli.hide();
    })

    _divDettagli.children("button").on("click", function() {
        _divDettagli.hide();
        _divRiproduzione.show();

        $("#wrapper").children("h2").text(titleFilmSel);
        _divRiproduzione.children("video").prop("src", "video/video" + idFilmSel + ".mp4");

        let visualizzazioni = _divDettagli.children("p").eq(3).text().split(' ')[1]
        let request = inviaRichiesta("patch", "/film/" + idFilmSel, { "nVisualizzazioni": (parseInt(visualizzazioni) + 1) })
        request.fail(errore);
        request.done(function() {
            console.log("Numero di visualizzazioni aggiornato");
        })
    })
});
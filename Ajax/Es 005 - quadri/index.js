"use strict"

const URL = "http://localhost:3000"

$(function() {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    let _wrapperAdd = $('.wrapper').eq(1);


    let quadroCorrente = 0;

    _btnPrev.prop("disabled", true)

    crea();

    // -----------------------------------------------

    function crea() {
        let request = inviaRichiesta("get", URL + "/artisti");
        let n = 1;

        request.fail(errore);
        request.done(function(artisti) {
            for (const artista of artisti) {
                let radio = $("<input>");
                radio.prop("type", "radio");
                radio.prop("name", "artistaName");
                radio.prop("numArt", n++);
                radio.prop("gender", artista.gender);
                radio.on("click", aggiornaQuadri)
                radio.appendTo(_head);

                let label = $("<label>");
                label.text(artista.name);
                label.appendTo(_head);
            }
            let artCheked = generaNumero(0, 5);
            _head.find("input[type=radio]").eq(artCheked).prop("checked", true);
            quadriInizali(artCheked);
        })
    }

    function quadriInizali(numArt) {
        numArt++;
        let request = inviaRichiesta("get", URL + "/quadri?artist=" + numArt);

        request.fail(errore);
        request.done(function(quadriArtista) {
            console.log(quadriArtista);

            let pId = $("<p>")
            pId.text("ID: " + quadriArtista[quadroCorrente].id);
            pId.appendTo(_info);

            let pTitolo = $("<p>")
            pTitolo.text("Titolo: " + quadriArtista[0].title);
            pTitolo.appendTo(_info);

            let pGenere = $("<p>")
            pGenere.text("Genere: " + _head.find("input[type=radio]:checked").prop("gender"));
            pGenere.appendTo(_info);

            let pLike = $("<p>")
            pLike.text("Like: " + quadriArtista[0].nLike);
            pLike.appendTo(_info);

            let imgLike = $("<img>");
            imgLike.prop("src", "like.jpg");
            imgLike.prop("numLike", quadriArtista[0].nLike);
            imgLike.addClass("like");
            imgLike.on("click", aggiornaLike);
            imgLike.appendTo(_info);

            let imgQuadro = $("<img>");
            imgQuadro.prop("src", "img/" + quadriArtista[0].img);
            imgQuadro.appendTo(_img);

            wrapper2();
        })
    }

    function aggiornaQuadri() {
        _info.empty();
        _img.empty();

        let request = inviaRichiesta("get", URL + "/quadri?artist=" + _head.find("input[type=radio]:checked").prop("numArt"));

        request.fail(errore);
        request.done(function(quadriArtista) {
            console.log(quadriArtista);

            let pId = $("<p>")
            pId.text("ID: " + quadriArtista[quadroCorrente].id);
            pId.appendTo(_info);

            let pTitolo = $("<p>")
            pTitolo.text("Titolo: " + quadriArtista[quadroCorrente].title);
            pTitolo.appendTo(_info);

            let pGenere = $("<p>")
            pGenere.text("Genere: " + _head.find("input[type=radio]:checked").prop("gender"));
            pGenere.appendTo(_info);

            let pLike = $("<p>")
            pLike.text("Like: " + quadriArtista[quadroCorrente].nLike);
            pLike.appendTo(_info);

            let imgLike = $("<img>");
            imgLike.prop("src", "like.jpg");
            imgLike.prop("numLike", quadriArtista[0].nLike);
            imgLike.addClass("like");
            imgLike.on("click", aggiornaLike);
            imgLike.appendTo(_info);

            let imgQuadro = $("<img>");
            imgQuadro.prop("src", "img/" + quadriArtista[quadroCorrente].img);
            imgQuadro.appendTo(_img);

            wrapper2();
        })
    }

    _btnPrev.on("click", function() {
        quadroCorrente--;

        if (quadroCorrente == 0) {
            _btnPrev.prop("disabled", true);
        }
        if (_btnNext.prop("disabled") == true) {
            _btnNext.prop("disabled", false);
        }

        aggiornaQuadri()
    });

    _btnNext.on("click", function() {
        quadroCorrente++;

        if (_head.find("input[type=radio]:checked").text() == "Picasso") {
            if (quadroCorrente == 3) {
                _btnNext.prop("disabled", true);
            }
        } else {
            if (quadroCorrente == 2) {
                _btnNext.prop("disabled", true);
            }
        }
        if (_btnPrev.prop("disabled") == true) {
            _btnPrev.prop("disabled", false);
        }

        aggiornaQuadri()
    });

    function aggiornaLike() {
        let url = URL + "/quadri/" + parseInt(_info.children().eq(0).text().split(" ")[1]);
        let request = inviaRichiesta("patch", url, { "nLike": parseInt(_info.children().eq(3).text().split(" ")[1]) + 1 });

        request.fail(errore);
        request.done(function() {
            _head.find("input[type=radio]:checked").trigger("click");
        })
    }

    function wrapper2() {
        _wrapperAdd.children("h1").text("Inserisci un nuovo quadro di " + _head.find("input[type=radio]:checked").next().text());
    }
})
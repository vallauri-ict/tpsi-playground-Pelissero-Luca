"use strict"

const URL = "http://localhost:3000"

$(function() {
    let _head = $('.head')
    let _info = $('.info')
    let _img = $('.img')
    let _btnPrev = $('button').eq(0)
    let _btnNext = $('button').eq(1)
    _btnPrev.prop("disabled", true)

    let quadri;
    let _wrapperAdd = $('.wrapper').eq(1)

    let request = inviaRichiesta("get", URL + "/artisti")
    request.fail(errore)
    request.done(function(artisti) {
        for (const artista of artisti) {
            let lbl = $("<label>").appendTo(_head)
            let radio = $("<input type='radio' name='artisti'>").appendTo(lbl)
            lbl.append(artista.name)
                // lbl.html(lbl.html() + artista.name) // NO! Perde il riferimento a radio!!!
            radio.prop("artista", artista)
        }

        let n = generaNumero(0, artisti.length - 1)
        let chk = $("input[type='radio']").eq(n)
        chk.prop("checked", true)

        let idArtista = chk.prop("artista").id
        let request2 = inviaRichiesta("get", URL + "/quadri?artist=" + idArtista)
        request2.fail(errore)
        request2.done(function(quadris) {
            visualizzaQuadro(chk.prop(quadris[0], "artista").gender)
            quadri = quadris;
        })
    })

    function InviaRichiestaQuadri(params) {

    }

    _head.on("click", "input", function() {
        let id = $(this).prop("artista").id;
    })

    function visualizzaQuadro(genere, quadro) {
        _info.html = ""
        $("<p>").text("ID = " + quadro.id).appendTo(_info)
        $("<p>").text("titolo = " + quadro.title).appendTo(_info)
        $("<p>").text("genere = " + genere).appendTo(_info)
        let imgLike = $("<img>").prop("src", "like.jpg").addClass("like")
        $("<p>").text("Like = " + quadro.nLike).appendTo(_info).append(imgLike)

        $("<img>").prop("src", "img/" + quadro.img).appendTo(_img)
    }
})
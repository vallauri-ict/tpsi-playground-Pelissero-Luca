"use strict"

$(document).ready(function() {

    let _login = $("#login")
    let _test = $("#test")

    let _txtUsr = $("#usr")
    let _txtPwd = $("#pwd")
    let _btnLogin = $("#btnLogin")
    let _lblErrore = $("#lblErrore")

    let _domande = $(".domande")

    /* ******************************* */

    _login.show()
    _test.hide()
    _lblErrore.hide()
    let idStudente;

    _btnLogin.on("click", function() {
        let user = _txtUsr.val();
        let pwd = _txtPwd.val();
        let json = {
                "user": user,
                "pwd": pwd
            }
            // uguale a quella sotto: let request = inviaRichiesta("get",`/studenti?user=${user}&pwd=${pwd}`); 
        let request = inviaRichiesta("get", "/studenti", json); // più strutturata
        request.fail(errore);
        request.done(function(data) {
            // data è un vettore che può essere lungo 1 se log in ok oppure 0 se login non è ok
            console.log(data);
            if (data.length == 0)
                _lblErrore.fadeIn(600);
            else {
                _login.hide();
                _test.show();
                idStudente = data[0].id;
                InviaRichiestaDomande();
            }
        })
    })

    _lblErrore.children("button").on("click", function() {
            _lblErrore.fadeOut(600)
        })
        /* ***************************************** */
    function InviaRichiestaDomande() {
        let request = inviaRichiesta("get", "/domande");
        request.fail(errore);
        request.done(function(domande) {
            for (const domanda of domande) {
                let br = $("<br>");
                br.appendTo(_test.children().eq(2));

                let div = $("<div>");
                div.appendTo(_test.children().eq(2));

                let p = $("<p>");
                p.addClass("domanda");
                p.text(domanda.domanda);
                p.prop("id", domanda.id);
                //p.appendTo(_domande);
                p.appendTo(div);

                let requestRisposte = inviaRichiesta("get", "/risposte?codDomanda=" + domanda.id);
                requestRisposte.fail(errore);
                requestRisposte.done(function(risposte) {
                    for (const risposta of risposte) {
                        let opt = $("<input type=radio>");
                        opt.prop("risposta", risposta);
                        opt.prop("name", domanda.id);
                        opt.appendTo(div);

                        let span = $("<span>");
                        span.text(" " + risposta.risposta);
                        span.appendTo(div);
                        let br = $("<br>");
                        br.appendTo(div);
                    }
                    let opt = $("<input type=radio>");
                    opt.prop("risposta", { "correct": false });
                    opt.prop("name", domanda.id);
                    opt.prop("checked", true);
                    opt.appendTo(div);

                    let span = $("<span>");
                    span.text(" Non rispondo");
                    span.appendTo(div);

                    let br = $("<br>");
                    br.appendTo(div);
                })
            }
            let button = $("<button>");
            button.appendTo(_test.children().eq(2));
            button.text("INVIA");
            button.on("click", function() {
                let _opts = $("input[type=radio]:checked");
                let voto = 0;
                // for (const opt of _opts) {
                //     if($(opt).prop("risposta").correct == true)
                //         voto++;
                //     else
                //         $(opt).next().css("color","red");
                // }
                _opts.each(function(i, ref) {
                    if ($(this).prop("risposta").correct == true)
                        voto++;
                    else
                        $(ref).next().css({ "color": "red" });
                })
                let request = inviaRichiesta("patch", "/studenti/" + idStudente, { "voto": voto });
                request.fail(errore);
                request.done(function(data) {
                    console.log(data);
                    alert("Complimenti hai preso un bel " + voto);
                })
            })
        })
    }

});
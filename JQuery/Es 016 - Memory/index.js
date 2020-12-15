'use strict'

let LIVELLO = 1
let nCerchiBlu = 2
let cerchiTrovati
let r = 2
let c = 2

$(document).ready(function() {
    let _wr = $("#wrapper")

    start()

    function start() {
        _wr.empty()
        _wr.off("click")
        cerchiTrovati = 0
            // Creazione pedine
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                let div = $("<div>").appendTo(_wr).addClass("shape")
                div.prop("id", i + "-" + j)
            }
        }
        // pedine da colorare
        let pedineColorate = []
        do {
            let ri = generaNumero(0, r - 1)
            let co = generaNumero(0, c - 1)
            if (!pedineColorate.includes(ri + "-" + co)) {
                pedineColorate[pedineColorate.length] = ri + "-" + co
            }
        } while (pedineColorate.length != LIVELLO + 1)
        // colora pedine
        coloraPedine(pedineColorate)
            // check vittoria
        _wr.on("click", "div", check)
    }

    function check() {
        if ($(this).prop("blue")) {
            $(this).addClass("blue")
            setTimeout(function() {
                $(this).prop("disabled", true)
                cerchiTrovati++
                if (nCerchiBlu == cerchiTrovati) {
                    alert("COMLIMENTI HAI INDOVINATO!, Ora passiamo al livello successivo")
                    nCerchiBlu++
                    aggiornaLivello()
                    allargaWrpper()
                    LIVELLO++
                    start()
                }
            }, 100)
        } else {
            _wr.off("click")
            $(this).addClass("red")
            setTimeout(function() {
                alert("Hai sbagliato, devi ripetere il livello corrente")
                start()
            }, 100)
        }
    }

    function allargaWrpper() {
        let aus = $("#wrapper").css("width").split("px")
        let currentWidth = parseInt(aus[0])
        aus = $("#wrapper").css("height").split("px")
        let currentHeight = parseInt(aus[0])
        if (c > r) {
            _wr.animate({ "width": currentWidth + 50 }, 1000)
        } else if (r > c) {
            _wr.animate({ "height": currentHeight + 50 }, 1000)
        } else {
            _wr.animate({ "width": currentWidth + 50 }, 1000)
        }
        _wr.animate()
    }

    function coloraPedine(s) {
        console.log(s.length)
        for (let i = 0; i < s.length; i++) {
            let aus = s[i].split("-")
            let r = aus[0]
            let c = aus[1]
            let currentShape = $(`#${r}-${c}`)
            console.log(r + "-" + c)
            currentShape.css({ "backgroundColor": "blue" })
            currentShape.prop("blue", true)
            setTimeout(function() {
                currentShape.css({ "backgroundColor": "" })
            }, 1500)
        }
    }

});

function aggiornaLivello() {
    if (r == c) {
        r++;
    } else {
        c++
    }
}

function generaNumero(a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
}
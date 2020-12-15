"use strict"

$(document).ready(function() {
    let vetColors = new Array(9);

    pulisciVet()

    let _wr = $("#wrapper");
    let _txtPos = $("#txtPosizione");
    let _txtColor = $("#txtColore");
    let _btnOk = $("#btnOk");
    let _msg = $("#lblMsg");
    let _tooltip = $("#tooltip");

    _wr.css({ "background-color": "#FF9", "float": "left" });

    creaDiv();
    _btnOk.on("click", verifica);

    // funzioni ------------------------------------

    function creaDiv() {

        for (let i = 0; i < 9; i++) {
            let div = $("<div>");
            div.addClass("box");
            div.text(i + 1);

            let color = generaNumero(0, 255);
            vetColors[i] = color;
            div.css({ "background-color": `rgb(${color}, ${color}, ${color})` });

            // testo sull'hover
            div.hover(
                // mouseenteer
                function() { _tooltip.text(`rgb(${color}, ${color}, ${color})`).fadeIn(1000) },
                // mouseleave
                function() { _tooltip.text(`rgb(${color}, ${color}, ${color})`).fadeOut(1000) }
            );

            div.appendTo(_wr);
        }
    }

    function verifica() {
        if (vetColors[parseInt(_txtPos.val()) - 1] > parseInt(_txtColor.val())) {
            _txtColor.css({ "background-color": "red" });
            _msg.text("Troppo piccolo");
        } else if (vetColors[parseInt(_txtPos.val()) - 1] < parseInt(_txtColor.val())) {
            _txtColor.css({ "background-color": "blue" });
            _msg.text("Troppo grande");
        } else if (vetColors[parseInt(_txtPos.val()) - 1] == parseInt(_txtColor.val())) {
            _txtColor.css({ "background-color": "#FF9" });
            _wr.children("div").eq(parseInt(_txtPos.val()) - 1).css({ "border-color": "#FF9", "background-color": "#FF9" })
            _msg.text("Bravo!");
        }
    }


    function pulisciVet() {
        for (let i = 0; i < 9; i++) {
            vetColors[i] = 0;
        }
    }


    function generaNumero(min, max) {
        return Math.floor((max - min + 1) * Math.random() + min);
    }

});
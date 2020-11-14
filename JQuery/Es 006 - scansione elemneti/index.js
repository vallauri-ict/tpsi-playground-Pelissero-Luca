"use strict";

let _wrapper;

function evidenzia(selector) {
    _wrapper.children().css({ "backgroundColor": "" })
    _wrapper.children(selector).css({ "backgroundColor": "#FF0" })
}

$(document).ready(function() {
    _wrapper = $("#wrapper")

    $("#btn1").on("click", function() {
        alert($("#wrapper li").length)
        alert($("#wrapper li").children().length)
    })

    $("#btn2").on("click", function() {
        let list = $("#wrapper").children();
        let msg = "";

        //soluzione 1
        for (let i = 0; i < list.length; i++) {
            // tutti simili
            // msg += list[i].innerHTML;
            // msg += $(list[i]).html();
            // msg += list.eq(i).html(); //mi restituisce l'elemento iesimo
        }

        //soluzione 2
        for (const item of list) {
            // msg += $(item).html();
        }

        //soluzione 3
        list.each(function(i, ref) {
            // msg += $(ref).html();
            // msg += list.eq(i).html();
            msg += $(this).html();
        })

        alert(msg);
    })

    $("#btn3").on("click", function() {
        // $("#wrapper li:nth-of-type(even)").css({ "backgroundColor": "#FF0" })
        // vado a prendere i figli di wrapper che soddisfano questa caratteristica
        // $("#wrapper").children(":nth-of-type(even)").css({ "backgroundColor": "#FF0" })
        let aus = $("#wrapper").children(":nth-of-type(even)");
        // aus = filter(":first")
        aus.css({ "backgroundColor": "#FF0" })

        aus.each(function(i, ref) {
            $(ref).css({ "backgroundColor": "#FF0" })
        })
    })

    $("#btn4").on("click", function() {
        let dispari = $("#wrapper").children(":nth-of-type(odd)");

        dispari.each(function(i, ref) {
            let colore = 50 * (i + 1);
            $(ref).css({ "backgroundColor": `rgb(0, ${colore}, 0)` });
        })
    })
});
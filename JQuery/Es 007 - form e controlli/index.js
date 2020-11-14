'use strict'

let _form1;

$(document).ready(function() {
    _form1 = $("#form1");
});

function visualizza(codice) {
    let msg = "";

    switch (codice) {
        case 1:
            msg = _form1.find("input[type=text]:first-of-type").val();
            break;
    }
    alert(msg);
}
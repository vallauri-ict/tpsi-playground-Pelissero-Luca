'use strict'

let _form1;

$(document).ready(function() {
    _form1 = $("#form1");
});

function visualizza(codice) {
    let msg = "";
    let _chk;
    let _opts;

    switch (codice) {
        case 1:
            // find accede a figli e nipoti
            msg = _form1.find("input[type=text]:first-of-type").val();
            break;
        case 2:
            // msg = _form1.children("label:nth-of-type(2)")
            // msg = _form1.children("label").eq(1)
            msg = _form1.children("label").filter(":nth-of-type(2)").children("select").val()
            break;
        case 3:
            _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]");
            // il for of mi restituirebbe degli obj  js
            for (let i = 0; i < _chk.length; i++) {
                msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val() + "\n"
            }
            break;
        case 4:
            // _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]:checked");
            // oppure
            _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]").filter(":checked");
            // i = posizione; ref = puntatore;
            _chk.each(function(i, ref) {
                // msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val() + "\n"
                // oppure
                msg += $(ref).prop("name") + " - " + $(ref).val() + "\n"
            })
            break;
        case 5:
            // .not() esclude quella caratteristica specifica
            _chk = _form1.children("fieldset").eq(0).find("input[type=checkbox]").not(":checked");
            _chk.each(function(i, ref) {
                // msg += _chk.eq(i).prop("name") + " - " + _chk.eq(i).val() + "\n"
                // oppure
                msg += $(ref).prop("name") + " - " + $(ref).val() + "\n"
            })
            break;
        case 6:
            _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]");

            if (_opts.is(":checked"))
                msg = _opts.filter(":checked").val();
            else
                msg = "Nessun radio button selezionato";
            break;
        case 7:
            _opts = _form1.children("fieldset:nth-of-type(2)").find("input[type=radio]").not(":checked");
            _opts.each(function(i, ref) {
                msg += $(ref).val() + "\n";
            })
            break;
        case 8:
            // .last() restituisce l'ultimo elemento della collezione
            // .first() restituisce il primo
            let _select = _form1.find("select").last();
            // _select.children("option:selected").each(function(i, ref) {
            //     msg += $(ref).val() + "\n";
            // })
            // oppure
            for (const item of _select.val()) {
                msg += item + "\n";
            }
            break;
    }
    alert(msg);
    // la differenza tra .filter() e .is() è che .is() restituisce true/false e non la collezione
}

function imposta(codice) {
    switch (codice) {
        case 1:
            _form1.find("input[type=text]").first().val("Nuovo valore");
            break;
    }
}
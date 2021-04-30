"use strict"

$(document).ready(function(){
    $("select[name=lstCitta]").prop("selectedIndex",-1);
    $("#btnInvia").on("click",function(){
        let msg = "";
        if($("#txtNome").val()=="")
            msg += "Nome mancante </br>";
        if($("input[name=optIndirizzo]:checked").length == 0)
            msg += "Indirizzo di studio non selezionato </br>";
        if($("select[name=lstCitta]").prop("selectedIndex") == -1)
            msg += "Residenza non selezionata </br>";

        if(msg != "")
        {
            $("#msg").html(msg);
        }
        else
        {
            $("#msg").html("");
            let form = $("#form1");
            form.prop("action","pagina2.php");
            form.prop("method","get");
            form.submit();
        }
    })
})
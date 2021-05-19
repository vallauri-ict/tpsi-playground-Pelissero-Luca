"use strict"

$(document).ready(function(){
    $("#btnInvia").on("click",function(){
        let anno = $("#txtAnno");
        let titolo = $("#txtTitolo");
        let autore = $("#txtInterprete");
        if(titolo.val() != "" && autore!="" && anno!="")
        {
            let param  = {
                "titolo" : titolo.val(),
                "autore" : autore.val(),
                "anno" : anno.val()
            }
            let request = inviaRichiesta("post", "servizi/inserisci.php",param);
            request.fail(errore);
            request.done(function(data){
                console.log(data);
                alert("record inserito correttamente");
                window.location.href = "index.html";
            })
        }
    })
})
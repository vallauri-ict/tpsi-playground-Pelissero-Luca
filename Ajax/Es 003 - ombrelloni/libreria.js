"use strict";

function inviaRichiesta(url) {
    return $.ajax({
        "url": url,
		"data": "",
		"type": "GET",        // default
		"contentType": "application/x-www-form-urlencoded;charset=utf-8", // default
        "dataType": "json",   // default      
        "timeout": 5000,      // default 
    });	
}


function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}


function generaNumero(a, b){
	return Math.floor((b-a+1)*Math.random()) + a;
}
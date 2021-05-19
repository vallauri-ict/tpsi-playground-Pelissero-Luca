"use strict";

const PHP = true;

function inviaRichiesta(method, url, parameters={}) {
	let contentType;
	// urlencoded --> formato nome = value
	if(method.toUpperCase()=="GET" || PHP)
		contentType="application/x-www-form-urlencoded;charset=utf-8";
	else{
		// se la chiamata è post serializza i dati e li invia
		contentType = "application/json; charset=utf-8"
        parameters = JSON.stringify(parameters);
	}
    return $.ajax({
        // non serve alcun tipo di concatenamento in quanto
        // il browser, automaticamente, richiede il file allo stesso
        // server che ci ha fornito la pagina
        "url": url,
		"data": parameters,
		"type": method,   
		"contentType": contentType, 
        "dataType": "json",   
        "timeout": 5000,      // default
    });
}

function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
        // status significa che la risposta è arrivata correttamente
        // ma è andato in errore in quanto il client non è riuscito a parsificare i dati
	else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
        // un qualunque numero diverso da 200 significa errore, se il server
        // rimanda in dietro un numero diverso da 200 mostriamo semplicemente
        // l'errore che ci ritorna    
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}

function generaNumero(a, b){
	return Math.floor((b-a+1)*Math.random()) + a;
}
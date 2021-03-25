"use strict";
$(document).ready(function(){		
		
	let utenti = [
      {"id" : 1 , "nome" : "Minnie", "password":"ciccio" },
      {"id" : 2 , "nome" : "Pluto" , "password":"sony"},
      {"id" : 3 , "nome" : "Paperino", "password":"jojo"},
      {"id" : 4 , "nome" : "scotland", "password":"Yard"}
   ]
				  
	let ombrelloni = []
	/*
		[{"id":1, stato:[0,0,0,0, etc]},
		 {"id":2, stato:[0,0,0,0, etc]},
		 {"id":3, stato:[0,0,0,0, etc]}]  */
	
	for (let i=1; i<=666; i++){
		let ombrellone = {"id":i, stato:[]}
		for (let j=1; j<=107; j++)
			ombrellone.stato.push(0)
		ombrelloni.push(ombrellone);
	}
	
	// dowload fa in modo di aprire una finestra di dialogo 
	// dopo che sono state eseguite le istruzioni interne a on click
	$("<a>").prop({"download":"ombrelloni.json", "href":"#"}).text("salva json su disco")
	.appendTo(wrapper).on("click", function(){
		let json = {"utenti":utenti, "ombrelloni":ombrelloni}
		json = JSON.stringify(json, null, 3);
		// trasforma questo json in un nuovo oggetto blob
		let blob = new Blob([json], {type : 'application/json'});
		// un blob è un file temporaneo in memoria centrale
		// il metodo URL.createObjectURL restituisce l'indirizzo di questo file
		// temporaneo(lbob)
		$(this).prop("href", URL.createObjectURL(blob));
	})
})

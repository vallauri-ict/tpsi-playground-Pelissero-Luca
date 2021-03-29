"use strict"

$(document).ready(function(){
	let header =$("#header")
	let button = header.children("input")
	let partenza = header.find("input").eq(0)
	let arrivo = header.find("input").eq(1)
	let wrapper = $("#wrapper") 
	let map =  wrapper.children(".map")[0]     // js
	let panel= wrapper.children(".panel")[0]   // js
	let msg =  wrapper.children(".msg") 


	button.on("click", function(){
		if (partenza.val() == "" && arrivo.val() == "") 
			alert("Prego compilare i campi di partenza e arrivo")
		else{	
		
		}
	})

	



});

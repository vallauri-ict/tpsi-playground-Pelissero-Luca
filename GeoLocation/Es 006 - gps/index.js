"use strict"

$(document).ready(function(){
	let wrapper = $("#wrapper")[0];      // js
	let _coordinate = $("#coordinate")

	if(!navigator.geolocation) { 
		alert("il dispositivo in uso non è HTML5 e non supporta la geolocation")
		return
	}

	let gpsOptions = {
		enableHighAccuracy: false,
		timeout: 5000,		
		maximumAge: 0 // tempo max di presenza in cache della risposta (ms)
	}
	navigator.geolocation.getCurrentPosition(visualizzaPosizione, errore, gpsOptions)

    /* ******************************************************************** */

	function visualizzaPosizione(position){

	}

	function errore(err) {
		let msg = `ERRORE: ${err.code} - ${err.message}`
		alert(msg)
		_coordinate.html(msg)
	}

});


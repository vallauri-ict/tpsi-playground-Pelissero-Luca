"use strict"

$(document).ready(function() {
    let header = $("#header")
    let button = header.children("input")
    let partenza = header.find("input").eq(0)
    let arrivo = header.find("input").eq(1)
    let wrapper = $("#wrapper")
    let map = wrapper.children(".map")[0] // js
    let panel = wrapper.children(".panel")[0] // js
    let msg = wrapper.children(".msg")


    button.on("click", function() {
        if (partenza.val() == "" || arrivo.val() == "")
            alert("Prego compilare i campi di partenza e arrivo")
        else {
            let geocoder = new google.maps.Geocoder()

            geocoder.geocode({ 'address': partenza.val() }, function(resulStart, status) {
                if (status == google.maps.GeocoderStatus.OK)
                    alert("Stringa immessa non valida")
                else {
                    geocoder.geocode({ 'address': arrivo.val() }, function(resulArrive, status) {
                        if (status == google.maps.GeocoderStatus.OK)
                            alert("Stringa immessa non valida")
                        else {
                            let coordStart = resulStart[0].geometry.location;
                            let coordArrive = resulArrive[0].geometry.location;
                            visualizzaPercorso(coordStart, coordArrive)
                        }
                    });
                }
            });
        }
    })

    function visualizzaPercorso(start, arrive) {
        let directionsService = new google.maps.DirectionService()
        let directionsRendere = new google.maps.DirectionsRenderer()
        let percorso = {
            "origin": start,
            "destination": arrive,
            "travelMode": google.maps.TravelMode.DRIVING
        }
        directionsService.route(percorso, function(routes, status) {
            if (status != google.maps.DirectionsStatus.OK) {
                alert("Percorso non valido");
            } else {
                let mapOptions = {
                    "center": start,
                    "zoom": 16,
                    "mapTypeId": google.maps.MapTypeId.HYBRID
                };
                let mappa = new google.maps.Map(map, mapOptions)

                directionsRendere.setMap(mappa);
                directionsRendere.setDirections(routes);
                directionsRendere.setPanel(panel);
                let distanza = routes.routes[0].legs[0].distance.text;
                let tempo = routes.routes[0].legs[0].dutarion.text
                msg.html("Distanza: " + distanza + "<br>Tempo di percorrenza: " + tempo);
            }
        })
    }
});
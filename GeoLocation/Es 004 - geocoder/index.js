$(document).ready(function() {

    let wr = $("#wrapper");
    $("#btnVisualizza").on("click", function() {
        let address = $("#txtIndirizzo").val()

        if (address == "") {
            alert("Indirizzo mancante")
        } else {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK)
                    disegnaMappa(results[0]);
                else
                    alert("Stringa immessa non valida");
            });
        }
    })

    function disegnaMappa(geocoderResult) {
        let mapOptions = {
            "center": geocoderResult.geometry.location,
            "zoom": 17
        }
        let mappa = new google.maps.Map(wr[0], mapOptions);
        let marker = new google.maps.Marker({
            "map": mappa,
            "position": geocoderResult.geometry.location,
            "title": "IIS Vallauri"
        })
        let infoWindow = new google.maps.InfoWindow({
            "content": `<div id="infoWindow"> <h2> ITIS Vallauri </h2> <p>indirizzo: Via San Michele 68, Fossano</p> <p>coordinate GPS: ${geocoderResult.geometry.location} </p> </div>`
        })
        marker.addListener("click", function() {
            infoWindow.open(mappa, marker)
        })
    }
});
$(document).ready(function() {

    var wrapper = $("#wrapper")[0]
        // vallauri    // LatLng non accetta strignhe
    let position = new google.maps.LatLng(44.5557763, 7.7347183);

    //#region options
    let mapOptions = {
        "center": position,
        "zoom": 16,
        "mapTypeId": google.maps.MapTypeId.ROADMAP,

        /*
        // ---------------------------------------------------------------
        //   IMPOSTAZIONE MANUALE DEI BOTTONI DI CONTROLLO 
        // ---------------------------------------------------------------
        // disabilito tutti i pulsanti di controllo
        disableDefaultUI: true,

        // Pulsanti di zoom + -
        zoomControl: true,
        zoomControlOptions: { //mi dice dove voglio mettere i pulsanti
            // style: deprecata,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        // Omino StreetView
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        // Pulsanti switch Mappa/Satellite (il chek Rilievo visualizza il TERRAIN)
        mapTypeControl: true,
        mapTypeControlOptions: { //formati di visualizzazione
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, // default
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU, // verticale	
            position: google.maps.ControlPosition.TOP_LEFT,
        },

        // Pulsante FullScreen
        fullscreenControl: true,
        fullscreenOptions: {
            // Non ha opzioni, utilizza una posizione fissa in alto a destra
        },

        // Visualizza nella riga di stato in basso a destra un fattore di scala
        // per default è disabilitato
        scaleControl: true,
        scaleControlOptions: {
            // Non ha opzioni
        },*/
    };
    //#endregion
    // Visualizzazione della mappa  
    let mappa = new google.maps.Map(wrapper, mapOptions);

    let marcatore1 = new google.maps.Marker({ //caratteristiche del marker
        "map": mappa,
        "position": position,
        "title": "IIS Vallauri",
        "Animation": google.maps.Animation.DROP,
        "draggable": true,
        "icon": "img/education/university.png",
    });

    let infoWindow1 = new google.maps.InfoWindow({
        "content": `<div id="infoWindow"> <h2> ITIS Vallauri <img src="img/vallauri.jpg" align="top"> </h2> <p>indirizzo: Via San Michele 68, Fossano</p> <p>coordinate GPS: ${position.toString()} </p> </div>`,
        "width": "150px"
    })

    marcatore1.addListener("click", function() {
        infoWindow1.open(mappa, marcatore1)
    })

    let marcatore2 = new google.maps.Marker({ //caratteristiche del marker
        "map": mappa,
        "position": position,
        "title": " scuola IIS Vallauri",
        "Animation": google.maps.Animation.DROP,
        "draggable": true,
        "icon": "img/education/nanny.png",
    });
})
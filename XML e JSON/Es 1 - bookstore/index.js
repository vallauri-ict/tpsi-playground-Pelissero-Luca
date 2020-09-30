'use-strict'

function crea() {
    localStorage.setItem("bookstore_xml", bookstore);
    alert("Dati salvati correttamente all'interno del localStorage");
}

function visualizza() {
    //lettura della stringa dal localStorage
    let xml = localStorage.getItem("bookstore_xml");
    //istanzio un DOM parser
    let parser = new DOMParser();
    //tramite il DOM parser, parsifico la stringa xml
    let xmlDoc = parser.parseFromString(xml, "text/xml");

    // //righe ausiliarie per vedere se è tutto ok
    // let serializer = new XMLSerializer();
    // let aus = serializer.serializeToString(xmlDoc);
    // console.log(aus);

    //accedo alla radice dell'albero
    let root = xmlDoc.documentElement;

    alert("Dati letti correttamente dal localStorage. N. di record letti = ");
}
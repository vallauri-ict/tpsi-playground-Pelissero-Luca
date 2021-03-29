"use strict"

const URL = "https://maps.googleapis.com/maps/api/"
const key = ""

const params = {
    "key": key,
    "center": "via san michele 68, fossano", //  "44.5557763,7.7347183",
    "location": "via san michele 68, fossano", //  "44.5557763,7.7347183",
    "zoom": 16,
    "size": "800x600",
    // maptype viene aggiunto dopo  manualmente
    "markers": "color:blue|size:big|label:V|via san michele 68, fossano",
    "heading": "-60",
    "pitch": "7",
    "fov": "45"
}
const mapType = ['roadmap', 'satellite', 'hybrid', 'terrain', 'streetview']


window.onload = function() {
    let imgBox = $("#imgBox")
    let btnBox = $("#btnBox")

    for (const item of mapType) {
        let bottone = $("<button>")
        bottone.text(item)
        bottone.appendTo(btnBox)
        bottone.on("click", visualizzaMappa)
    }
    $("button").eq(0).trigger("click")

    function visualizzaMappa() {
        let url
        if ($(this).text() != "streetview") {
            url = URL + "staticmap?"
        } else {
            url = URL + "streetview?"
        }

        url += setParam($(this).text())
        console.log(url)

        $("button").removeClass("active")
        $(this).addClass("active")

        imgBox.prop("src", url)
    }

    function setParam(mapType) {
        let qstring = "";
        for (const key in params) {
            qstring += key + "=" + params[key] + "&"
        }
        qstring += "maptype=" + mapType

        return qstring
    }
}
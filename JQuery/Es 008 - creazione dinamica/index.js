'use strict'

let ul = []

$(document).ready(function() {
    let wrapper = $("#wrapper")

    ul.push(wrapper.children("ul").eq(0))
    ul.push(wrapper.children("ul").eq(1))

});

function aggiungi(index) {
    index--
    // let li = $("<li> menu 1 voce 4 </li>")
    let li = $("<li>")
    let n = ul[index].children("li").length + 1
    li.html("menù " + (index + 1) + "voce <b>" + n + "</b>")
    ul[index].append(li); //oppure
    // li.appendTo(ul[index])
}

function sposta(index) {
    index--;
    let li = ul[index].children("li").last();
    if (index == 0)
        li.appendTo(ul[1])
    else if (index == 1)
        li.appendTo(ul[0])
}

function aggiungiPrima(index) {
    index--;
    let li = $("<li>")
    li.text("Voce iniziale");
    // ul[index].children("li").first().before(li)
    li.insertBefore(ul[index].children("li").first())
}

function aggiungiDopo(index) {
    index--;
    let li = $("<li>")
    li.text("Voce dopo il primo elemento");
    // ul[index].children("li").first().after(li)
    li.insertAfter(ul[index].children("li").first())
}

function replica(index) {
    index--;
    let li = $("<li>")
    li.text("aaaaaaaaaaaaaa");
    // ul[index].children("li").before(li)
    li.insertBefore(ul[index].children("li"))
}

function CreazioneConCostruttore() {
    $("<div>", {
        "css": {
            "background-color": "#ddd",
            "width": "190px",
            "height": "20px"
        },
        "text": "hello world",
        "appendTo": wrapper,
        "append": [
            $("<lable>", { "text": "hobbies :" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "sport" }),
            $("<input>", { "type": "radio", "name": "hobbies" }),
            $("<span>", { "text": "musica" })
        ]
    })
}
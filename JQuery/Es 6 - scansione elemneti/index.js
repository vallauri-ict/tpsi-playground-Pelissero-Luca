"use strict";

let _wrapper;

$(document).ready(function() {
    _wrapper = $("#wrapper")
});

function evidenzia(selector) {
    _wrapper.children().css({ "backgroundColor": "" })
    _wrapper.children(selector).css({ "backgroundColor": "#FF0" })
}
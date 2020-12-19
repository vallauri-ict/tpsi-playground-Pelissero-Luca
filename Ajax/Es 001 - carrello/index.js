"use strict";

$(document).ready(function() {
    let wrapper = $('#elencoArticoli');
    let details = $(".details")
    let btnApri = $("#btnCarrello");
    let carrello = $("#carrello");

    details.hide();

    caricaImmagini();

    btnApri.prop("name", "chiuso");
    btnApri.on("click", apriCarrello);

    // ------------------------ funzioni

    function caricaImmagini() {

        for (let i = 0; i < articoli.length; i++) {
            let div1 = $("<div>");
            div1.prop("id", `article-${i+1}`);
            div1.addClass("article");
            div1.appendTo(wrapper);

            let img = $("<img>");
            img.prop("src", "img/" + articoli[i].src + ".jpg");
            img.prop("title", "Aggiungi al carrello");
            img.addClass("image");
            img.appendTo(div1);

            let div2 = $("<div>");
            div2.addClass("name");
            div2.appendTo(div1);

            img.hover(
                function() { div2.text(articoli[i].nome) },

                function() { div2.text(articoli[i].nome).hide() }
            );
        }

        wrapper.on("click", "div", function() {
            details.slideDown(1000);
            details.empty();

            gestisciDettagli($(this));
        })
    }

    function gestisciDettagli(div) {
        details.empty();

        let div1 = $("<div>");
        div1.addClass("detail-close");
        div1.appendTo(details);

        let span = $("<span>");
        span.text("X");
        span.appendTo(div1);

        let div2 = $("<div>");
        div2.addClass("detail-img");
        div2.appendTo(details);

        let img = $("<img>");
        img.prop("src", div.children("img").prop("src"));
        img.appendTo(div2);

        let div3 = $("<div>");
        div3.addClass("detail-info");
        div3.appendTo(details);

        let h4 = $("<h4>");
        h4.addClass("item-title");
        h4.text(div.children("div").text());
        h4.prop("cont", 0);
        h4.appendTo(div3);

        let aus = div.prop("id").split("-");

        let p1 = $("<p>");
        p1.text(articoli[aus[1]].descrizione);
        p1.appendTo(div3);

        let p2 = $("<p>");
        p2.text("$ " + articoli[aus[1]].prezzo);
        p2.appendTo(div3);

        let btn = $("<button>");
        btn.addClass("item-add");
        btn.text("Aggiungi al carrello");
        btn.on("click", aggiungi);
        btn.appendTo(div3);

        details.on("click", "span", function() {
            details.slideUp(1000);
        })
    }

    function apriCarrello() {

        if (btnApri.prop("name") == "chiuso") {
            carrello.slideDown(1000);
            btnApri.html("&#708 chiudi carrello");
            btnApri.prop("name", "aperto");
        } else if (btnApri.prop("name") == "aperto") {
            carrello.slideUp(1000);
            btnApri.html("&#709 apri carrello");
            btnApri.prop("name", "chiuso");
        }

    }

    function aggiungi() {

        let i = 0;
        let nomiArt = [];
        let cont = 0;

        for (let i = 0; i < nomiArt.length; i++) {
            if (nomiArt[i] == details.find("h4").text())
                cont++;
        }

        if (cont == 0) {
            nomiArt[i] = details.find("h4").text();
            i++;
            details.find("h4").prop("cont", +1);

            let tr = $("<tr>");
            tr.appendTo(carrello.children("table"));

            let tdNome = $("<td>");
            let tdPrezzo = $("<td>");
            let tdQuantità = $("<td>");
            let tdCestino = $("<td>");

            // nome
            tdNome.text(details.find("h4").text());
            tdNome.appendTo(tr);

            // prezzo
            let aus = details.find("p").eq(1).text().split(" ");
            tdPrezzo.text(aus[1]);
            tdPrezzo.appendTo(tr);

            // Qunatità
            tdQuantità.text(details.find("h4").prop("cont"));
            tdQuantità.appendTo(tr);

            // cestino
            let img = $("<img>");
            img.prop("src", "img/_cestino.png");
            img.appendTo(tdCestino);
            tdCestino.appendTo(tr);

        } else {
            details.find("h4").prop("cont", +1);
        }
    }

});
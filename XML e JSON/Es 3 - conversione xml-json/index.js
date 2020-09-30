"use strict"

window.onload = function () {
    let _button = document.getElementById("btnConverti");
    _button.addEventListener("click", converti);  //converti è un puntatore a funzione

    function converti() {
        let xml = localStorage.getItem("bookstore_xml");
        let parser = new DOMParser;
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        let root = xmlDoc.documentElement;  //dopo la parsificazione accedo alla radice per scorrere tutti i nodi

        //dichiarazione di un vettore enumerativo in cui salveremo i vari libri in formato JSON
        let jsonVet = [];

        //scansione dell'albero XML
        //rot.children è un vettore enumerativo che contiene tutti i book figli di root
        for (let i = 0; i < root.children.length; i++) {
            let books = root.children[i];

            //informazioni da leggere nel bookStore
            let category = "";
            let title = "";
            let authors = [];
            let lang = "";
            let year = "";
            let price = "";

            //facio un ciclo interno che mi scorre tutti i campi dei vari libri
            for (let j = 0; j < books.children.length; j++) {
                let campo = books.children[j];
                switch (campo.nodeName) {
                    case "title":
                        title = campo.textContent;
                        //per gli attributi
                        if (books.hasAttribute("lang"))
                            lang = campo.getAttribute("lang");
                        break;
                    case "author":
                        //metodo + semplice per inserire un dato in coda nel vettore enumerativo (.push)
                        authors.push(campo.textContent);
                        break;
                    case "year":
                        year = campo.textContent;
                        break;
                    case "price":
                        price = campo.textContent;
                        break;
                }
                //per gli attributi
                if (books.hasAttribute("category"))
                    category = books.getAttribute("category");
            }
            console.log("BOOK");
            console.log(title);
            console.log(category);
            console.log(authors);
            console.log(lang);
            console.log(year);
            console.log(price);

            //dichiarazione di un vettore associativo o JSON
            let jsonBook = {};

            //abbiamo caricato la struttura da mettere nel vettore jsonVet
            jsonBook.title = title;
            jsonBook.category = category;
            jsonBook.authors = authors;
            jsonBook.authors = authors;
            jsonBook["year"] = year;  //è la stessa cosa, cambia solo sintassi
            jsonBook["price"] = price;

            //carico il vettore
            jsonVet.push(jsonBook);
        }
        //serializzo il vettore (da onbject a string) e lo metto nell'alert
        //alert(JSON.stringify(jsonVet));
        alert("Dati convertiti e salvati correttamente");
        localStorage.setItem("bookstore_json", JSON.stringify(jsonVet));
    }
}
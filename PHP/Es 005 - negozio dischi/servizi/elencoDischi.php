<?php
    // ATTENZIONE: prima dell'aperto script
    // e dopo il chiuso script non bisogna
    // mettere nulla in quanto verrebbe ritornato
    // dal server al client e causerebbe degli errori
    
    // il JSON da fornire come risposta deve essere
    // serializzato (inviato come stringa) e le chiavi
    // devono essere scritte con le virgolette doppie

    // modalità WEBFORM, in corrispondenza di ogni richiesta
    // sul server il server ritorna una pagina già elaborata
    // con i dati e le varie cose che chiediamo tramite le echo

    // in questo caso facciamo solamente servizi. Questi servizi
    // possono essere forniti solo se la pagina è stata
    // mandata dallo stesso server che di fatto deve fornire
    // i servizi che vogliamo

    // l'approccio ajax prende solo i dati senza che il
    // server costruisca e ritorni pagine
    
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    // step 1: lettura parametri
    // non ce ne sono

    // step 2: apertura connessione
    $con = _connection();

    // step 3: esecuzione query
    // per prendere tutti i record omettere WHERE
    // qualunque istruzione di selezione inizia con SELECT
    $sql = "SELECT * FROM `dischi`";
    $rs = _execute($con, $sql);

    // step 4: invio dei dati al client
    if($rs)
    {
        echo(json_encode($rs));
    }
    else
    {
        // step 5: chiusura della connessione
        $con -> close();
        http_response_code(500);
        die("Errore esecuzione query");
    }

    $con->close();
?>
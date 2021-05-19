<?php
    // prima del <?php e del chiuso script php
    // non ci deve essere nulla, neanche un carattere di tipo spazio
    // eventuali caratteri scritti al di fuori dello script verrebbero inviati e potrebbero causare problemi
    //echo('{"ris":"ok"}');

    header('Content-type: text/html; charset=utf-8');
    require("php-mysqli.php");
    // step 1:
    // no parametri
    // step 2 connessione:
    $con = _openConnection("4b_dischi");
    // step 3 esecuzione query:
    $sql = "SELECT * FROM `dischi`";
    $rs = _eseguiQuery($con,$sql);
    // step 4 invio dei dati al client:
    echo(json_encode($rs));

    //step 5 chiusura connessione:
    $con->close();

?>
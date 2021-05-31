<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    if (isset($_POST["nVolumi"]) && is_numeric($_POST["nVolumi"])) {
        $nVolumi = $_POST["nVolumi"];
    }
    else{
        http_response_code(400);
        die("Parametri mancanti: nVolumi");
    }
    if (isset($_POST["idTit"])) {
        $idTit = $_POST["idTit"];
    }
    else{
        http_response_code(400);
        die("Parametri mancanti: idTit");
    }

    $con=_openConnection();
    $sql = "UPDATE titoli SET volumi=volumi+$nVolumi WHERE id=$idTit";
    $ris=_execute($con, $sql);

    if (!$ris) {
        $con->close();
        http_response_code(500);
        die("Errore query");
    }
    else{
        echo('{"ris": "ok"}');
    }

    $con->close();
?>
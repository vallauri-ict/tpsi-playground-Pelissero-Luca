<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    if (isset($_POST["ricerca"])) {
        $ricerca = $_POST["ricerca"];
    }
    else{
        http_response_code(400);
        die("Parametri mancanti: ricerca");
    }

    $con=_openConnection();
    if ($ricerca == "") {
        $sql = "SELECT * FROM titoli";
    }
    else{
        $sql = "SELECT * FROM titoli WHERE titolo LIKE '$ricerca%'";
    }
    $ris=_execute($con, $sql);

    if (!$ris) {
        $con->close();
        http_response_code(500);
        die("Errore query");
    }
    else{
        echo(json_encode($ris));
    }

    $con->close();
?>
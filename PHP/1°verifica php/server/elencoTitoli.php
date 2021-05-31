<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    $con=_openConnection();
    $sql = "SELECT * FROM titoli";
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
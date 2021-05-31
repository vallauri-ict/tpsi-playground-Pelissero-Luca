<?php
    header('Content-type: application/json; charset=utf-8');
    require("php-mysqli.php");

    if (isset($_POST["cDettagli"])) {
        $cDettagli = $_POST["cDettagli"];
    }
    else{
        http_response_code(400);
        die("Parametri mancanti: cDettagli");
    }

    $con=_openConnection();
    $sql = "SELECT * FROM dettagli WHERE id=$cDettagli";
    $ris=_execute($con, $sql);

    if (!$ris) {
        $con->close();
        http_response_code(500);
        die("Errore query");
    }
    else{
        echo(json_encode($ris[0]));
    }

    $con->close();
?>
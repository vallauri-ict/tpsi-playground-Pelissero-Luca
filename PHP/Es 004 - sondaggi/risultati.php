<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<script> src="https://code.jqeury.com/jquery-3.6.0.js"
	integrity="sha256-H+K7U5CnX"
	crossorigin="anonymus"</script>
	<link rel="stylesheet" href="index.css"/>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
	<script type="application/javascript" src="risultati.js"> </script>
</head>

	<body style="text-align: center;">
		<?php
            require("php-mysqli.php");
            // step 1: lettura e controllo parametri
            if(isset($_REQUEST["optRisposta"]))
                $ris = $_REQUEST["optRisposta"];
            else die("Parametro mancante: optRisposta");

            if(isset($_REQUEST["id"]))
                $id = $_REQUEST["id"];
            else die("Parametro mancante: id");

			// step 2: connessione
            $con = _openConnection("4b_sondaggi");
            
			// step 3: esecuzione query
            $sql = "UPDATE sondaggi SET $ris = $ris+1 WHERE id=$id";
            $rs = _eseguiQuery($con, $sql);

            // step 4: costruzione pagina
            if ($rs) {
                echo("<h2 style='margin:15px;'> Grazie per aver votato </h2>");
            }
            else die("errore nell'esecuzione della query");

            // lancio una seconda query per visualizzare i dati
            $sql2 = "SELECT * FROM sondaggi WHERE id=$id";
            $rs = _eseguiQuery($con, $sql2);
            $nSi = $rs[0]["nSi"];
            $nNo = $rs[0]["nNo"];
            $nNs = $rs[0]["nNs"];
            $totale = $nSi + $nNo + $nNs;
            echo("<h3>Risposte:</h3>");
            echo("<p>SI: $nSi </br> NO: $nNo </br> Non so: $nNs </br></p>");
            echo("<canvas id='idCanvas' width='400' height='400'> </canvas>");     
            echo("<script>creaDiagramma($nSi, $nNo, $nNs);</script>"); 

            // salvataggio cookies sul client
            setcookie("sondaggio-$id", "true", time()+60, "/");
		?>

		<?php
			// step 5: chiusura connessione
			$con->close();
		?>
	</body>
</html>
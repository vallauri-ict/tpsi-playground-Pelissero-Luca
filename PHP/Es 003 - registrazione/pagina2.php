<!DOCTYPE html>
<html lang="it">
 <head>
 	<meta charset="UTF-8"/>
 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> PHP </title>
	<link rel="stylesheet" href="index.css">
</head>

	<body>
		<h1>Dati arrivati!</h1>

		<?php
			// includo la libreria alla pagina
			require("php-mysqli.php");

			// step 1: lettura e controllo parametri	
			if(isset($_REQUEST["txtNome"]))
				$nome = $_REQUEST["txtNome"];
			else
				die("Nome mancante");
			
			if(isset($_REQUEST["optIndirizzo"]))
				$indirizzo = $_REQUEST["optIndirizzo"];
			else
				die("Indirizzo mancante");
			
			if(isset($_REQUEST["chkHobbies"]))
			{
				$hobbies = $_REQUEST["chkHobbies"];
				$hobbies = implode(',',$hobbies);
			}
			else
				$hobbies = "";
			
			if(isset($_REQUEST["lstCitta"]))
				$citta = $_REQUEST["lstCitta"];
			else
				die("Città mancante");

			if(isset($_REQUEST["txtSegni"]))
				$segni = $_REQUEST["txtSegni"];
			else
				$segni = "";

			if(isset($_REQUEST["lstScoperta"]))
			{
				$scoperta = $_REQUEST["lstScoperta"];
				$scoperta = implode(',',$scoperta);
			}	
			else
				$scoperta = "";

			// step 2: connessione al database
			$con = _connection("4b_studenti");
			$nome = $con->real_escape_string($nome); // protegge le variabili da ogni attacco (sql injection)
			$indirizzo = $con->real_escape_string($indirizzo);
			$hobbies = $con->real_escape_string($hobbies);
			$citta = $con->real_escape_string($citta);
			$segni = $con->real_escape_string($segni);
			$scoperta = $con->real_escape_string($scoperta);

			// step 3: esecuzione della query
			$sql = "";
			$sql = "INSERT INTO studenti(nome, settore, hobbies, residenza, segni, media) VALUES ('$nome','$indirizzo','$hobbies',$citta,'$segni','$scoperta')";
			$ris = _eseguiQuery($con,$sql);
			echo($ris);

			// step 4: visualizzazione dei dati
			if($ris)
			{
				echo("<h1> Dati arrivati correttamente </h1>");
				echo("<p> Elenco dei dati inseriti: </p>");
				echo("<p>$nome;</p>");
				echo("<p>$indirizzo;</p>");
				echo("<p>$hobbies;</p>");
				echo("<p>$citta;</p>");
				echo("<p>$segni;</p>");
				echo("<p>$scoperta;</p>");
			}
			else
			{
				echo("Dati sbagliati");
			}
		?>
	</body>
</html>
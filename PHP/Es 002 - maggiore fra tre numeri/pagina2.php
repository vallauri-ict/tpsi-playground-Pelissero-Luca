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
	<script type="application/javascript" src="index.js"> </script>
</head>

	<body>
		<h1>Grazie della tua richiesta!</h1>
		<?php
			$n1 = 0;
			$n2 = 0;
			$n3 = 0;
			// CONTROLLO DEI PARAMETRI
			if(isset($_REQUEST["txt1"])&& is_numeric($_REQUEST["txt1"]))
				$n1 = $_REQUEST["txt1"];
			else
				die("Primo numero non valido");

			if(isset($_REQUEST["txt2"])&& is_numeric($_REQUEST["txt2"]))
				$n2 = $_REQUEST["txt2"];
			else
				die("Secondo numero non valido");
			
			if(isset($_REQUEST["txt3"])&& is_numeric($_REQUEST["txt3"]))
				$n3 = $_REQUEST["txt3"];
			else
				die("Terzo numero non valido");

			// CONTROLLO MAGGIORE
			if($n1 > $n2 && $n1 > $n3)
			{
				echo("Il numero maggiore è il primo e vale $n1");
			}
			else if($n2 > $n3)
			{
				echo("Il numero maggiore è il secondo e vale $n2");
			}
			else
			{
				echo("Il numero maggiore è il terzo e vale $n3 </br>");
			}
			echo("Tipo di richiesta:<b> $_SERVER[REQUEST_METHOD]</b> </br>");
			$url = "http://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]";
			echo("URL richiedente: <b> $url </b>");
		?>
	</body>
</html>
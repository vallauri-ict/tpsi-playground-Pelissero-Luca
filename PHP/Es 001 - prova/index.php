<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PHP </title>
	<script> src="https://code.jqeury.com/jquery-3.6.0.js"
	integrity="sha256-H+K7U5CnXI1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
	crossorigin="anonymus"</script>
	<link rel="stylesheet" href="index.css"/>
	<script type="application/javascript" src="index.js"> </script>
</head>

	<body>
		<h1>Esercizio 1</h1>
		<?php
			$nome = "pippo";
			echo ("Il mio nome è $nome <br>");
			visualizza ($nome);
			function visualizza($nome) {
				echo ("<p style='font-weight:bold''>Il mio nome è $nome </p>");
			}
		?>

		<h1> Contenuto della variabile globale $_SERVER</h1>
		<?php
			foreach ($_SERVER as $key => $valore) 
				echo ("$key .  : . $valore . <br>\n");
		?>

		<h1> Info sulla configurazione di Xampp</h1>
		<?php
			echo (phpinfo());
		?>
	</body>
</html>
<?php
define('HOST', '127.0.0.1');
define('Utilizador', 'root');
define('SENHA', 'usbw');
define('DB', 'reservas');

	mysql_connect(HOST, Utilizador, SENHA) or die(mysql_error());
	
?>
<?php
define('HOST', '127.0.0.1');
define('Utilizador', 'root');
define('SENHA', 'usbw');
define('DB', 'reservas');

$conexao = mysql_connect(HOST, Utilizador, SENHA, DB) or die(mysql_error());
	
?>
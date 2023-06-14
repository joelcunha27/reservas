<?php
session_start();
include('verifica_login.php');
?>
 
<h2>Olá, <?php echo $_SESSION['username'];?></h2>
<h2><a href="logout.php">Sair</a></h2>
?>
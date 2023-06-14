<?php 
session_start();
include('conexão.php');
 
if(empty($_POST['username']) || empty($_POST['psw'])) {
	header('Location: index.php');
	exit();
}
 
$username = mysqli_real_escape_string($conexao, $_POST['username']);
$senha = mysqli_real_escape_string($conexao, $_POST['psw']);
 
$query = "SELECT username FROM users WHERE username = '{$username}' and senha = md5('{$psw}')";
 
$result = mysqli_query($conexao, $query);
 
$row = mysqli_num_rows($result);
 
if($row == 1) {
	$_SESSION['username'] = $username;
	header('Location: painel.php');
	exit();
} else {
	$_SESSION['nao_autenticado'] = true;
	header('Location: index.php');
	exit();
}
?>
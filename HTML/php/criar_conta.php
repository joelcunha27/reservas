<?php

$login = $_POST['username'];
$senha = MD5($_POST['psw']);
$connect = mysql_connect('reservas','root','usbw');
$db = mysql_select_db('reservas');
$query_select = "SELECT username FROM users WHERE username = '$login'";
$select = mysql_query($query_select,$connect);
$array = mysql_fetch_array($select);
$logarray = $array['username'];

  if($login == "" || $login == null){
    echo"<script language='javascript' type='text/javascript'>
    alert('O campo login deve ser preenchido');window.location.href='index.php';</script>";

    }else{
      if($logarray == $login){

        echo"<script language='javascript' type='text/javascript'>
        alert('Esse login já existe');window.location.href='index.php';</script>";
        die();

      }else{
        $query = "INSERT INTO users (username, psw) VALUES ('$login','md5($senha)')";
        $insert = mysql_query($query,$connect);

        if($insert){
          echo"<script language='javascript' type='text/javascript'>
          alert('Usuário cadastrado com sucesso!');window.location.
		  href='index.php'</script>";
        }else{
          echo"<script language='javascript' type='text/javascript'>
          alert('Não foi possível cadastrar esse usuário');window.location
          .href='index.php'</script>";
        }
      }
    }
?>
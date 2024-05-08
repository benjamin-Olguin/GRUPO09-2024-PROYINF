<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "la_diversion";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Chequear conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
<?php
include 'bd.php';  // Asegúrate de que este archivo tiene el código correcto para conectarse a la base de datos

// Recoger datos del formulario
$rut = $conn->real_escape_string($_POST['rut']);
$numero_habitacion = $conn->real_escape_string($_POST['numero_habitacion']);
$tipo_habitacion = $conn->real_escape_string($_POST['tipo_habitacion']);
$fecha_checkin = $conn->real_escape_string($_POST['fecha_checkin']);
$fecha_checkout = $conn->real_escape_string($_POST['fecha_checkout']);
$precio_por_noche = $conn->real_escape_string($_POST['precio_por_noche']);

// Insertar datos en la base de datos
$sql = "INSERT INTO reservas (Rut, Numero_habitacion, Tipo_habitacion, Fecha_Checkin, Fecha_CheckOut, Precio_por_noche) VALUES ('$rut', '$numero_habitacion', '$tipo_habitacion', '$fecha_checkin', '$fecha_checkout', '$precio_por_noche')";

if ($conn->query($sql) === TRUE) {
    echo "Reserva creada correctamente.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

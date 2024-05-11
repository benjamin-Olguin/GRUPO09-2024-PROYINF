<?php
include 'bd.php';

$sql = "SELECT * FROM reservas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["Id_reserva"]. " - RUT: " . $row["Rut"]. " - Número Habitación: " . $row["Numero_habitacion"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();

 
<?php
session_start();
require 'bd.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Id_Reserva'])) {
    $Id_reserva = $_POST['Id_Reserva'];

    $query_habitacion = "SELECT Numero_habitacion FROM reservas WHERE Id_Reserva = ?";
    $stmt_habitacion = $conn->prepare($query_habitacion);
    $stmt_habitacion->bind_param("i", $Id_reserva);
    $stmt_habitacion->execute();
    $result = $stmt_habitacion->get_result();
    if ($row = $result->fetch_assoc()) {
        $Numero_habitacion = $row['Numero_habitacion'];

        $sql = "DELETE FROM reservas WHERE Id_Reserva = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $Id_reserva);
        if ($stmt->execute()) {
            // Actualizar el estado de la habitación
            $sql_update = "UPDATE habitaciones SET Estado = 0 WHERE Numero_habitacion = ?";
            $stmt_update = $conn->prepare($sql_update);
            $stmt_update->bind_param("i", $Numero_habitacion);
            if ($stmt_update->execute()) {
                $_SESSION['message'] = "";
            } else {
                $_SESSION['message'] = "Error al actualizar el estado de la habitación.";
            }
        } else {
            $_SESSION['message'] = "Error al eliminar la reserva.";
        }
        header("Location: index.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <title>Borrar Reserva</title>
    <link rel="stylesheet" href="Css/styles_Tours.css"> <!-- Asegúrate de que la ruta al archivo CSS es correcta -->

</head>
<body>
    <h1>Borrar Reserva</h1>
    <?php
    if (isset($_SESSION['message'])) {
        echo "<p>" . $_SESSION['message'] . "</p>";
        unset($_SESSION['message']);
    }
    $sql = "SELECT * FROM reservas";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<div>";
            echo "Reserva ID: " . $row['Id_Reserva'] . " - Rut: " . $row['Rut'] .
                 " - Número de Habitación: " . $row['Numero_habitacion'] .
                 " - Fecha Check-In: " . $row['Fecha_Checkin'] .
                 " - Fecha Check-Out: " . $row['Fecha_CheckOut'];
            echo "<form method='post' action=''>";
            echo "<input type='hidden' name='Id_Reserva' value='" . $row['Id_Reserva'] . "'>";
            echo "<button type='submit'>Borrar</button>";
            echo "</form>";
            echo "</div>";
        }
    } else {
        echo "<p>No hay reservas para mostrar.</p>";
    }
    ?>

    <form action="index.php" method="get">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

<?php
require 'bd.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Rut'], $_POST['Fecha_Checkin'], $_POST['Fecha_CheckOut'], $_POST['Numero_habitacion'])) {
    $Rut = $_POST['Rut'];
    $Numero_habitacion = $_POST['Numero_habitacion'];
    $Fecha_Checkin = $_POST['Fecha_Checkin'];
    $Fecha_CheckOut = $_POST['Fecha_CheckOut'];

    // Iniciar transacción para garantizar la integridad de la data
    $conn->begin_transaction();

    try {
        // Obtener el precio de la habitación desde la tabla habitaciones
        $sql_precio = "SELECT Precio FROM habitaciones WHERE Numero_habitacion = ?";
        $stmt_precio = $conn->prepare($sql_precio);
        $stmt_precio->bind_param("i", $Numero_habitacion);
        $stmt_precio->execute();
        $resultado_precio = $stmt_precio->get_result();
        if ($fila_precio = $resultado_precio->fetch_assoc()) {
            $Precio = $fila_precio['Precio'];
        } else {
            throw new Exception("No se encontró la habitación o está inactiva.");
        }

        // Insertar la reserva en la base de datos
        $sql_reserva = "INSERT INTO reservas (Rut, Numero_habitacion, Fecha_Checkin, Fecha_CheckOut) VALUES (?, ?, ?, ?)";
        $stmt_reserva = $conn->prepare($sql_reserva);
        $stmt_reserva->bind_param("iiss", $Rut, $Numero_habitacion, $Fecha_Checkin, $Fecha_CheckOut);
        $stmt_reserva->execute();

        // Actualizar el estado de la habitación a ocupado (1)
        $sql_update_hab = "UPDATE habitaciones SET Estado = 1 WHERE Numero_habitacion = ?";
        $stmt_update_hab = $conn->prepare($sql_update_hab);
        $stmt_update_hab->bind_param("i", $Numero_habitacion);
        $stmt_update_hab->execute();

        // Confirmar la transacción
        $conn->commit();

        echo "Reserva realizada con éxito.";
        header("Location: index.php");
        exit();
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $conn->rollback();
        echo "Error al realizar la reserva: " . $e->getMessage();
    }
} else {
    echo "";
}
?>



<!DOCTYPE html>
<html>
<head>
    <title>Formulario de Reserva</title>
</head>
<body>
    <h1>Formulario de Reserva</h1>
    <form action="RealizarReserva.php" method="post">
        <input type="hidden" name="Numero_habitacion" value="<?php echo isset($_POST['Numero_habitacion']) ? htmlspecialchars($_POST['Numero_habitacion']) : ''; ?>">
        <div>
            <label for="Rut">Rut:</label>
            <input type="text" id="Rut" name="Rut" pattern="\d{8}" title="Ingrese los primeros 8 dígitos del RUT sin dígito verificador" required>
        </div>
        <div>
            <label for="Fecha_Checkin">Fecha Check-In:</label>
            <input type="date" id="Fecha_Checkin" name="Fecha_Checkin" required>
        </div>
        <div>
            <label for="Fecha_CheckOut">Fecha Check-Out:</label>
            <input type="date" id="Fecha_CheckOut" name="Fecha_CheckOut" required>
        </div>
        <button type="submit">Realizar Reserva</button>
    </form>
    <form action="index.php" method="get">
            <button type="submit">Volver</button>
    </form>
</body>
</html>

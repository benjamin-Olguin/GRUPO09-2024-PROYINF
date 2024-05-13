<?php
require 'bd.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Rut = $_POST['Rut'];
    $Numero_habitacion = $_POST['Numero_habitacion'];
    $Calificacion = $_POST['Calificacion'] ?? 0; // Asumir calificación si no se envía

    if (isset($_POST['calcular'])) {
        // Llamar al procedimiento almacenado para calcular el total a pagar
        $stmt = $conn->prepare("CALL CheckoutCliente(?, ?, ?, @TotalAPagar)");
        $stmt->bind_param("sii", $Rut, $Numero_habitacion, $Calificacion);
        $stmt->execute();
        $stmt->close();

        // Obtener el total a pagar
        $result = $conn->query("SELECT @TotalAPagar AS TotalAPagar");
        $row = $result->fetch_assoc();
        $Total_A_Pagar = $row['TotalAPagar'];

        echo "Total a pagar calculado: $" . $Total_A_Pagar;
    } elseif (isset($_POST['pagar'])) {
        // Confirmar el pago y finalizar el proceso de checkout
        $conn->begin_transaction();
        try {
            // Obtener Id_Reserva para asegurar que no es NULL
            $stmt_reserva = $conn->prepare("SELECT Id_Reserva FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
            $stmt_reserva->bind_param("si", $Rut, $Numero_habitacion);
            $stmt_reserva->execute();
            $stmt_reserva->bind_result($Id_Reserva);
            if (!$stmt_reserva->fetch()) {
                throw new Exception("No se pudo encontrar la reserva correspondiente.");
            }
            $stmt_reserva->close();

            // Sumar el precio de las reservas de tours anteriores a la fecha actual
            $stmt_tours = $conn->prepare("SELECT SUM(t.Precio) FROM reservas_tours rt JOIN tours t ON rt.Id_Tour = t.Id_Tour JOIN reservas r ON rt.Id_Reserva = r.Id_Reserva WHERE t.Fecha <= NOW() AND rt.Id_Reserva = ?");
            $stmt_tours->bind_param("i" , $Id_Reserva);
            $stmt_tours->execute();
            $stmt_tours->bind_result($Total_Tours);
            $stmt_tours->fetch();
            $stmt_tours->close();

            // Trasladar reserva al historial
            $stmt_hist = $conn->prepare("INSERT INTO historial ( Rut, Numero_habitacion, Fecha_Checkout, Calificacion, Total_Tours) SELECT Rut, Numero_habitacion, NOW(), ?, ? FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
            $stmt_hist->bind_param("iisi", $Calificacion, $Total_Tours, $Rut, $Numero_habitacion);
            $stmt_hist->execute();
            $stmt_hist->close();


            // Borrar reserva
            $stmt_del = $conn->prepare("DELETE FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
            $stmt_del->bind_param("si", $Rut, $Numero_habitacion);
            $stmt_del->execute();
            $stmt_del->close();

            // Actualizar estado de la habitación a desocupado
            $stmt_update = $conn->prepare("UPDATE habitaciones SET Estado = 0 WHERE Numero_habitacion = ?");
            $stmt_update->bind_param("i", $Numero_habitacion);
            $stmt_update->execute();
            $stmt_update->close();

            

            $conn->commit();
            echo "Pago realizado con éxito. Gracias por su estancia.";
        } catch (Exception $e) {
            $conn->rollback();
            echo "Error durante el proceso de checkout: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <title>Checkout de Cliente</title>
</head>
<body>
    <h1>Checkout de Cliente</h1>
    <form action="" method="post">
        <label for="Rut">Rut del Cliente:</label>
        <input type="text" id="Rut" name="Rut" required value="<?php echo $Rut ?? ''; ?>">
        <label for="Numero_habitacion">Número de Habitación:</label>
        <input type="text" id="Numero_habitacion" name="Numero_habitacion" required value="<?php echo $Numero_habitacion ?? ''; ?>">
        <label for="Calificacion">Calificación:</label>
        <input type="number" id="Calificacion" name="Calificacion" min="1" max="5" value="<?php echo $Calificacion ?? ''; ?>">
        <button type="submit" name="calcular">Calcular Costo</button>
        <button type="submit" name="pagar">Pagar</button>
    </form>
    <form action="index.php" method="get">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

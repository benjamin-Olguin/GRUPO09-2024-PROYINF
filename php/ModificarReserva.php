<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'bd.php';

$error_message = "";
$success_message_modificar_reserva = "";

if (!empty($_POST['submit'])) {
    $submit_action = $_POST['submit'];

    if ($submit_action == 'Modificar Reserva') {
        $Rut = trim($_POST["Rut"]);
        $Numero_habitacion = trim($_POST["Numero_habitacion"]);
        $Numero_habitacion_nueva = trim($_POST["Numero_habitacion_nueva"]);
        $Fecha_Checkin_nueva = trim($_POST["Fecha_Checkin"]);
        $Fecha_CheckOut_nueva = trim($_POST["Fecha_CheckOut"]);

        if (empty($Rut) || empty($Numero_habitacion) || empty($Numero_habitacion_nueva) || empty($Fecha_Checkin_nueva) || empty($Fecha_CheckOut_nueva)) {
            $error_message = "Por favor, complete todos los campos.";
        } else {
        // Comprobar si el RUT y el número de habitación original existen
            $idReservaExistente = obtenerIdReserva($Rut, $Numero_habitacion);
            if (!$idReservaExistente) {
                $error_message = "No existe una reserva con el RUT y número de habitación proporcionados.";
            } else {
                // Verificar estados de las habitaciones
                $habitacion_estado_actual = verificarEstadoHabitacion($Numero_habitacion);
                $habitacion_estado_nueva = verificarEstadoHabitacion($Numero_habitacion_nueva);

                if ($habitacion_estado_actual != 1) {
                    $error_message = "La habitación actual no está reservada.";
                } else if ($habitacion_estado_nueva == 1 && $Numero_habitacion_nueva != $Numero_habitacion) {
                    $error_message = "La nueva habitación ya está reservada.";
                } else {
                    // Actualizar la reserva con los nuevos datos
                    if (actualizarReserva($Rut, $Numero_habitacion, $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva)) {
                        // Actualizar estado de las habitaciones si es necesario
                        if ($Numero_habitacion != $Numero_habitacion_nueva) {
                            actualizarEstadoHabitacion($Numero_habitacion, 0);
                            actualizarEstadoHabitacion($Numero_habitacion_nueva, 1);
                        }
                        $success_message_modificar_reserva = "Reserva modificada con éxito.";
                    } else {
                        $error_message = "Error al modificar la reserva.";
                    }
                }
            }
    }
    }
}

function obtenerIdReserva($Rut, $Numero_habitacion) {
    global $conn;
    $stmt = $conn->prepare("SELECT Id_Reserva FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
    $stmt->bind_param("si", $Rut, $Numero_habitacion);
    $stmt->execute();
    $stmt->bind_result($Id_Reserva);
    if ($stmt->fetch()) {
        return $Id_Reserva;
    }
    $stmt->close();
    return false;
}

function verificarEstadoHabitacion($Numero_habitacion) {
    global $conn;
    $stmt = $conn->prepare("SELECT Estado FROM habitaciones WHERE Numero_habitacion = ?");
    $stmt->bind_param("i", $Numero_habitacion);
    $stmt->execute();
    $stmt->bind_result($Estado);
    $stmt->fetch();
    $stmt->close();
    return $Estado ?? null;
}

function actualizarEstadoHabitacion($Numero_habitacion, $estado) {
    global $conn;
    $stmt = $conn->prepare("UPDATE habitaciones SET Estado = ? WHERE Numero_habitacion = ?");
    $stmt->bind_param("ii", $estado, $Numero_habitacion);
    $stmt->execute();
    $stmt->close();
}

function actualizarReserva($Rut, $Numero_habitacion, $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva) {
    global $conn;
    $stmt = $conn->prepare("UPDATE reservas SET Numero_habitacion = ?, Fecha_Checkin = ?, Fecha_CheckOut = ? WHERE Numero_habitacion = ? AND Rut = ?");
    $stmt->bind_param("issii", $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva, $Numero_habitacion, $Rut);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Modificar reservas de Habitaciones</title>
    </head>
    <body>
        <h2>Modificar Reserva de Habitación</h2>
        <!-- Formulario para modificar la reserva de habitación -->
        <form action="" method="post">
            <div class="field">
                <label for="Rut">Rut</label>
                <input type="number" name="Rut" id="Rut" autocomplete="off">
            </div>
            <div class="field">
                <label for="Numero_habitacion">Habitación Reservada</label>
                <input type="number" name="Numero_habitacion" id="Numero_habitacion" autocomplete="off">
            </div>
            <div class="field">
                <label for="Numero_habitacion_nueva">Habitación Nueva</label>
                <input type="number" name="Numero_habitacion_nueva" id="Numero_habitacion_nueva" autocomplete="off">
            </div>
            <div class="field">
                <label for="Fecha_Checkin">Fecha Check-In Nueva</label>
                <input type="date" name="Fecha_Checkin" id="Fecha_Checkin" autocomplete="off">
            </div>
            <div class="field">
                <label for="Fecha_CheckOut">Fecha Check-Out Nueva</label>
                <input type="date" name="Fecha_CheckOut" id="Fecha_CheckOut" autocomplete="off">
            </div>
            <!-- Botón para modificar una reserva -->
            <input type="submit" name="submit" value="Modificar Reserva">
            <!-- Mostrar mensajes de error o éxito -->
            <?php if($error_message): ?>
                <p><?php echo $error_message; ?></p>
            <?php endif; ?>
            <?php if($success_message_modificar_reserva): ?>
                <p><?php echo $success_message_modificar_reserva; ?></p>
            <?php endif; ?>
        </form>
        <form action="index.php" method="post">
            <button type="submit">Volver</button>
        </form>
    </body>
</html>

<?php 
error_reporting(0);
require 'bd.php';
require 'security.php';

$error_message = "";
if(!empty($_POST['submit'])){
    $submit_action = $_POST['submit'];
    
    if($submit_action == 'Modificar Reserva'){

        $Rut                = trim($_POST["Rut"]);
        $Numero_habitacion  = trim($_POST["Numero_habitacion"]);
        $Numero_habitacion_nueva    = trim($_POST["Numero_habitacion_nueva"]);
        $Fecha_Checkin_nueva        = trim($_POST["Fecha_Checkin"]);
        $Fecha_CheckOut_nueva       = trim($_POST["Fecha_CheckOut"]);

        // Verificar si la habitación actual está reservada
        $habitacion_estado_actual = verificarEstadoHabitacion($Numero_habitacion);
        if($habitacion_estado_actual == 1 || $Numero_habitacion_nueva == $Numero_habitacion) {
            // Verificar si la habitación nueva está disponible
            $habitacion_estado_nueva = verificarEstadoHabitacion($Numero_habitacion_nueva);
            if($habitacion_estado_nueva == 0 || $Numero_habitacion_nueva == $Numero_habitacion) {
                // Actualizar la reserva con los nuevos datos
                if(actualizarReserva($Rut, $Numero_habitacion, $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva)) {
                    // Éxito al actualizar la reserva
                    actualizarEstadoHabitacion($Numero_habitacion, 0);
                    actualizarEstadoHabitacion($Numero_habitacion_nueva, 1);
                    $success_message_modificar_reserva = "Reserva modificada con éxito.";
                } else {
                    // Error al actualizar la reserva
                    $error_message_modificar_reserva = "Error al modificar la reserva.";
                }
            } else {
                // La habitación nueva ya está reservada
                $error_message_modificar_reserva = "La habitación nueva ya está reservada.";
            }
        } else {
            // La habitación actual no está reservada
            $error_message_modificar_reserva = "La habitación actual no está reservada.";
        }
    }

}

$error_message1 = "";
if(!empty($_GET['Numero_habitacion'])) {
    $numero_habitacion = intval($_GET['Numero_habitacion']);
    $stmt = $conn->prepare("SELECT * FROM Habitaciones WHERE Numero_habitacion = ?");
    $stmt->bind_param("i", $numero_habitacion);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificamos si se encontró alguna habitación
    if ($result->num_rows === 0) {
        $error_message1 = "La habitación $numero_habitacion no existe.";
    } else {
        $habitacion = $result->fetch_assoc();
    }


    $stmt->close();
}

// Función para verificar el estado de la habitación (0: disponible, 1: reservada)
function verificarEstadoHabitacion($Numero_habitacion) {
    global $conn;
    $stmt = $conn->prepare("SELECT Estado FROM habitaciones WHERE Numero_habitacion = ?");
    $stmt->bind_param("i", $Numero_habitacion);
    $stmt->execute();
    $result = $stmt->get_result();
    $habitacion_estado = $result->fetch_assoc()['Estado'];
    return $habitacion_estado;
}

// Función para actualizar el estado de la habitación
function actualizarEstadoHabitacion($Numero_habitacion, $estado) {
    global $conn;
    $update = $conn->prepare("UPDATE habitaciones SET Estado = ? WHERE Numero_habitacion = ?");
    $update->bind_param("ii", $estado, $Numero_habitacion);
    $update->execute();
}

// Función para actualizar una reserva existente
function actualizarReserva($Rut, $Numero_habitacion, $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva) {
    global $conn;
    $update = $conn->prepare("UPDATE reservas SET Rut = ?, Numero_habitacion = ?, Fecha_Checkin = ?, Fecha_CheckOut = ? WHERE Numero_habitacion = ? AND Rut = ?");
    $update->bind_param("iissii", $Rut, $Numero_habitacion_nueva, $Fecha_Checkin_nueva, $Fecha_CheckOut_nueva, $Numero_habitacion,  $Rut);
    if($update->execute()) {
        return true;
    } else {
        return false;
    }
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Modificar reservas de Habitaciones</title>
    </head>
    <body>
        <h2> Modificar Reserva de Habitación</h2>
        <!-- Formulario modificar reserva de habitacion -->
        <form action="" method="post">
            <div class="field">
                <label for="Rut">Rut</label>
                <input type="number" name="Rut", id="Rut", autocomplete="off">
            </div>
            <div class="field">
                <label for="Numero_habitacion">Habitación Reservada</label>
                <input type="number" name="Numero_habitacion", id="Numero_habitacion", autocomplete="off">
            </div>
            <div class="field">
                <label for="Numero_habitacion_nueva">Habitación Nueva</label>
                <input type="number" name="Numero_habitacion_nueva", id="Numero_habitacion_nueva", autocomplete="off">
            </div>
            <div class="field">
                <label for="Fecha_Checkin">Fecha Check-In Nueva</label>
                <input type="date" name="Fecha_Checkin", id="Fecha_Checkin", autocomplete="off">
            </div>
            <div class="field">
                <label for="Fecha_CheckOut">Fecha Check-Out Nueva</label>
                <input type="date" name="Fecha_CheckOut", id="Fecha_CheckOut", autocomplete="off">
            </div>
            <!-- Botón para modificar una reserva -->
            <input type="submit" name="submit" value="Modificar Reserva">
        <!-- Mostrar mensaje de errora -->
        <?php if($error_message_modificar_reserva !== ""): ?>
            <p><?php echo $error_message_modificar_reserva; ?></p>
        <?php endif; ?>
        <?php if($success_message_modificar_reserva !== ""): ?>
            <p><?php echo $success_message_modificar_reserva; ?></p>
        <?php endif; ?>
        </form>
        <form action="index.php" method="post">
            <button type="submit">Volver</button>
        </form>
        
        </body>
</html>
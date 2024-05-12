<?php
// Conexión a la base de datos
require 'bd.php';

// Obtener registros de tours
$records = array();
if ($results = $conn->query("SELECT Lugar, Fecha FROM tours")) {
    while ($row = $results->fetch_object()) {
        $records[] = $row;
    }
    $results->free();
}

// Procesar el formulario
if (!empty($_POST['submit'])) {
    $Rut                = trim($_POST["Rut"]);
    $Numero_habitacion  = trim($_POST["Numero_habitacion"]);
    $tourFecha = $_POST['tour']; // Corregido: el nombre del atributo name del select debe ser 'tour', no 'TourFecha'
    list($Lugar, $Fecha) = explode("|", $tourFecha);

    // Obtenemos el id_reserva y las fechas de CheckIn y CheckOut del cliente
    $stmt_reserva = $conn->prepare("SELECT Id_Reserva, Fecha_Checkin, Fecha_CheckOut FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
    $stmt_reserva->bind_param("ii", $Rut, $Numero_habitacion);
    $stmt_reserva->execute();
    $stmt_reserva->bind_result($Id_Reserva, $Fecha_Checkin, $Fecha_CheckOut);
    $stmt_reserva->fetch();
    $stmt_reserva->close();

    // Obtenemos el id_tour del Tour
    $stmt_tour = $conn->prepare("SELECT id_tour FROM tours WHERE Lugar = ? AND Fecha = ?");
    $stmt_tour->bind_param("ss", $Lugar, $Fecha);
    $stmt_tour->execute();
    $stmt_tour->bind_result($Id_Tour);
    $stmt_tour->fetch();
    $stmt_tour->close();

    // Verificar si ya existe una reserva igual
    $stmt_verificar = $conn->prepare("SELECT COUNT(*) FROM reservas_tours WHERE Id_Reserva = ? AND Id_Tour = ?");
    $stmt_verificar->bind_param("ii", $Id_Reserva, $Id_Tour);
    $stmt_verificar->execute();
    $stmt_verificar->bind_result($count);
    $stmt_verificar->fetch();
    $stmt_verificar->close();

    if (!$count) {
        $error_message = "No se encontró la reserva a cancelar.";
        echo "<div class='error'>$error_message</div>";
    } else {
        // Eliminar la reserva del tour
        $stmt_delete = $conn->prepare("DELETE FROM reservas_tours WHERE Id_Reserva = ? AND Id_Tour = ?");
        $stmt_delete->bind_param("ii", $Id_Reserva, $Id_Tour);
        if ($stmt_delete->execute()) {
            echo "<div class='success'>La reserva del tour se canceló correctamente.</div>";
        } else {
            echo "<div class='error'>Error al cancelar la reserva del tour.</div>";
        }
        $stmt_delete->close();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Cancelar Reserva de Tours</title>
    <style>
        /* Eliminar las flechas de los inputs de tipo número */
        input[type="number"]::-webkit-inner-spin-button, 
        input[type="number"]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    </style>
</head>
<body>
    <h2>Cancelar Reserva Tour</h2>
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
            <label for="tour">[Tour | Fecha] a Cancelar</label>
            <select name='tour'>
                <option value=''>Selecciona un tour</option>
                <?php foreach ($records as $r) { ?>
                    <option value='<?php echo $r->Lugar . "|" . $r->Fecha ?>'>
                        <?php echo $r->Lugar . "|" . $r->Fecha ?>
                    </option>
                <?php } ?>
            </select>
        </div>
        <input type="submit" name="submit" value="Cancelar Tour">
    </form>

    <hr>

    <!-- Formulario para volver -->
    <form action="Tours.php" method="post">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

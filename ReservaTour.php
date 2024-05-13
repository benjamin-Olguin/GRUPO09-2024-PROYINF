<?php
require 'bd.php';

$records = array();
if ($results = $conn->query("SELECT Lugar, Fecha FROM tours")) {
    while ($row = $results->fetch_object()) {
        $records[] = $row;
    }
    $results->free();
}

$error_message = "";
$success_message = "";

if (!empty($_POST['submit'])) {
    $Rut = trim($_POST["Rut"]);
    $Numero_habitacion = trim($_POST["Numero_habitacion"]);
    $tourFecha = $_POST['tour'];
    list($Lugar, $Fecha) = explode("|", $tourFecha);

    $stmt_reserva = $conn->prepare("SELECT Id_Reserva, Fecha_Checkin, Fecha_CheckOut FROM reservas WHERE Rut = ? AND Numero_habitacion = ?");
    $stmt_reserva->bind_param("ii", $Rut, $Numero_habitacion);
    $stmt_reserva->execute();
    $stmt_reserva->bind_result($Id_Reserva, $Fecha_Checkin, $Fecha_CheckOut);
    if (!$stmt_reserva->fetch()) {
        $error_message = "No se encontró una reserva con el Rut y la habitación proporcionados.";
        $stmt_reserva->close();
    } else {
        $stmt_reserva->close();

        $stmt_tour = $conn->prepare("SELECT id_tour FROM tours WHERE Lugar = ? AND Fecha = ?");
        $stmt_tour->bind_param("ss", $Lugar, $Fecha);
        $stmt_tour->execute();
        $stmt_tour->bind_result($Id_Tour);
        if (!$stmt_tour->fetch()) {
            $error_message = "No se encontró un tour con el lugar y la fecha proporcionados.";
            $stmt_tour->close();
        } else {
            $stmt_tour->close();

            $fecha_tour = new DateTime($Fecha);
            $fecha_checkin = new DateTime($Fecha_Checkin);
            $fecha_checkout = new DateTime($Fecha_CheckOut);

            if ($fecha_tour < $fecha_checkin || $fecha_tour > $fecha_checkout) {
                $error_message = "La fecha del tour no está dentro del rango de la estancia.";
            } else {
                $stmt_verificar = $conn->prepare("SELECT COUNT(*) FROM reservas_tours WHERE Id_Reserva = ? AND Id_Tour = ?");
                $stmt_verificar->bind_param("ii", $Id_Reserva, $Id_Tour);
                $stmt_verificar->execute();
                $stmt_verificar->bind_result($count);
                $stmt_verificar->fetch();
                $stmt_verificar->close();

                if ($count > 0) {
                    $error_message = "Ya existe una reserva para este tour.";
                } else {
                    $stmt_insert = $conn->prepare("INSERT INTO reservas_tours (Id_Reserva, Id_Tour) VALUES (?, ?)");
                    $stmt_insert->bind_param("ii", $Id_Reserva, $Id_Tour);
                    if ($stmt_insert->execute()) {
                        $success_message = "¡La reserva del tour se realizó con éxito!";
                    } else {
                        $error_message = "Error al realizar la reserva del tour.";
                    }
                    $stmt_insert->close();
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Reservar Tours</title>

</head>
<body>
<h2>Crear Reserva Tour</h2>
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
        <label for="tour">Tour | Fecha</label>
        <select name='tour'>
            <option value=''>Selecciona un tour</option>
            <?php foreach ($records as $r) { ?>
                <option value='<?php echo $r->Lugar . "|" . $r->Fecha ?>'><?php echo $r->Lugar . "|" . $r->Fecha ?></option>
            <?php } ?>
        </select>
    </div>
    <input type="submit" name="submit" value="Reservar Tour">
</form>
<?php
if ($error_message) {
    echo "<div class='error'>$error_message</div>";
}
if ($success_message) {
    echo "<div class='success'>$success_message</div>";
}
?>
<hr>
<form action="Tours.php" method="post">
    <button type="submit">Volver</button>
</form>
</body>
</html>

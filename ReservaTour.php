<?php
// Conexión a la base de datos
require 'bd.php';
$records = array();
if($results = $conn->query("SELECT Lugar, Fecha FROM tours")) {
    if($results->num_rows){
        while($row = $results->fetch_object()){
            $records[] = $row;
        }
        $results->free();
    }
}

$error_message = "";

if(!empty($_POST['submit'])){
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

    // Si ya existe una reserva igual, mostrar un mensaje de error
    if ($count > 0) {
        $error_message .= "Ya existe una reserva igual.<br>";
        echo "<div class='error'>$error_message</div>";
    }

    // Convertir las cadenas de fecha en objetos DateTime para comparación
    $fecha = new DateTime($Fecha);
    $fecha_checkin = new DateTime($Fecha_Checkin);
    $fecha_checkout = new DateTime($Fecha_CheckOut);

   

    // Verificar si la fecha seleccionada está dentro del rango de Fecha_Checkin y Fecha_CheckOut
    if (!($fecha >= $fecha_checkin && $fecha <= $fecha_checkout)) {
        echo "La fecha seleccionada no está dentro del rango<br>";
    }


    // Verificar si los valores existen en las tablas

    if (!$Id_Reserva) {
        $error_message .= "No se encontró una reserva con el Rut y la habitación proporcionados.<br>";
        echo "<div class='error'>$error_message</div>";
    }
    if (!$Id_Tour) {
        $error_message .= "No se encontró un tour con el lugar y la fecha proporcionados.<br>";
        echo "<div class='error'>$error_message</div>";
    }


    // Insertar si no hay errores
    if ($error_message == "") {
        $stmt_insert = $conn->prepare("INSERT INTO reservas_tours (Id_Reserva, Id_Tour) VALUES (?, ?)");
        $stmt_insert->bind_param("ii", $Id_Reserva, $Id_Tour);
        $stmt_insert->execute();
        $stmt_insert->close();

        echo "<div class='success'>¡La reserva del tour se realizó con éxito!</div>";
    }
}

?>

<!DOCTYPE html>

<html>
    <head>
        <title>Reservar Tours </title>
    </head>
    <body>
    <h2> Crear Reserva Tour </h2>
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
                <label for="tour">Tour | Fecha</label>
                <select name='tour'>
                    <option value=''>Selecciona un tour</option>
                    <?php if(!count($records)) {
                        echo 'No records';
                        } else { foreach($records as $r) { ?>
                        <option value='<?php echo $r->Lugar?>|<?php echo $r->Fecha ?>'><?php echo $r->Lugar?>|<?php echo $r->Fecha ?></option>
                        <?php } } ?>
                </select>
            </div>
            <input type="submit" name="submit" value="Reservar Tour">
        </form>

    <hr>
    <form action="Tours.php" method="post">
        <button type="submit">Volver</button>
    </form>
    </body>
</html>

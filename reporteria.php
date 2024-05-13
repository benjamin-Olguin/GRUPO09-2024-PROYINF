<?php
require 'bd.php';

// Obtener los registros de historial
$records = array();
if ($results = $conn->query('SELECT * FROM historial')) {
    if ($results->num_rows) {
        while ($row = $results->fetch_object()) {
            $records[] = $row;
        }
        $results->free();
    }
}
$records1 = array();
if ($results = $conn->query('SELECT * FROM habitaciones')) {
    if ($results->num_rows) {
        while ($row = $results->fetch_object()) {
            $records1[] = $row;
        }
        $results->free();
    }
}
function obternerProm($Numero_habitacion){
    global $conn;
    $stmt = $conn->prepare("SELECT calcular_promedio_calificaciones	(?)");
    $stmt->bind_param("i", $Numero_habitacion);
    if ($stmt->execute()) {
        $stmt->bind_result($promCal);
        $stmt->fetch();
    }
    $stmt->close();
    return $promCal;
}
function obternerSumTours($Numero_habitacion){
    global $conn;
    $stmt = $conn->prepare("SELECT calcular_total_tour	(?)");
    $stmt->bind_param("i", $Numero_habitacion);
    if ($stmt->execute()) {
        $stmt->bind_result($totalSum);
        $stmt->fetch();
    }
    $stmt->close();
    return $totalSum;
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Reporteria</title>
        <link rel="stylesheet" href="Css/styles_Tours.css"> <!-- Asegúrate de que la ruta al archivo CSS es correcta -->

    </head>
    <body>
        <form action="index.php" method="get">
            <button type="submit">Volver</button>
        </form>
        <hr>
        <h1>Reportería</h1>
        <hr>
        <div name="Resumen por Habitación">
            <h2>Resumen por Habitación</h2>
            <table>
                <thead>
                    <th>Habitación</th>
                    <th>Promedio Calificación</th>
                    <th>Total Recaudado</th>
                </thead>
                <tbody>
                    <?php foreach ($records1 as $m) { ?>
                            <td><?php echo $m->Numero_habitacion ?></td>
                            <td><?php if(obternerProm($m->Numero_habitacion)){
                                echo obternerProm($m->Numero_habitacion);
                            } else{
                                echo "-";
                            } ?></td>
                            <td><?php if(obternerSumTours($m->Numero_habitacion)){
                                echo obternerSumTours($m->Numero_habitacion);
                            } else{
                                echo "0";
                            } ?></td>
            
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
        <hr>
        <h2>Historial</h2>
        <?php
        if (!count($records)) {
            echo 'No hay tours disponibles';
        } else {
        ?>
            <table>
                <thead>
                    <th>Habitación</th>
                    <th>Calificación</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                </thead>
                <tbody>
                    <?php foreach ($records as $r) { ?>
                        <tr>
                            <td><?php echo $r->Numero_habitacion ?></td>
                            <td><?php echo $r->Calificacion ?></td>
                            <td><?php echo $r->Fecha_Checkout ?></td>
                            <td><?php 
                            if ($r->Total_Tours)
                                echo $r->Total_Tours ;
                            else {
                                echo "0";
                                }    ?>
                            </td>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        <?php } ?>
    </body>
</html>

<?php
require 'bd.php';

$records = array();
if ($results = $conn->query('SELECT * FROM historial')) {
    if ($results->num_rows) {
        while ($row = $results->fetch_object()) {
            $records[] = $row;
        }
        $results->free();
    }
}



?>

<!DOCTYPE html>
<html>
    <head>
        <title>Reporteria</title>
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
                <th>Total de Tours</th>
            </thead>
            <tr>
                <td></td>
            </tr>
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
                <th>Total Tours</th>
            </thead>
            <tbody>
                <?php foreach ($records as $r) { ?>
                    <tr>
                        <td><?php echo $r->Numero_habitacion ?></td>
                        <td><?php echo $r->Calificacion ?></td>
                        <td><?php echo $r->Fecha_Checkout ?></td>
                        <td><?php echo $r->Total_Tours ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    <?php } ?>
    </body>
</html>
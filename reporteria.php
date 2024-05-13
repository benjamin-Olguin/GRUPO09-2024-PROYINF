<?php
require 'bd.php';

// Obtener todos los registros de historial
$records = array();
if ($results = $conn->query('SELECT * FROM historial')) {
    if ($results->num_rows) {
        while ($row = $results->fetch_object()) {
            $records[] = $row;
        }
        $results->free();
    }
}

// Funciones para calcular el promedio de calificaciones y la sumatoria de total_tours
$query_promedio = "SELECT calcular_promedio_calificaciones() AS promedio_calificaciones";
$query_sumatoria = "SELECT calcular_sumatoria_total_tours() AS sumatoria_total_tours";

// Ejecutar las consultas
$result_promedio = $conn->query($query_promedio);
$result_sumatoria = $conn->query($query_sumatoria);

// Obtener los resultados
$promedio_calificaciones = $result_promedio->fetch_assoc()['promedio_calificaciones'];
$sumatoria_total_tours = $result_sumatoria->fetch_assoc()['sumatoria_total_tours'];

// Cerrar la conexión
$conn->close();

?>

<!DOCTYPE html>
<html>
<head>
    <title>Reportería</title>
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
        <table border="1">
            <thead>
                <tr>
                    <th>Habitación</th>
                    <th>Promedio Calificación</th>
                    <th>Total de Tours</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td><?php echo $promedio_calificaciones; ?></td>
                    <td><?php echo $sumatoria_total_tours; ?></td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr>
    <h2>Historial</h2>
    <?php if (empty($records)): ?>
        <p>No hay tours disponibles</p>
    <?php else: ?>
        <table border="1">
            <thead>
                <tr>
                    <th>Habitación</th>
                    <th>Calificación</th>
                    <th>Fecha</th>
                    <th>Total Tours</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($records as $r): ?>
                    <tr>
                        <td><?php echo $r->Numero_habitacion ?></td>
                        <td><?php echo $r->Calificacion ?></td>
                        <td><?php echo $r->Fecha_Checkout ?></td>
                        <td><?php echo $r->Total_Tours ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</body>
</html>

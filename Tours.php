<?php
require 'bd.php';

$records = array();
if ($results = $conn->query('SELECT * FROM VistaDetallesTours')) {
    if ($results->num_rows) {
        while ($row = $results->fetch_object()) {
            $records[] = $row;
        }
        $results->free();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Tours Disponibles</title>
</head>
<body>
    <h1>Tours La Diversión</h1>
    <h2>Tours Disponibles</h2>
    <?php
    if (!count($records)) {
        echo 'No hay tours disponibles';
    } else {
    ?>
        <table>
            <thead>
                <th>Fecha</th>
                <th>Lugar</th>
                <th>Medio de Transporte</th>
                <th>Imagen</th>
                <th>Precio</th>
            </thead>
            <tbody>
                <?php foreach ($records as $r) { ?>
                    <tr>
                        <td><?php echo $r->Fecha ?></td>
                        <td><?php echo $r->Lugar ?></td>
                        <td><?php echo $r->Medio_Transporte ?></td>
                        <td><img src="images/<?php echo $r->Imagen ?>" alt="Imagen del tour" style="width:100px;"></td>
                        <td><?php echo $r->Precio ?></td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    <?php } ?>
    <hr>
    <h2>Reservar / Cancelar Tours</h2>
    <form action="ReservaTour.php" method="post">
        <button type="submit">Reservar</button>
    </form>
    <form action="CancelarTour.php" method="post">
        <button type="submit">Cancelar</button>
    </form>
    <hr>
    <form action="index.php" method="post">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

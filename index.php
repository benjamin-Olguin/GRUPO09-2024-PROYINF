<!DOCTYPE html>
<html lang="es">
<head>
    <title>Consultar Habitaciones Disponibles</title>
    <link rel="stylesheet" href="Css/styles_Tours.css"> <!-- Asegúrate de que la ruta al archivo CSS es correcta -->

</head>
<body>
    <h1>Habitaciones Disponibles</h1>
    <form method="GET">
        <label for="search">Buscar habitación por número:</label>
        <input type="number" id="search" name="search" placeholder="Número habitación">
        <button type="submit">Buscar</button>
    </form>

    <?php
    require 'bd.php';

    if (isset($_GET['search']) && $_GET['search'] !== '') {
        $search = intval($_GET['search']);
        $sql = "SELECT * FROM habitaciones WHERE Numero_habitacion = $search";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if ($row["Estado"] == 0) {
                    echo "Número de Habitación: " . $row['Numero_habitacion'] .
                        " - Tipo: " . $row['Tipo_habitacion'] .
                        " - Precio por noche: " . $row['Precio']. "$" . 
                        " - Estado: " . ($row['Estado'] ? "Reservada" : "Disponible") . "<br>";
                    echo "<form action='RealizarReserva.php' method='post'>
                            <input type='hidden' name='Numero_habitacion' value='" . $row['Numero_habitacion'] . "'>
                            <button type='submit'>Reservar</button>
                        </form>";
                }
                else {
                    echo 
                        " <i><b>La Habitación " . $row['Numero_habitacion'] . " ya está reservada </b></i> <br>
                        Número de Habitación: " . $row['Numero_habitacion'] .
                        " - Tipo: " . $row['Tipo_habitacion'] .
                        " - Precio por noche: " . $row['Precio'] . "$" . 
                        " - Estado: " . ($row['Estado'] ? "Reservada" : "No Disponible") . "<br>";
                }
            }
        } else {
            echo "No se encuentra el número de habitación buscado.";
        }
    }
    ?>  

    <hr>
    <form action="ModificarReserva.php" method="get">
        <button type="submit">Modificar reserva</button>
    </form>
    <form action="BorrarReserva.php" method="get">
        <button type="submit">Borrar reserva</button>
    </form>
    <form action="Tours.php" method="get">
        <button type="submit">Reserva un tour</button>
    </form>
    <form action="CheckOut.php" method="get">
        <button type="submit">CheckOut</button>
    </form>
    <form action="reporteria.php" method="get">
        <button type="submit">Reporteria</button>
    </form>
</body>
</html>

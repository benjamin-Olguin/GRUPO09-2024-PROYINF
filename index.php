<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscar Habitaciones Disponibles</title>
</head>
<body>
    <h1>Buscar Habitaciones Disponibles</h1>
    <form action="index.php" method="get">
    <label for="tipo_habitacion">Tipo de habitación:</label>
    <select id="tipo_habitacion" name="tipo_habitacion">
        <option value="all" <?php if(isset($_GET['tipo_habitacion']) && $_GET['tipo_habitacion'] == 'all') echo 'selected'; ?>>Todos</option>
        <option value="Single" <?php if(isset($_GET['tipo_habitacion']) && $_GET['tipo_habitacion'] == 'Single') echo 'selected'; ?>>Single</option>
        <option value="Double" <?php if(isset($_GET['tipo_habitacion']) && $_GET['tipo_habitacion'] == 'Double') echo 'selected'; ?>>Double</option>
        <option value="King" <?php if(isset($_GET['tipo_habitacion']) && $_GET['tipo_habitacion'] == 'King') echo 'selected'; ?>>King</option>
        </select>
        <button type="submit">Buscar habitaciones</button>
    </form>

    <?php
    include 'bd.php'; // Asegúrate de que este archivo contiene la conexión correcta a la base de datos

    // Obtener el tipo de habitación del formulario si está seteado, de lo contrario usar 'all'
    $tipo_habitacion = isset($_GET['tipo_habitacion']) ? $_GET['tipo_habitacion'] : 'all';

    // Preparar la consulta SQL para buscar habitaciones disponibles
    $sql = "SELECT * FROM Habitaciones WHERE estado = 0";
    if ($tipo_habitacion !== 'all') {
        $sql .= " AND tipo_habitacion = '{$conn->real_escape_string($tipo_habitacion)}'";
    }

    // Ejecutar la consulta
    $result = $conn->query($sql);

    // Checar si se obtuvieron resultados y mostrarlos
    if ($result->num_rows > 0) {
        echo "<h2>Habitaciones Disponibles:</h2>";
        while ($row = $result->fetch_assoc()) {
            echo "Número de Habitación: " . $row['Numero_habitacion'] .
                 " - Tipo: " . $row['Tipo_habitacion'] .
                 " - Precio por noche: $" . $row['Precio'] . "<br>";
        }
    } else {
        echo "No hay habitaciones disponibles.";
    }

    // Cerrar la conexión
    $conn->close();
    ?>
</body>
</html>

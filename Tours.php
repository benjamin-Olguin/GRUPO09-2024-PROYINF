<?php
require 'bd.php';

// Obtener todos los tours disponibles
$sql = "SELECT * FROM tours";
$result = $conn->query($sql);

// Procesar la selección del tour
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['Id_Tour'])) {
    $Id_Tour = $_POST['Id_Tour'];
    $costo_tour = $_POST['costo_tour'];  // Asumiendo que también envías el costo del tour
    $Id_Cliente = $_POST['Id_Cliente'];  // El ID del cliente seleccionado

    // Actualizar el valor acumulado del cliente
    $update_sql = "UPDATE clientes SET Valor_Acumulado = Valor_Acumulado + ? WHERE Id_Cliente = ?";
    $stmt_update = $conn->prepare($update_sql);
    $stmt_update->bind_param("di", $costo_tour, $Id_Cliente);
    if ($stmt_update->execute()) {
        echo "<p>Tour asignado con éxito y costo añadido al cliente.</p>";
    } else {
        echo "<p>Error al asignar el tour: " . $stmt_update->error . "</p>";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <title>Tours Disponibles</title>
</head>
<body>
    <h1>Seleccionar un Tour</h1>
    <?php
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<div>";
            echo "<h2>" . $row['Lugar'] . " - " . $row['Fecha'] . "</h2>";
            echo "<p>Medio de Transporte: " . $row['Medio_Transporte'] . "</p>";
            echo "<img src='" . $row['Imagen'] . "' alt='Imagen del Tour' style='width:200px;'>";
            // Formulario para asignar el tour a un cliente
            echo "<form method='post' action=''>";
            echo "<input type='hidden' name='Id_Tour' value='" . $row['Id_Tour'] . "'>";
            echo "<input type='number' name='costo_tour' placeholder='Costo del Tour'>";
            echo "<select name='Id_Cliente'>";
            // Aquí necesitarías cargar los clientes disponibles
            echo "</select>";
            echo "<button type='submit'>Asignar Tour</button>";
            echo "</form>";
            echo "</div>";
        }
    } else {
        echo "<p>No hay tours disponibles.</p>";
    }
    ?>
    <form action="index.php" method="post">
        <button type="submit">Volver</button>
    </form>
</body>
</html>

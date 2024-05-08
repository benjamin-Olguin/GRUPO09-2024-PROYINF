<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reservación de Hotel</title>
</head>
<body>
    <h1>Reservación de Hotel</h1>
    <form action="reserva.php" method="post">

        <label for="room-type">Buscar habitación:</label>
        <select id="room-type" name="room_type">
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="king">King</option>
        </select>
        <button type="submit" name="search_rooms">Buscar</button>
        <br><br>

        <button type="submit" name="make_reservation">Hacer Reserva</button>
        <button type="submit" name="take_tour">Tomar un Tour</button>
    </form>
    <form action="index.php" method="get">
            <button type="submit">Volver</button>
    </form>
</body>
</html>

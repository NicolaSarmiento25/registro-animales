<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_animales";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }

    $mes = $_GET['mes'] ?? '';

    if (empty($mes)) {
        echo json_encode(['success' => false, 'message' => 'Mes no proporcionado']);
        exit;
    }

    // Consultar animales del mes seleccionado
    $sql = "SELECT id, especie, animal, mes, ano, estado FROM animales WHERE mes = ? ORDER BY ano DESC, id DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $mes);
    $stmt->execute();
    $result = $stmt->get_result();

    $animales = [];
    while ($row = $result->fetch_assoc()) {
        $animales[] = $row;
    }

    $total = count($animales);

    echo json_encode([
        'success' => true,
        'animales' => $animales,
        'total' => $total
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
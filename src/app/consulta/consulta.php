<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_animales";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }

    // Filtro opcional por mes
    $mes = $_GET['mes'] ?? '';

    if (!empty($mes)) {
        $sql = "SELECT id, especie, animal, mes, ano, estado, fecha_registro FROM animales WHERE mes = ? ORDER BY id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $mes);
        $stmt->execute();
        $result = $stmt->get_result();
    } else {
        $sql = "SELECT id, especie, animal, mes, ano, estado, fecha_registro FROM animales ORDER BY id DESC";
        $result = $conn->query($sql);
    }

    $animales = [];
    while ($row = $result->fetch_assoc()) {
        $animales[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $animales, 'count' => count($animales)]);

    if (isset($stmt)) $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
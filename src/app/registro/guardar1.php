<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registro_animales";

try {
    // Conexión a la base de datos
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }

    // Obtener datos del formulario
    $especie = $_POST['especie'] ?? '';
    $animal = $_POST['animal'] ?? '';
    $mes = $_POST['mes'] ?? '';
    $ano = $_POST['ano'] ?? date('Y');
    $estado = $_POST['estado'] ?? '';

    // Validar datos requeridos
    if (empty($especie) || empty($animal) || empty($mes) || empty($estado)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
        exit;
    }

    // Insertar datos
    $sql = "INSERT INTO animales (especie, animal, mes, ano, estado) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssis", $especie, $animal, $mes, $ano, $estado);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Animal registrado exitosamente']);
    } else {
        throw new Exception("Error al insertar: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
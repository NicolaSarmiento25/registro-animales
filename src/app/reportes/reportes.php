<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host    = "localhost";
$usuario = "root";
$clave   = "";
$bd      = "Proyectofinal"; // ← cambia si tu BD tiene otro nombre

$conn = new mysqli($host, $usuario, $clave, $bd);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

$nombre   = trim($_POST['nombre']   ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$reporte  = trim($_POST['reporte']  ?? '');

if (empty($nombre) || empty($telefono) || empty($reporte)) {
    echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
    exit();
}

$stmt = $conn->prepare(
    "INSERT INTO reportes (nombre, telefono, reporte, created_at) VALUES (?, ?, ?, NOW())"
);
$stmt->bind_param("sss", $nombre, $telefono, $reporte);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Reporte guardado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
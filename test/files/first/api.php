<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// connect to db 
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'keys' ;
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
     $data = json_decode(file_get_contents("php://input"), true);
     $key = $data['key'] ?? '';
     $stmt = $conn->prepare("SELECT * FROM users WHERE cle = :key");
     $stmt->execute([':key' => $key]);
     $user = $stmt->fetch(PDO::FETCH_ASSOC);
     if (!$user) {
         echo json_encode([
             "status" => "error",
             "message" => "Key not found"
         ]);
         exit();
     }
     echo json_encode([
         "status" => "success",
         "method" => "POST",
         "data" => $user
     ]);
}

// if ($method === 'POST') {
//     $data = json_decode(file_get_contents("php://input"), true);

//     echo json_encode([
//         "status" => "success",
//         "method" => "POST",
//         "data" => $data
//     ]);
// }
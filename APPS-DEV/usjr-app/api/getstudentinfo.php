<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

$requestBody = file_get_contents('php://input');

$studentData = json_decode($requestBody,true);

try {
    $query = 'SELECT * FROM students WHERE studid=?;';

    $queryStatement = $dbconnection->prepare($query);

    $queryStatement->bindParam(1,$studentData['studid'],PDO::PARAM_INT);

    $queryStatement->execute();

    echo json_encode($queryStatement->fetch(PDO::FETCH_ASSOC));
} catch (PDOException $error){
     echo $error->getMessage();
}
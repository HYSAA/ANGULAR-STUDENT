<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

try {
    $query = 'SELECT * FROM colleges;';
    $queryStatement = $dbconnection->prepare($query);

    if ($queryStatement->execute()) {
        $result = $queryStatement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } else {
        // If the execution fails, return a 500 Internal Server Error
        http_response_code(500);
        echo json_encode(array("error" => "Unable to execute the query."));
    }
} catch (PDOException $error) {
    // If a PDOException occurs, return a 500 Internal Server Error with the error message
    http_response_code(500);
    echo json_encode(array("error" => $error->getMessage()));
}

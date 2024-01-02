<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once '../db.php';

$requestBody = file_get_contents('php://input');
$studentInsertData = json_decode($requestBody,true);

$message = [];

function validDataInputs($values){

    $idPattern = "/^[1-9][\d]*$/";
    $yearPattern = "/^[1-5]+$/";
    $namePattern = "/^[A-z\s\'\-]+$/";
 
    $validBag = [];
 
    $valueBag = count($values);
 
    foreach($values as $key=>$value){
             if($key === 'studID'){
                 (preg_match($idPattern, $value)) ? $validBag[] = true : $validBag[] = false;
                 $message['errors'][$key] = 'Only numbers not starting with a zero are accepted.';
             } elseif($key === 'studYear'){
                 (preg_match($yearPattern, $value)) ? $validBag[] = true : $validBag[] = false;
                 $message['errors'][$key] = 'Only numbers from 1 to 5 are accepted.';
             } elseif($key === 'studProgId' || $key === 'studCollId'){
                 (preg_match('/^[\d]+$/', $value)) ? $validBag[] = true : $validBag[] = false;
             } else {
                 (preg_match($namePattern,$value)) ? $validBag[] = true : $validBag[] = false;
                 $message['errors'][$key] = 'Only characters, spaces, apostrophies and hyphens are accepted.';
             }
    }
 
 //    var_dump($validBag);
 
    $counter = 0;
 
    foreach($validBag as $validItem){
        if($validItem){
          $counter++;
        }
    }
 
    return ($counter === $valueBag) ? true : false;
 }
 
 function find($id, $connection){
    $search = 'SELECT studid FROM students WHERE studid = ?;';
 
    $searchStatement = $connection->prepare($search);
    $searchStatement->bindParam(1,$id,PDO::PARAM_INT);
    $searchStatement->execute();
 
    return $searchStatement->rowCount();;
 }
 
 if(validDataInputs($studentInsertData)){
 
     // echo 'All inputs are valid.';
     if(find($studentInsertData['studID'], $dbconnection) > 0){
         $message['status'] = 'Student record already exists in the system.';
         $message['code'] = 300;
     } else {
         $sql = 'INSERT INTO students VALUES(?,?,?,?,?,?,?);';
 
         $dbStatment = $dbconnection->prepare($sql);
 
         $dbStatment->bindParam(1,$studentInsertData['studID'],PDO::PARAM_INT);
         $dbStatment->bindParam(2,$studentInsertData['studFirstName'],PDO::PARAM_STR);
         $dbStatment->bindParam(3,$studentInsertData['studLastName'],PDO::PARAM_STR);
         $dbStatment->bindParam(4,$studentInsertData['studMidName'],PDO::PARAM_STR);
         $dbStatment->bindParam(5,$studentInsertData['studProgId'],PDO::PARAM_INT);
         $dbStatment->bindParam(6,$studentInsertData['studCollId'],PDO::PARAM_INT);
         $dbStatment->bindParam(7,$studentInsertData['studYear'],PDO::PARAM_INT);
 
         $dbStatment->execute();
 
         $rowsInserted = $dbStatment->rowCount();
 
         if($rowsInserted > 0){
             $message['status'] = 'Student Entry has been added.';
             $message['code'] = 200;
         }
     }
 } else {
     $message['status'] = 'There are some invalid input values.';
     $message['code'] = 400;
 }
 
 echo json_encode($message);
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once '../db.php';

$requestBody = file_get_contents('php://input');
$studentUpdateData = json_decode($requestBody,true);

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
 
 if(validDataInputs($studentUpdateData)){ 
     // echo 'All inputs are valid.';
         $sql = 'UPDATE students SET studfirstname = ?,
                                     studmidname = ?,
                                     studlastname = ?,
                                     studcollid = ?,
                                     studprogid = ?,
                                     studyear = ?
                                     WHERE studid = ?;';
 
         $dbStatment = $dbconnection->prepare($sql);

         $dbStatment->bindParam(1,$studentUpdateData['studFirstName'],PDO::PARAM_STR);
         $dbStatment->bindParam(2,$studentUpdateData['studLastName'],PDO::PARAM_STR);
         $dbStatment->bindParam(3,$studentUpdateData['studMidName'],PDO::PARAM_STR);
         $dbStatment->bindParam(4,$studentUpdateData['studProgId'],PDO::PARAM_INT);
         $dbStatment->bindParam(5,$studentUpdateData['studCollId'],PDO::PARAM_INT);
         $dbStatment->bindParam(6,$studentUpdateData['studYear'],PDO::PARAM_INT);
         $dbStatment->bindParam(7,$studentUpdateData['studID'],PDO::PARAM_INT);
 
         $dbStatment->execute();
 
         $rowsInserted = $dbStatment->rowCount();
 
         if($rowsInserted > 0){
             $message['status'] = 'Student information is successfully updated.';
             $message['code'] = 200;
         } else {
             $message['status'] = 'Student information was not updated.';
             $message['code'] = 400;
         }
     }
 
 echo json_encode($message);
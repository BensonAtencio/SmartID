<?php
$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "qrs";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

if(!$conn){
    echo "Connection Failed";
}
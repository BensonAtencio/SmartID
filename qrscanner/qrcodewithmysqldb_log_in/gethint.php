<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<?php
include "db_conn.php";
// get the q parameter from URL
$q = $_REQUEST["q"];

//$hint = "";
$con = mysqli_connect('localhost','root','','qrs');
// Check connection
if (mysqli_connect_errno())
{
 echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// lookup all hints from array if $q is different from ""
if ($q !="") {
  /*$q = strtolower($q);
  $len=strlen($q);
  foreach($a as $name) {
    if (stristr($q, substr($name, 0, $len))) {
      if ($hint === "") {
        $hint = $name;
      } else {
        $hint .= ", $name";
      }
    }
  }*/
  
$result=mysqli_query($con,"SELECT * FROM logs_in WHERE name_and_section='$q'");
$rowcount=mysqli_num_rows($result);
if($rowcount==0){
  $ret=mysqli_query($con,"INSERT INTO `logs_in`(name_and_section,Time_in) VALUES ('$q',NOW())");
  if($ret){
    date_default_timezone_set('Asia/Manila');
    echo '<div class="alert alert-success"><strong> Student Successfully Timed In!</strong></div>';
    echo date('l jS \of F Y h:i:s A');
  }
  else{}

}
else{
  // $exe = mysqli_query($conn, "UPDATE `logs_in` SET Time_in = NOW() WHERE name_and_section=$q");
  // if($exe){
  // //echo 'Student is already Timed in but needs update';  
  // date_default_timezone_set('Asia/Manila');
  // echo '<div class="alert alert-success"><strong> Student Successfully Timed In again!</strong></div>';
  // echo date('l jS \of F Y h:i:s A');
  // }
  // else{}
  date_default_timezone_set('Asia/Manila');
  echo '<div class="alert alert-success"><strong> Student Successfully Timed In!</strong></div>';
  echo date('l jS \of F Y h:i:s A');
}

}

// Output "no suggestion" if no hint was found or output correct values
//echo $hint === "" ? "no suggestion" : $hint;
?>
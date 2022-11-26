<?php 
session_start(); 
include "db_conn.php";


if (isset($_POST['uname']) && isset($_POST['password'])) {

	function validate($data){
       $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}

	$uname = validate($_POST['uname']);
	$pass = validate($_POST['password']);

	if (empty($uname)) {
		header("Location: admn_login_page.php?error=User Name is required");
	    exit();
	}else if(empty($pass)){
        header("Location: admn_login_page.php?error=Password is required");
	    exit();
	}else{
		// $sql = "SELECT * FROM admin_acc WHERE user_name='$uname' AND password='$pass'";

		// $result = mysqli_query($conn, $sql);

		// if (mysqli_num_rows($result) === 1) {
		// 	$row = mysqli_fetch_assoc($result);
        //     if ($row['user_name'] === $uname && $row['password'] === $pass) {
        //     	$_SESSION['user_name'] = $row['user_name'];
        //     	$_SESSION['name'] = $row['name'];
        //     	$_SESSION['id'] = $row['id'];
        //     	header("Location: admn_page.php");
		//         exit();
        //     }else{
		// 		header("Location: admn_login_page.php?error=Incorect User name or password");
		//         exit();
		// 	}
		// }else{
		// 	header("Location: admn_login_page.php?error=Incorect User name or password");
	    //     exit();
		// }
        $sql = "SELECT * FROM admin_acc WHERE user_name='$uname'";
        $results = mysqli_query($conn, $sql);

        if($row = mysqli_fetch_assoc($results)){
            $pwdC = password_verify($pass, $row['password']);
            if($pwdC == false){
                header("Location: admn_login_page.php?error=Incorrect Credentials");
                exit();
            }
            elseif($pwdC == true){
                $_SESSION['user_name'] = $row['user_name'];
            	$_SESSION['name'] = $row['name'];
            	$_SESSION['id'] = $row['id'];
        
                header("Location: admn_page.php?login=success");
                exit();
            }
            else{
                header("Location: admn_login_page.php?error=error");
                exit();
            }
        }
        else{
            header("Location: admn_login_page.php?error=nouser");
            exit();
        }
	}
	
}else{
	header("Location: admn_login_page.php");
	exit();
}
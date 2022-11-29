<?php
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Page</title>
    <style>
        table{
            border-collapse: collapse;
            width: 50%;
        }
        table th{
            background-color: gray;
            color: #fff;
            padding: 10px;
        }
        table td{
            padding: 12px;
            color: black;
            font-size: 1em;
            text-align: center;
        }
    </style>
</head>

<body>

<?php

    include "db_conn.php";

    $sql = "SELECT * FROM logs_out;";
    $sql1 = "SELECT * FROM logs_in;";

    $results = mysqli_query($conn, $sql);
    $results1 = mysqli_query($conn, $sql1);
    $resultCheck = mysqli_num_rows($results);
    $resultCheck1 = mysqli_num_rows($results1);
?>

    <table>
        <tr>
            <th>Name and Section</th>
            <th>Time In</th>
        </tr>
        <tr>
        <?php
            if ($resultCheck1 > 0){
                while($row1 = mysqli_fetch_assoc($results1)){
                    echo "
                        <tr>
                        <td>".$row1['name_and_section']."</td>
                        <td>".$row1['Time_in']."</td>
                        </tr>
                    ";
                }
            }
        ?>
    </table>
    <br><br>
    <table>
        <tr>
            <th>Name and Section</th>
            <th>Time Out</th>
        </tr>
        <tr>
        <?php
            if ($resultCheck > 0){
                while($row = mysqli_fetch_assoc($results)){
                    echo "
                        <tr>
                        <td>".$row['name_and_section']."</td>
                        <td>".$row['Time_out']."</td>
                        </tr>
                    ";
                }
            }
        ?>
        </tr>
    </table>
    <br><br>

    <a href="logout.php">Logout</a><br>
    <a href="clear.php">Clear Records</a>

</body>

</html>
<?php

}else{
    header("Location: admn_login_page.php");
    exit();
}

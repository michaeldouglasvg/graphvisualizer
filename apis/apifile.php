<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Connecting the Localhost
$con = mysqli_connect("localhost", "root", "", "chartvisualization");
$response = array();

if($con) {

    $sql = "SELECT * FROM customers";
    $result = mysqli_query($con, $sql);

    if($result) {
        header("Content-Type: JSON");

        $i = 0;

        while($row = mysqli_fetch_array($result)){
            
            $response[$i]["c1"] = $row['customer_1'];
            $response[$i]["c2"] = $row['customer_2'];
            $response[$i]["c3"] = $row['customer_3'];
            $response[$i]["c4"] = $row['customer_4'];
            $response[$i]["c5"] = $row['customer_5'];
            $response[$i]["c6"] = $row['customer_6'];
            $response[$i]["c7"] = $row['customer_7'];

            $i++;
        }

        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}else{

    echo("Server is down. Please try again later.");

}
?>
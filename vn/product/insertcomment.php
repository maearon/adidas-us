<?php
// initializing variables
// khởi tạo biến
session_start();
$postid=$_GET['id'];
echo $postid;
$author= $_SESSION['name'].' '.$_SESSION['lastname'];
echo $author;
$body    = "";

$date= $_GET['date'];
echo $date;

// connect to the database
// kết nối với cơ sở dữ liệu
$coon=mysqli_connect( "localhost", "root", "", "adidas"); 
mysqli_query($coon, "SET NAMES utf8"); 

// REGISTER USER
// GHI DANH NGƯỜI DÙNG
if (isset($_POST['Submit'])) {
  // receive all input values from the form
  // nhận tất cả các giá trị đầu vào từ biểu mẫu
  $body = mysqli_real_escape_string($coon, $_POST['body']);
echo $body;

  $result=mysqli_query($coon, " INSERT INTO comments VALUES ('$postid','$author','$body','$date') "); 
  
}
else
{
die("Fill out everything please. Mkay.");
}
header("location:/vn/product?slot=$postid");
?>
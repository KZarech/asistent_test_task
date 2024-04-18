<?php

require_once "../../DBConnection.php";
require_once "../Users.php";
require_once "../UsersFieldValidation.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["password"]) && isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["phone"]))
        Users::registerUser($_POST["password"], $_POST["name"], $_POST["email"], $_POST["phone"]);
    else echo "error";
}

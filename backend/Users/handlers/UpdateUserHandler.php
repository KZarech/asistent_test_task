<?php

require_once "../../DBConnection.php";
require_once "../Users.php";
require_once "../UsersFieldValidation.php";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["id"])) {
    if (isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["phone"]))
        Users::editUser($_POST["id"], $_POST["name"], $_POST["phone"]);
    else echo "error";
}

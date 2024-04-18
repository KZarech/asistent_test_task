<?php

require_once "../../DBConnection.php";
require_once "../Users.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["password"]) && isset($_POST["email"]))
        Users::authUser($_POST["email"], $_POST["password"]);
    else echo "error";
}

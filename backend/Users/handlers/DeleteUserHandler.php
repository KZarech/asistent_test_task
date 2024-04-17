<?php

require_once "../../DBConnection.php";
require_once "../Users.php";

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["id"])) {
    Users::deleteUser($_POST["id"]);
}
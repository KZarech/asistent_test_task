<?php

require_once "../../DBConnection.php";
require_once "../Users.php";
require_once "../../common/SessionCheck.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    Users::getUserList();
}
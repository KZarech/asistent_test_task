<?php

class SessionCheck
{
    public static function checkSession() {
        session_start();
        if (!isset($_SESSION["userId"]) || !isset($_COOKIE["userId"])) {
            header("Location: https://asistent-test-task/index.php");
            exit();
        }
    }
}
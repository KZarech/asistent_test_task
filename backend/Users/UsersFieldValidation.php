<?php

class UsersFieldValidation
{
    private static function validateName($value) {
        if (empty($value) || strlen($value) > 100) {
            return "incorrect name";
        }
        return true;
    }

    private static function validateEmail($value) {
        if (!preg_match("/^\S+@\S+\.\S+$/", $value)) {
            return "incorrect email";
        }
        return true;
    }

    private static function validatePassword($value) {
        if (empty($value) || strlen($value) < 8) {
            return "short password";
        }
        return true;
    }

    private static function validatePhone($value) {
        if (!preg_match("/^[0-9]{10}$/", $value)) {
            return "incorrect phone";
        }
        return true;
    }

    private static function isEmailUnique($value) {
        $db = new DBConnection();
        $table = "users";

        $sql = "SELECT * FROM `$table` WHERE `email` = '$value'";

        $res = $db->execQuery($sql, true);

        if ($res->num_rows > 0) {
            return "email is registered";
        }
        return true;
    }

    public static function validateFields($name = "", $email = "", $password = "", $phone = "") {
        $errors = [];
        if (isset($name))
            $errors[] = self::validateName($name);
        if (isset($email)) {
            $errors[] = self::validateEmail($email);
            $errors[] = self::isEmailUnique($email);
        }
        if (isset($password))
            $errors[] = self::validatePassword($password);
        if (isset($phone))
            $errors[] = self::validatePhone($phone);

        return $errors;
    }
 }

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

    public static function validateAllFields($name, $email, $password, $phone) {
        $errors = [];
        $errors[] = self::validateName($name);
        $errors[] = self::validateEmail($email);
        $errors[] = self::isEmailUnique($email);
        $errors[] = self::validatePassword($password);
        $errors[] = self::validatePhone($phone);

        return $errors;
    }
 }

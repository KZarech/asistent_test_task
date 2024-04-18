<?php


class Users
{
    private static string $tableName = "users";

    private static function getConnectionAndTable(): array {
        $db = new DBConnection();
        $table = self::$tableName;

        return [$db, $table];
    }

    private static function validateFieldsAndGetResult($name, $email, $password, $phone): array
    {
        $validatedFields = UsersFieldValidation::validateFields($name, $email, $password, $phone);

        $filteredFields = array_filter($validatedFields, function($item) {
            return $item === true;
        });

        $allTrue = count($filteredFields) === count($validatedFields);

        return [$validatedFields, $allTrue];
    }

    public static function registerUser($password, $name, $email, $phone) {
        list($validatedFields, $allTrue) = self::validateFieldsAndGetResult($name, $email, $password, $phone);

        if ($allTrue) {
            list($db, $table) = self::getConnectionAndTable();

            $sql = "INSERT INTO `$table` (`name`, `email`, `password`, `phone_number`) VALUES ('$name','$email','$password','$phone')";
            $res = $db->execQuery($sql);

            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($validatedFields, JSON_UNESCAPED_UNICODE);
        }
    }

    public static function editUser($id, $name, $phone) {
        list($validatedFields, $allTrue) = self::validateFieldsAndGetResult($name, null, null, $phone);

        if ($allTrue) {
            list($db, $table) = self::getConnectionAndTable();

            $sql = "UPDATE `$table` SET `name`='$name',`phone_number`=$phone WHERE `id` = $id";
            $res = $db->execQuery($sql);

            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($validatedFields, JSON_UNESCAPED_UNICODE);
        }
    }

    public static function deleteUser($id) {
        list($db, $table) = self::getConnectionAndTable();

        $sql = "DELETE FROM $table WHERE `id` = $id";
        $res = $db->execQuery($sql);

        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public static function getUserList() {
        $check = SessionCheck::checkSession();
        if (!$check) {
            list($db, $table) = self::getConnectionAndTable();

            $sql = "SELECT * FROM $table";

            $data = ["users" => []];

            $res = $db->execQuery($sql, true);

            while ($row = $res->fetch_assoc()) {
                $data["users"][] = [
                    "id" => $row["id"],
                    "name" => $row["name"],
                    "phone" => $row["phone_number"],
                    "email" => $row["email"],
                ];
            }

            $response["response"] = $data;
            echo json_encode($response,JSON_UNESCAPED_UNICODE);
        } else {
            echo $check;
        }
    }

    public static function authUser($email, $password) {
        session_start();
        list($db, $table) = self::getConnectionAndTable();

        $sql = "SELECT id FROM `$table` WHERE `email` = '$email' AND `password` = '$password'";
        $res = $db->execQuery($sql, true);

        if ($res->num_rows > 0) {
            $data = [];
            while ($row = $res->fetch_assoc()) {
                $data["user"] = $row;
            }

            $userId = $data["user"]["id"];
            $_SESSION["userId"] = $userId;
            setcookie("userId", $userId, time() + (86400 * 7), "/");

            echo json_encode($data,JSON_UNESCAPED_UNICODE);
        } else {
            echo "user not found";
        }
    }
}

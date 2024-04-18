<?php


class Users
{
    private static string $tableName = "users";

    private static function getConnectionAndTable(): array {
        $db = new DBConnection();
        $table = self::$tableName;

        return [$db, $table];
    }

    public static function registerUser($password, $name, $email, $phone) {
        $validatedFields = UsersFieldValidation::validateAllFields($name, $email, $password, $phone);

        $filteredFields = array_filter($validatedFields, function($item) {
            return $item === true;
        });

        $allTrue = count($filteredFields) === count($validatedFields);

        if ($allTrue) {
            list($db, $table) = self::getConnectionAndTable();

            $sql = "INSERT INTO `$table` (`name`, `email`, `password`, `phone_number`) VALUES ('$name','$email','$password','$phone')";
            $res = $db->execQuery($sql);

            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($validatedFields, JSON_UNESCAPED_UNICODE);
        }
    }

    public static function editUser($id, $name, $email, $phone) {
        // TODO: create middleware/method to validate user fields and another one to check if email is unique

        list($db, $table) = self::getConnectionAndTable();

        $sql = "UPDATE `$table` SET `name`='$name',`email`='$email',`phone_number`=$phone WHERE `id` = $id";
        $res = $db->execQuery($sql);

        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public static function deleteUser($id) {
        list($db, $table) = self::getConnectionAndTable();

        $sql = "DELETE FROM $table WHERE `id` = $id";
        $res = $db->execQuery($sql);

        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public static function getUserList() {
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
    }

//    public static function authUser() {
//
//    }
}
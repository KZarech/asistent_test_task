<?php


class Users
{
    private static string $tableName = "users";

//    public static function createUser() {
//
//    }

//    public static function editUser() {
//
//    }

    public static function deleteUser($id) {
        $db = new DBConnection();
        $table = self::$tableName;

        $sql = "DELETE FROM $table WHERE `id` = $id";
        $res = $db->execQuery($sql);

        echo json_encode($res, JSON_UNESCAPED_UNICODE);
    }

    public static function getUserList() {
        $db = new DBConnection();
        $table = self::$tableName;

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
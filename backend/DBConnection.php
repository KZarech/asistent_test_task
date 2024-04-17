<?php

class DBConnection
{
    private string $servername = "localhost";
    private string $username = "root";
    private string $password = "root";
    private string $dbname = "asistent_task";
    public \mysqli $conn;

    public function __construct()
    {
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);

        if (!$this->conn) {
            throw new \Exception("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function execQuery($sql, bool $get = false) {
        $result = $this->conn->query($sql);
        if($result === FALSE) {
            echo "Ошибка: " .$sql . "<br>" . $this->conn->error;
        }
        if ($get) return $result;
        return "success";
    }

    public function __destruct() {
        mysqli_close($this->conn);
    }
}
<?php
require_once 'functions.php';

class Model {
    private PDO $connection;

    public function __construct()
    {
        $this->connect();
    }

    private function connect() 
    {
        $host = config('host');
        $db = config('db');
        $user = config('user');
        $pass = config('password');
        $charset = 'utf8';
        
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $this->connection = new PDO($dsn, $user, $pass, $opt);
    }
}
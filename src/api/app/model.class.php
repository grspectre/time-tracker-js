<?php
require_once 'functions.php';
require_once 'safemysql.class.php';

class Model
{
    private SafeMySQL $connection;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->connection = new SafeMySQL([
            'host' => config('host'),
            'db' => config('db'),
            'user' => config('user'),
            'pass' => config('pass'),
        ]);
    }
}

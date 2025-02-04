<?php
require_once 'functions.php';

class IO {
    private string $token;

    public function __construct()
    {
        $headers = getallheaders();
        var_dump($headers);
    }
}
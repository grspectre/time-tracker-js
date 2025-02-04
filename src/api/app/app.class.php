<?php
class App {
    private string $method;

    public function __construct(string $method)
    {
        $this->method = $method;        
    }

    public function process(): string
    {
        return '';
    }
}
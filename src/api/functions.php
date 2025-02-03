<?php

if (! function_exists('array_get')) {
    /**
     * Получить значение из массива
     * 
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    function config(string $key, $default = null): mixed
    {
        $config = require('config.php');
        return array_get($config, $key, $default);
    }
}

if (! function_exists('array_get')) {
    /**
     * Получить значение массива
     * 
     * @param $array
     * @param $key
     * @param null $default
     * @return mixed
     */
    function array_get($array, $key, $default = null)
    {
        if (is_null($key)) {
            return $array;
        }

        if (is_array($array) && array_key_exists($key, $array)) {
            return $array[$key];
        }

        foreach (explode('.', $key) as $segment) {
            if (! is_array($array) || ! array_key_exists($segment, $array)) {
                return $default;
            }

            $array = $array[$segment];
        }

        return $array;
    }
}

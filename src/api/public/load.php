<?php
require_once('../app/app.class.php');

$app = new App('load');
echo $app->process();
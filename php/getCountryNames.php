<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$result = file_get_contents('../js/countryBorders.geo.json');

$decode = json_decode($result, true);


$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";

$countryData = array();
for ($i = 0; $i < count($decode['features']); $i++) {
    array_push($countryData, array('name' => $decode['features'][$i]['properties']['name'], 'iso' => $decode['features'][$i]['properties']['iso_a2']));
}
$output['data'] = $countryData;



header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);

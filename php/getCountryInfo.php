<?php

// remove for production

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$url = 'http://api.geonames.org/countryInfoJSON?formatted=true&country=' . $_REQUEST['country'] . '&username=philip.br136&style=full';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
if (curl_exec($ch) === false) {
    echo 'Curl error: ' . curl_error($ch);
    $output['status']['code'] = "404";
    $output['status']['name'] = "Error";
    $output['status']['description'] = "No Data returned from API";
} else {
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
}
$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);


$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['geonames'];

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);

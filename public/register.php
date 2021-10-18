<?php
    $CODE = '';
    $DATA_DIR = '/home/blynk/data';

    $profile = [
        "name" => "",
        "email" => "",
        "appName" => "Blynk",
        "region" => "local",
        "ip" => "10.15.0.6",
        "pass" => "",
        "lastModifiedTs" => 1632730471493,
        "lastLoggedAt" => 0,
        "profile" => [],
        "isFacebookUser" => false,
        "isSuperAdmin" => true,
        "energy" => 100000,
        "id" => ""
    ];

    $json = file_get_contents('php://input');

    if ($json === false) {
        print('Unable to read submission.');
        exit();
    }

    $data = json_decode($json, true);

    if ($data === null) {
        print('Unable to decode json submission.');
        exit();
    }

    // if (strtoupper($data['code']) != $CODE ) {
    //     print('Invalid registration code.');
    //     exit();
    // }

    $filename = basename($data['email'] . '.Blynk.user');
    $path = $DATA_DIR . '/' . $filename;

    if (file_exists($path)) {
        print('Email address is already registered.');
        exit();
    }

    // Generate password hash
    $hash1 = hash('sha256', strtolower($data['email']), true);
    $hash2 = hash('sha256', $data['password'] . $hash1, true);
    $passwordHash = base64_encode($hash2);

    // Build json
    $profile['name'] = $data['email'];
    $profile['email'] = $data['email'];
    $profile['pass'] = $passwordHash;
    $profile['id'] = $data['email'] . '-Blynk';

    $content = json_encode($profile, JSON_FORCE_OBJECT);
    
    // Write to file
    if (file_put_contents($path, $content)) {
        print('Registration successful. You may need to wait up to 5 mins for the server to be updated.');
        exit();
    } else {
        print('Server error: Unable to write file.' . $path);
        exit();
    }

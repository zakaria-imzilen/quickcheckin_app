<?php

// << Event Routes
require('events.php');
// >>

// << SuperAdmin Routes
require('superadmins.php');
// >>

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
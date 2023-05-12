<?php

// << Event Routes
require('events.php');
// >>

// << SuperAdmin Routes
require('superadmins.php');
// >>

// << Organizer Routes
require('organizers.php');
// >>

// << Use rRoutes
require('users.php');
// >>

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
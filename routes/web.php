<?php
use App\Http\Controllers\RefundController;

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

// << Use rRoutes
require('tickets.php');
// >>

Route::post('/refunds/edit', [RefundController::class, 'editRefund']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
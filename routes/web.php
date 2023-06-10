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

// << User Routes
require('users.php');
// >>

// << Tickets Routes
require('tickets.php');
// >>

// << Stats Routes
require('stats.php');
// >>

Route::post('/refunds/edit', [RefundController::class, 'editRefund']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
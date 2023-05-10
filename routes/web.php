<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;


Route::get('/events', [EventController::class, 'display']);

Route::get('/events/{q}', [EventController::class, 'searchEvent']);

Route::post('/events/add', [EventController::class, 'addEvent']);

Route::post('/event/edit/{id}', [EventController::class, 'editEvent']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
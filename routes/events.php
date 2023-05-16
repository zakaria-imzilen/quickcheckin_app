<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

// << Event Routes
Route::get('/events', [EventController::class, 'display']);

Route::get('/events/{q}', [EventController::class, 'searchEvent']);

Route::get('/events/categories');
Route::get('/events/categories/{categoryId}');

Route::post('/events/add', [EventController::class, 'addEvent']);

Route::get('/event/{eventId}', [EventController::class, 'displayEventDetails']);

Route::post('/event/edit/{id}', [EventController::class, 'editEvent']);
// >>

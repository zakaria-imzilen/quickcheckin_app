<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

// << Event Routes
Route::get('/api/events/fetch/{skip}', [EventController::class, 'display']);
Route::get('/api/events/categories/fetch', [EventController::class, 'displayCategories']);
Route::get('/api/events/categories/fetch/{categoryId}/{skip}', [EventController::class, 'displayCategoryEvents']);
Route::post('/api/events/add', [EventController::class, 'addEvent']);

Route::get('/api/events/search/{q}', [EventController::class, 'searchEvent']);

Route::get('/api/event/slug/{slug}', [EventController::class, 'displayEventDetailsBySlug']);
Route::post('/api/event/edit/{id}', [EventController::class, 'editEvent']);
Route::get('/api/event/{eventId}', [EventController::class, 'displayEventDetails']);
// >>

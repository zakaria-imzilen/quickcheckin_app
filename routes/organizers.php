<?php

use App\Http\Controllers\OrganizerController;
use Illuminate\Support\Facades\Route;

Route::get('/sa/organizers/displayall', [OrganizerController::class, 'displayAll']);
Route::get('/sa/organizers/search/{q}', [OrganizerController::class, 'search']);

Route::post('/sa/organizers/signup', [OrganizerController::class, 'signUp']);
Route::post('/sa/organizers/login', [OrganizerController::class, 'logIn']);

Route::post('/sa/organizers/edit', [OrganizerController::class, 'edit']);
<?php

use App\Http\Controllers\OrganizerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/us/signup', [UserController::class, 'signUp']);
Route::post('/us/login', [UserController::class, 'logIn']);

Route::post('/us/edit', [UserController::class, 'editInfo']);
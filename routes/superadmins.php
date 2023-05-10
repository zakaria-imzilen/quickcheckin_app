<?php

// use App\Http\Controllers\EventController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [SuperAdminController::class, 'login']);
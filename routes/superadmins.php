<?php

// use App\Http\Controllers\EventController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;

// Route::post('sa/auth/login', [SuperAdminController::class, 'login']);
Route::post('/api/sa/auth/login', [SuperAdminController::class, 'loginV1']);
Route::post('/api/sa/auth/validate', [SuperAdminController::class, 'checkCode']);
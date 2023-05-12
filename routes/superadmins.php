<?php

// use App\Http\Controllers\EventController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;

Route::post('sa/auth/login', [SuperAdminController::class, 'login']);
Route::post('sa/auth/validate', [SuperAdminController::class, 'checkCode']);
<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// SA Dashboard data edit
Route::post('/api/sa/tickets/{id}', [TicketController::class, 'ticketEdit']);
Route::post('/api/sa/users/{id}', [UserController::class, 'userEdit']);
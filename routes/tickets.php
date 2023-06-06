<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::get('/api/tickets/user/{id}', [TicketController::class, 'displayTickets']);
Route::get('/api/tickets/cancel/{ticketId}', [TicketController::class, 'cancelTicket']);
Route::post('/api/tickets/buy', [TicketController::class, 'buyTickets']);
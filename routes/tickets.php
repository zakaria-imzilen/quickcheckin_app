<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::get('tickets/user/{id}', [TicketController::class, 'displayTickets']);
Route::get('tickets/event/{eventId}', [TicketController::class, 'displayTicketsByEvent']);
Route::get('tickets/cancel/{ticketId}', [TicketController::class, 'cancelTicket']);
Route::post('tickets/buy', [TicketController::class, 'buyTicket']);
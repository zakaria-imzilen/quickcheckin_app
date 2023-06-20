<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

// US Stats
Route::get('/api/stats/nbrtickets/{userId}', [TicketController::class, 'statsTickets']);

// SA Stats
Route::get('/api/sa/stats', [TicketController::class, 'sp_stats']);
Route::get('/api/sa/tickets', [TicketController::class, 'statsSATickets']);
Route::get('/api/sa/users', [TicketController::class, 'statsSAUsers']);
Route::get('/api/sa/organizers', [TicketController::class, 'statsSAOrganizers']);
Route::get('/api/sa/payments', [TicketController::class, 'statsSAPayments']);
<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

Route::get('/api/stats/nbrtickets/{userId}', [TicketController::class, 'statsTickets']);
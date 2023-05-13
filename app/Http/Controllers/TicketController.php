<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function displayTickets($id)
    {
        $result = Ticket::where('userId', $id)->get();

        return json_encode($result);
    }

    public function displayTicketsByEvent($eventId)
    {
        $result = Ticket::where('eventId', $eventId)->get();
        return json_encode($result);
    }

    public function cancelTicket($ticketId)
    {
        $result = Ticket::where('id', $ticketId)->update(['status' => 'canceled']);
        if ($result === 1) {
            return json_encode([
                "updated" => true
            ]);
        }
        return json_encode([
            "updated" => false
        ]);
    }

    public function buyTicket(Request $request)
    {
        $result = Ticket::create($request->all());

        if (gettype($result->id) === "integer") {
            return json_encode([
                "created" => true,
                "id" => $result->id
            ]);
        }
        return json_encode([
            "created" => false
        ]);
    }
}
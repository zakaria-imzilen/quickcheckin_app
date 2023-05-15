<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use App\Models\Ticket;
use App\Models\Payment;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function displayTickets($id)
    {
        $result = Ticket::where('userId', $id)->get();

        return json_encode($result);
    }


    public function cancelTicket($ticketId)
    {
        $result = Ticket::where('id', $ticketId)->update(['status' => 'canceled']);
        if ($result === 1) {
            $resultRefund = Refund::create([
                "status" => "active",
                "date" => now()->toDateString(),
                "ticketId" => $ticketId,
            ]);

            if (gettype($resultRefund->id) === "integer") {
                return json_encode([
                    "updated" => true
                ]);
            } else {
                Ticket::where('id', $ticketId)->update(['status' => 'active']);

                return json_encode([
                    "updated" => false,
                    "message" => "Could not refund the ticket"
                ]);
            }
        }
        return json_encode([
            "updated" => false,
            "message" => "Either ticket not found, or an issue in SQL Query insert"
        ]);
    }

    public function buyTicket($ticket, $payment)
    {
        $resultTicket = Ticket::create($ticket);
        $resultPayment = Payment::create($payment);

        $toReturn = [
            "ticket" => [
                "created" => false,
                "id" => null
            ],
            "payment" => [
                "created" => false,
                "id" => null
            ],
        ];

        if (gettype($resultTicket->id) === "integer") {
            $toReturn["ticket"]["created"] = true;
            $toReturn["ticket"]["id"] = $resultTicket->id;

            if (gettype($resultPayment->id) === "integer") {
                $toReturn["payment"]["created"] = true;
                $toReturn["payment"]["id"] = $resultPayment->id;
            }
        }

        return $toReturn;
    }

    public function buyTickets(Request $request)
    {
        $tickets = $request->tickets;
        $payment = $request->payment;

        $allGood = true;
        foreach ($tickets as $ticket) {
            $resp = $this->buyTicket($ticket, $payment);

            if (!$resp["ticket"]["created"] or !$resp["payment"]["created"]) {
                $allGood = false;
                break;
            }
        }

        return json_encode([
            "created" => $allGood
        ]);
    }
}
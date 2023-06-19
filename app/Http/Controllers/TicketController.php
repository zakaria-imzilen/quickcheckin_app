<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Organizer;
use App\Models\Refund;
use App\Models\Ticket;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function displayTickets($id)
    {
        $tickets = Ticket::where('userId', $id)->get();
        $results = [];

        foreach ($tickets as $ticket) {
            $event = $ticket->Event;
            $category = $event->Category;
            $pack = $ticket->EventPackage;

            $result = [
                "ticket" => [
                    "status" => $ticket->status,
                    "date" => $ticket->date,
                ],
                "event" => $event,
                "category" => $category,
                "pack" => $pack
            ];

            array_push($results, $result);
        }


        return json_encode($results);
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
        $resultPayment = Payment::create([
            "creditCardNum" => $payment['creditCardNum'],
            "expiringDate" => $payment['expiringDate'],
            "holderFullName" => $payment['holderFullName'],
            "securityNumber" => $payment['securityNumber'],
            "ticketId" => $resultTicket['id'],
            "userId" => $payment['userId']
        ]);

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

            if (!$resp["ticket"]["created"] || !$resp["payment"]["created"]) {
                $allGood = false;
                break;
            }
        }

        return json_encode([
            "created" => $allGood
        ]);
    }

    // Stats
    // -- User
    public function statsTickets($userId)
    {
        $tickets = Ticket::where('userId', $userId)->get();
        $nbr = $tickets->count();
        $sum = 0;

        foreach ($tickets as $ticket) {
            $pack = $ticket->EventPackage;
            $sum += $pack['price'];
        }

        $result = ['nbrTickets' => $nbr, 'totalSpent' => $sum];

        return $result;
    }

    // -- SA
    public function totalTickets()
    {
        $result = Ticket::get()->count();

        return $result;
    }

    // -- SA
    public function sp_stats()
    {
        $nbr_tickets_sold = Ticket::get()->count();
        $sum = 0;
        $events = Event::get()->count();

        $tickets = Ticket::get();
        foreach ($tickets as $ticket) {
            $pack = $ticket->EventPackage;
            $sum += $pack['price'];
        }

        $result = [
            'nbr_tickets_sold' => $nbr_tickets_sold,
            'total_transactions' => $sum,
            'total_events' => $events
        ];

        return $result;
    }

    // -- SA
    public function statsSATickets()
    {
        $result = [];

        $tickets = Ticket::limit(20)->get();
        foreach ($tickets as $ticket) {
            $pack = $ticket->EventPackage;
            $event = $ticket->Event;
            $user = $ticket->User;

            array_push($result, ['ticket' => $ticket, 'pack' => $pack, 'event' => $event, 'user' => $user]);
        }

        return $result;
    }

    // -- SA
    public function statsSAUsers()
    {
        $tickets = User::limit(20)->get();

        return $tickets;
    }

    // -- SA
    public function statsSAOrganizers()
    {
        $organizers = Organizer::limit(20)->get();

        return $organizers;
    }

    // -- SA
    public function statsSAPayments()
    {
        $payments = Payment::limit(60)->get();

        return $payments;
    }

    // -- SA -- EDIT
    public function ticketEdit($id, Request $request)
    {
        $result = Ticket::find($id)->update($request->all());

        return ['updated' => $result];
    }
}
<?php

namespace Tests\Feature;

use Tests\TestCase;

class TicketTest extends TestCase
{
    public function test_displayTickets()
    {
        $response = $this->get('tickets/user/7');
        $response->assertJsonIsArray();
    }

    public function test_cancelTicket()
    {
        $this->withoutMiddleware();
        $response = $this->get('tickets/cancel/1');
        $response->assertExactJson([
            "updated" => true
        ]);
    }

    public function test_buyTickets()
    {
        $this->withoutMiddleware();

        $response = $this->post('tickets/buy', [
            "payment" => [
                "creditCardNum" => 1234567891234567,
                "expiringDate" => "2023-07-18",
                "holderFullName" => "Zakaria Imzilen",
                "securityNumber" => 512,
                "ticketId" => 2,
                "userId" => 1,
            ],
            "tickets" => [
                [
                    "date" => "2023-05-13",
                    "packId" => "1",
                    "eventId" => "1",
                    "userId" => "1",
                    "status" => "active",
                ],
                [
                    "date" => "2023-05-10",
                    "packId" => "2",
                    "eventId" => "2",
                    "userId" => "2",
                    "status" => "active",
                ],
            ]
        ]);

        $response->assertExactJson([
            "created" => true
        ]);
    }
}
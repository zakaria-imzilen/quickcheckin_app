<?php

namespace Tests\Unit;

use Tests\TestCase;

class EventTest extends TestCase
{
    public function test_display()
    {
        $response = $this->get('/events');

        $response->assertJsonCount(10);
    }

    public function test_search()
    {
        $response = $this->get('/events/Freddie Rogahn');
        $response->assertJsonCount(1);
    }

    public function test_add_event()
    {
        $this->withoutMiddleware();
        $response = $this->post(
            "/events/add",
            array(
                'name' => "Miss Yolanda Heller V",
                'price' => 785,
                'description' => 'In veritatis vitae ex dignissimos dolorem enim. Autem architecto omnis officiis id.',
                'date' => '2023-01-27',
                'location' => 'Alice replied',
                'imageURL' => 'https://via.placeholder.com/640x480.png/00aa77?text=qui',
                'status' => 'paused',
                'placesNumber' => 200,
                'type' => 'food',
                'organizerId' => 1
            )
        );

        $response->assertJsonIsObject();
    }

    public function test_edit_event()
    {
        $this->withoutMiddleware();

        $response = $this->postJson(
            "/event/edit/2",
            array(
                'imageURL' => 'https://via.placeholder.com/640x480.png/00aa77?text=qui',
                'status' => 'paused',
                'placesNumber' => 200,
                'type' => 'food',
            )
        );

        $response->assertStatus(200);
    }

}
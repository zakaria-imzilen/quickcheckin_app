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
        $response = $this->get('/events/Libero');
        $response->assertJsonIsArray();
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
                'categoryId' => 2,
                'organizerId' => 1
            )
        );

        $response->assertExactJson([
            "created" => true
        ]);
    }

    public function test_displayEventDetails()
    {
        $response = $this->get('/event/11');

        $response->assertJsonStructure([
            "id",
            "name",
            "price",
            "description",
            "date",
            "location",
            "imageURL",
            "status",
            "placesNumber",
            "type",
            "organizerId",
            "created_at",
            "updated_at",
        ]);
    }

    public function test_displayEventDetailsBySlug()
    {
        $response = $this->get("/api/event/slug/iste-architecto-ea-maiores-distinctio-consequatur-magnam-omnis");

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
                'categoryId' => 4,
            )
        );

        $response->assertExactJson([
            "updated" => true
        ]);
    }

    public function test_displayCategories()
    {
        $response = $this->get('/events/categories');
        $response->assertJsonCount(6);
    }
}
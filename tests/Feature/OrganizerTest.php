<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrganizerTest extends TestCase
{
    public function test_displayAll()
    {
        $response = $this->get('/sa/organizers/displayall');

        $response->assertJsonIsArray();
    }

    public function test_search()
    {
        $response = $this->get('/sa/organizers/search/Yasmin');

        $response->assertJsonIsArray();
    }

    public function test_signUp()
    {
        $this->withoutMiddleware();

        $response = $this->post("/sa/organizers/signup", [
            "firstName" => "Zakaria",
            "lastName" => "Imzilen",
            "email" => "zakaria@gmail.com",
            "pwd" => "password",
            "organizationName" => "ByteBridge",
        ]);

        $response->assertJsonStructure([
            "created",
            "id"
        ]);
    }

    public function test_login()
    {
        $this->withoutMiddleware();

        $response = $this->post("/sa/organizers/login", [
            "email" => "zakaria@gmail.com",
            "pwd" => "password"
        ]);

        $response->assertJsonStructure(
            [
                "status",
                "data" => [
                    "id",
                    "firstName",
                    "lastName",
                    "email",
                    "organizationName",
                ]
            ]
        );
    }

    public function test_edit()
    {
        $this->withoutMiddleware();

        $response = $this->post("/sa/organizers/edit", [
            "id" => 4,
            "firstName" => "Ayman",
            "lastName" => "Farouki",
            "email" => "ayman@gmail.com",
            "pwd" => "AymanPWD",
            "organizationName" => "DGI",
        ]);

        $response->assertExactJson([
            "updated" => true,
        ]);
    }
}
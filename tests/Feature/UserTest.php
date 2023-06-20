<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_signup()
    {
        $this->withoutMiddleware();

        $response = $this->post("/us/signup", [
            'firstName' => "Zakaria",
            'lastName' => "Imzilen",
            'email' => "zakaria1@gmail.com",
            'pwd' => "ZakariaPWD",
            'sexe' => "male",
            "birthDate" => "2007-07-18",
            'imageURL' => "https://images.pexels.com/photos/15483821/pexels-photo-15483821.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        ]);

        $response->assertJsonStructure([
            "created",
            "id"
        ]);
    }

    public function test_login()
    {
        $this->withoutMiddleware();

        $response = $this->post('/us/login', [
            'email' => 'zakaria1@gmail.com',
            'pwd' => 'ZakariaPWD'
        ]);

        $response->assertJsonStructure([
            "found",
            'firstName',
            'lastName',
            'email',
            'pwd',
            'sexe',
            "birthDate",
            'imageURL',
        ]);
    }

    public function test_editInfo()
    {
        $this->withoutMiddleware();

        $response = $this->post('/us/edit', [
            "id" => 91,
            "email" => "zakariyimzilen@gmail.com",
            "pwd" => "ZakariaPWD",
            "newData" => [
                "email" => "zakariyimzilen1@gmail.com",
                "sexe" => "TopG"
            ]
        ]);

        $response->assertExactJson([
            "updated" => true
        ]);
    }
}
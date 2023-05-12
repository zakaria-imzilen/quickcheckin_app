<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SuperAdminTest extends TestCase
{
    public function test_login()
    {
        $this->withoutMiddleware();
        $response = $this->post('/sa/auth/login', [
            'email' => "lilliana80@parker.com",
            'pwd' => ')_*uh-w2vDvtD"c'
        ]);

        $response->assertValid();
    }

    public function test_check_code()
    {
        $this->withoutMiddleware();
        $response = $this->post('/sa/auth/validate', [
            'id' => 1,
            'auth_code' => 8108
        ]);

        $response->assertExactJson([
            'updated' => true
        ]);
    }
}
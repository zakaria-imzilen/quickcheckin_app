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
            'email' => "witting.gabriella@gottlieb.biz",
            'pwd' => '~SKDpXL"4%I7&d'
        ]);

        $response->assertExactJson([
            "status" => true,
            "message" => "Auth Code Generated successfuly"
        ]);
    }

    public function test_check_code()
    {
        $this->withoutMiddleware();
        $response = $this->post('/sa/auth/validate', [
            'id' => 1,
            'auth_code' => 7120
        ]);

        $response->assertExactJson([
            'status' => true
        ]);
    }
}
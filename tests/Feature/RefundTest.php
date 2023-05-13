<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RefundTest extends TestCase
{
    public function test_editRefund()
    {
        $this->withoutMiddleware();

        $response = $this->post('/refunds/edit', [
            'id' => 1,
            'newData' => [
                'status' => 'refunded'
            ]
        ]);

        $response->assertExactJson([
            "edited" => true
        ]);
    }
}
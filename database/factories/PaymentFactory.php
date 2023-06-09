<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "creditCardNum" => fake()->creditCardNumber(),
            "expiringDate" => fake()->numberBetween(1, 12) . '/' . fake()->numberBetween(23, 35),
            "holderFullName" => fake()->name(),
            "securityNumber" => fake()->numberBetween(100, 999),
            "ticketId" => fake()->numberBetween(1, 80),
            "userId" => fake()->numberBetween(1, 60),
        ];
    }
}
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "date" => fake()->date(),
            "packId" => fake()->numberBetween(1, 15),
            "eventId" => fake()->numberBetween(1, 10),
            "userId" => fake()->numberBetween(1, 60),
            "status" => fake()->realText(10),
        ];
    }
}
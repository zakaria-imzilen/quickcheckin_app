<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "name" => fake()->name(),
            "price" => fake()->numberBetween(200, 1000),
            "description" => fake()->text(),
            "date" => fake()->dateTimeThisYear(),
            "location" => fake()->realText(),
            "imageURL" => fake()->imageUrl(),
            "status" => fake()->text(),
            "placesNumber" => fake()->numberBetween(20, 600),
            "type" => fake()->text(),
            "organizerId" => fake()->numberBetween(1, 2),
        ];
    }
}
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
            "name" => fake()->unique()->name(),
            "price" => fake()->numberBetween(200, 1000),
            "description" => fake()->text(),
            "date" => fake()->dateTimeThisYear(),
            "location" => fake()->city(),
            "imageURL" => fake()->imageUrl(),
            "status" => fake()->text(),
            "slug" => fake()->unique()->slug(),
            "placesNumber" => fake()->numberBetween(20, 600),
            "categoryId" => fake()->numberBetween(1, 6),
            "organizerId" => fake()->numberBetween(1, 2),
        ];
    }
}
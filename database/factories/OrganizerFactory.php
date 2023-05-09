<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organizer>
 */
class OrganizerFactory extends Factory
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
            "firstName" => fake()->firstName(),
            "lastName" => fake()->lastName(),
            "email" => fake()->email(),
            "pwd" => fake()->password(),
            "organizationName" => fake()->name(),
        ];
    }
}
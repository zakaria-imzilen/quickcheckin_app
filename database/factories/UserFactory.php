<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'firstName' => fake()->firstName(),
            'lastName' => fake()->lastName(),
            'email' => fake()->email(),
            'pwd' => fake()->password(),
            'sexe' => fake()->randomElement(['male', 'female']),
            "birthDate" => fake()->dateTimeBetween("-40years", "-18years"),
            'imageURL' => fake()->imageUrl(),
        ];
    }
}
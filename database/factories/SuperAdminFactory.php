<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SuperAdmin>
 */
class SuperAdminFactory extends Factory
{
    public function definition(): array
    {
        return [
            "firstName" => fake()->firstName(),
            "lastName" => fake()->lastName(),
            "pwd" => fake()->password(),
            "email" => fake()->email(),
        ];
    }
}
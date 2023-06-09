<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory(90)->create();

        // For each category, create 3 events
        foreach ($users as $user) {
            Ticket::factory(10)->create(['userId' => $user->id]);
        }
    }
}
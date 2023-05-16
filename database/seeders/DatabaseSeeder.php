<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            OrganizerSeeder::class,
            CategorySeeder::class,
            EventSeeder::class,
            EventPackageSeeder::class,
            SuperAdminSeeder::class,
            UserSeeder::class,
            TicketSeeder::class,
            PaymentSeeder::class,
            RefundSeeder::class,
        ]);
    }
}
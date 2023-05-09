<?php

namespace Database\Seeders;

use App\Models\EventPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EventPackage::factory()
            ->count(20)
            ->create();
    }
}
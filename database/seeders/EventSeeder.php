<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventPackage;
use Database\Factories\OrganizerFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Event::factory()
            ->has(EventPackage::factory()->count(3), 'event_packages')
            ->count(80)
            ->create();
    }
}
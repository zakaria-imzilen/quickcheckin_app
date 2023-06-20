<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Event;
use App\Models\EventPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 4 categories
        $categories = Category::factory(4)->create();

        // For each category, create 3 events
        foreach ($categories as $category) {
            $events = Event::factory(20)->create(['categoryId' => $category->id]);

            // For each event, create 2 event packages
            foreach ($events as $event) {
                EventPackage::factory(4)->create(['eventId' => $event->id]);
            }
        }
    }
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("price");
            $table->string("description");
            $table->date("date");
            $table->string("location");
            $table->string("imageURL");
            $table->string("status");
            $table->integer("placesNumber");
            $table->string("type");
            $table->unsignedBigInteger("organizerId");

            $table->foreign("organizerId")->references("id")->on("organizers");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->unsignedBigInteger("packId");
            $table->unsignedBigInteger("eventId");
            $table->unsignedBigInteger("userId");
            $table->string("status");

            $table->foreign("packId")->references("id")->on("event_packages");
            $table->foreign("eventId")->references("id")->on("event");
            $table->foreign("userId")->references("id")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
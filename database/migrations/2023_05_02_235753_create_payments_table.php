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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string("creditCardNum", 16);
            $table->string("expiringDate", 5);
            $table->string("holderFullName");
            $table->integer("securityNumber");
            $table->unsignedBigInteger("ticketId");
            $table->unsignedBigInteger("userId");

            $table->foreign("ticketId")->references("id")->on("tickets");
            $table->foreign("userId")->references("id")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
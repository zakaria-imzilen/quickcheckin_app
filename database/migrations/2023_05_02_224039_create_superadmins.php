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
        Schema::create('superadmins', function (Blueprint $table) {
            $table->primary('id');
            $table->string("firstName");
            $table->string("lastName");
            $table->string("pwd");
            $table->unique("email");
            $table->integer("auth_code");
            $table->string("auth_expiring");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('superadmins');
    }
};
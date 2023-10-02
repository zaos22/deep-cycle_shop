<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bill_lines', function (Blueprint $table) {
            $table->id();
            $table->integer('unity');
            $table->foreignId('product_id')->references('id')->on('products')->nullable();
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('bill_id')->references('id')->on('bills');
            $table->foreignId('material_id')->references('id')->on('materials')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_lines');
    }
};

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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string("image");
            $table->string('title');
            $table->string('author');
            $table->string('description');
            $table->float("price");
            $table->string("genre");
            $table->string("language");
            $table->string("publisher");
            $table->date("publication date");
            $table->integer("page_count");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};

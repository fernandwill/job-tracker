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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location')->nullable();
            $table->string('salary')->nullable();
            $table->date('applied_at')->nullable()->index();
            $table->string('posting_url')->nullable();
            $table->foreignId('job_status_id')->constrained('job_statuses')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();

            $table->index('job_status_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};

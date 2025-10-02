<?php

use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobNoteController;
use App\Http\Controllers\JobStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api'])->group(static function (): void {
    Route::get('job-statuses', [JobStatusController::class, 'index'])->name('job-statuses.index');
    Route::get('interviews/upcoming', [InterviewController::class, 'index'])->name('interviews.upcoming');

    Route::apiResource('jobs', JobController::class);

    Route::apiResource('jobs.notes', JobNoteController::class);
});


<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\JobNoteController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api'])->group(static function (): void {
    Route::apiResource('jobs', JobController::class);

    Route::apiResource('jobs.notes', JobNoteController::class)->shallow();
});

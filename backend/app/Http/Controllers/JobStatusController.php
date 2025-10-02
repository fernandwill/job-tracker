<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobStatusResource;
use App\Models\JobStatus;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class JobStatusController extends Controller
{
    /**
     * Display a listing of the job statuses ordered for the UI.
     */
    public function index(): AnonymousResourceCollection
    {
        $statuses = JobStatus::query()->ordered()->get();

        return JobStatusResource::collection($statuses);
    }
}
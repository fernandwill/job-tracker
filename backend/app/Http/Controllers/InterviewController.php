<?php

namespace App\Http\Controllers;

use App\Http\Resources\InterviewResource;
use App\Models\Interview;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class InterviewController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $interviews = Interview::query()
            ->where('scheduled_at', '>=', now()->startOfDay())
            ->orderBy('scheduled_at')
            ->get();

        return InterviewResource::collection($interviews);
    }
}

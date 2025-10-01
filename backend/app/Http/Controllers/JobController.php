<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobIndexRequest;
use App\Http\Requests\JobStoreRequest;
use App\Http\Requests\JobUpdateRequest;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(JobIndexRequest $request): AnonymousResourceCollection
    {
        $filters = $request->validated();

        $query = Job::query()
            ->with([
                'status',
                'notes' => static function (Builder $query): void {
                    $query->latest('created_at');
                },
            ]);

        if (! empty($filters['status'])) {
            $query->forStatus($filters['status']);
        }

        if (! empty($filters['job_status_id'])) {
            $query->where('job_status_id', $filters['job_status_id']);
        }

        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(static function (Builder $builder) use ($search): void {
                $builder->where('title', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $sort = $filters['sort'] ?? 'created_at';
        $direction = $filters['direction'] ?? 'desc';

        $query->orderBy($sort, $direction);

        $perPage = $filters['per_page'] ?? 15;

        $jobs = $query->paginate($perPage)->appends($request->query());

        return JobResource::collection($jobs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobStoreRequest $request): Response
    {
        $data = $request->validated();

        $job = new Job();
        $job->title = $data['title'];
        $job->company = $data['company'];
        $job->location = $data['location'] ?? null;
        $job->job_status_id = $data['job_status_id'];
        $job->applied_at = $data['applied_at'] ?? null;
        $job->posting_url = $data['posting_url'] ?? null;
        $job->salary = $data['salary'] ?? null;
        $job->save();

        $job->load(['status', 'notes']);

        return (new JobResource($job))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job): JobResource
    {
        $job->load(['status', 'notes']);

        return new JobResource($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobUpdateRequest $request, Job $job): JobResource
    {
        $data = $request->validated();

        if (array_key_exists('title', $data)) {
            $job->title = $data['title'];
        }

        if (array_key_exists('company', $data)) {
            $job->company = $data['company'];
        }

        if (array_key_exists('location', $data)) {
            $job->location = $data['location'];
        }

        if (array_key_exists('job_status_id', $data)) {
            $job->job_status_id = $data['job_status_id'];
        }

        if (array_key_exists('applied_at', $data)) {
            $job->applied_at = $data['applied_at'];
        }

        if (array_key_exists('posting_url', $data)) {
            $job->posting_url = $data['posting_url'];
        }

        if (array_key_exists('salary', $data)) {
            $job->salary = $data['salary'];
        }

        $job->save();

        $job->load(['status', 'notes']);

        return new JobResource($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job): Response
    {
        $job->delete();

        return response()->noContent();
    }
}

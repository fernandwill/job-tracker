<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobNoteIndexRequest;
use App\Http\Requests\JobNoteStoreRequest;
use App\Http\Requests\JobNoteUpdateRequest;
use App\Http\Resources\JobNoteResource;
use App\Models\Job;
use App\Models\JobNote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class JobNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Job $job, JobNoteIndexRequest $request): AnonymousResourceCollection
    {
        $filters = $request->validated();

        $query = $job->notes()
            ->with(['job.status'])
            ->when(
                ! empty($filters['search']),
                static function (Builder $builder) use ($filters): void {
                    $builder->where('body', 'like', "%{$filters['search']}%");
                }
            )
            ->when(
                array_key_exists('has_reminder', $filters) && $filters['has_reminder'] !== null,
                static function (Builder $builder) use ($filters): void {
                    if ($filters['has_reminder']) {
                        $builder->whereNotNull('reminder_at');
                    } else {
                        $builder->whereNull('reminder_at');
                    }
                }
            );

        $sort = $filters['sort'] ?? 'created_at';
        $direction = $filters['direction'] ?? 'desc';

        $query->orderBy($sort, $direction);

        $perPage = $filters['per_page'] ?? 15;

        $notes = $query->paginate($perPage)->appends($request->query());

        return JobNoteResource::collection($notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Job $job, JobNoteStoreRequest $request): Response
    {
        $data = $request->validated();

        $note = new JobNote();
        $note->job()->associate($job);
        $note->body = $data['body'];
        $note->reminder_at = $data['reminder_at'] ?? null;
        $note->created_by = $data['created_by'] ?? $request->user()?->getKey();
        $note->save();

        $note->load(['job.status']);

        return (new JobNoteResource($note))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job, JobNote $jobNote): JobNoteResource
    {
        $this->ensureJobNoteBelongsToJob($job, $jobNote);

        $jobNote->load(['job.status']);

        return new JobNoteResource($jobNote);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Job $job, JobNoteUpdateRequest $request, JobNote $jobNote): JobNoteResource
    {
        $this->ensureJobNoteBelongsToJob($job, $jobNote);

        $data = $request->validated();

        if (array_key_exists('body', $data)) {
            $jobNote->body = $data['body'];
        }

        if (array_key_exists('reminder_at', $data)) {
            $jobNote->reminder_at = $data['reminder_at'];
        }

        if (array_key_exists('created_by', $data)) {
            $jobNote->created_by = $data['created_by'];
        }

        $jobNote->save();

        $jobNote->load(['job.status']);

        return new JobNoteResource($jobNote);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job, JobNote $jobNote): Response
    {
        $this->ensureJobNoteBelongsToJob($job, $jobNote);

        $jobNote->delete();

        return response()->noContent();
    }

    /**
     * Ensure the note belongs to the provided job.
     */
    protected function ensureJobNoteBelongsToJob(Job $job, JobNote $jobNote): void
    {
        if ($jobNote->job_id !== $job->getKey()) {
            abort(Response::HTTP_NOT_FOUND);
        }
    }
}

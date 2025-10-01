<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Job
 */
class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'company' => $this->company,
            'location' => $this->location,
            'salary' => $this->salary,
            'applied_at' => $this->applied_at?->toISOString(),
            'posting_url' => $this->posting_url,
            'job_status_id' => $this->job_status_id,
            'status' => new JobStatusResource($this->whenLoaded('status')),
            'notes' => JobNoteResource::collection($this->whenLoaded('notes')),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}

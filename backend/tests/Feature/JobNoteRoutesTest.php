<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\JobNote;
use App\Models\JobStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JobNoteRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_show_update_and_delete_job_note(): void
    {
        $user = User::create([
            'name' => 'Job Note Tester',
            'email' => 'job-note-tester@example.com',
            'password' => 'password',
        ]);

        $status = JobStatus::create([
            'name' => 'Applied',
            'slug' => 'applied',
            'sort_order' => 0,
        ]);

        $job = Job::create([
            'title' => 'Note Test',
            'company' => 'Test Co',
            'location' => 'Remote',
            'job_status_id' => $status->id,
            'posting_url' => 'https://example.com/job',
            'salary' => '100000',
            'applied_at' => '2025-10-01',
        ]);

        $note = JobNote::create([
            'job_id' => $job->id,
            'body' => 'Original note body',
        ]);

        $note->created_by = $user->id;
        $note->save();

        $this->getJson("/api/jobs/{$job->id}/notes/{$note->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $note->id);

        $this->patchJson("/api/jobs/{$job->id}/notes/{$note->id}", [
            'body' => 'Updated body',
            'reminder_at' => null,
        ])->assertOk()
            ->assertJsonPath('data.body', 'Updated body');

        $this->deleteJson("/api/jobs/{$job->id}/notes/{$note->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('job_notes', ['id' => $note->id]);
    }
}

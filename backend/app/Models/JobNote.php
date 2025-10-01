<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobNote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'job_id',
        'body',
        'pinned',
        'noted_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'job_id' => 'integer',
            'pinned' => 'boolean',
            'noted_at' => 'datetime',
        ];
    }

    /**
     * A job note belongs to a job.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Scope the query to pinned notes.
     */
    public function scopePinned(Builder $query): Builder
    {
        return $query->where('pinned', true);
    }
}
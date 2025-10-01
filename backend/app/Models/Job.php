<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'company',
        'location',
        'job_status_id',
        'posting_url',
        'salary',
        'applied_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'job_status_id' => 'integer',
            'applied_at' => 'date',
        ];
    }

    /**
     * A job belongs to a status.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(JobStatus::class, 'job_status_id');
    }

    /**
     * A job can have many notes.
     */
    public function notes(): HasMany
    {
        return $this->hasMany(JobNote::class);
    }

    /**
     * Scope the query to jobs for a given status.
     */
    public function scopeForStatus(Builder $query, JobStatus|int|string $status): Builder
    {
        if ($status instanceof JobStatus) {
            return $query->where('job_status_id', $status->getKey());
        }

        if (is_numeric($status)) {
            return $query->where('job_status_id', (int) $status);
        }

        return $query->whereHas('status', static function (Builder $builder) use ($status): void {
            $builder->where('slug', $status);
        });
    }
}


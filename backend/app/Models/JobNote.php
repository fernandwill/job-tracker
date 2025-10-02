<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobNote extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'job_id',
        'body',
        'reminder_at',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'job_id' => 'integer',
            'reminder_at' => 'datetime',
            'created_by' => 'integer',
        ];
    }

    /**
     * A job note belongs to a job.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }
}

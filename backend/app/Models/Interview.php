<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'role',
        'scheduled_at',
        'format',
        'location',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];
}

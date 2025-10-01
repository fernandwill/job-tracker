<?php

namespace Database\Seeders;

use App\Models\JobStatus;
use Illuminate\Database\Seeder;

class JobStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Applied',
                'slug' => 'applied',
                'sort_order' => 0,
            ],
            [
                'name' => 'Interviewing',
                'slug' => 'interviewing',
                'sort_order' => 1,
            ],
            [
                'name' => 'Offer',
                'slug' => 'offer',
                'sort_order' => 2,
            ],
            [
                'name' => 'Accepted',
                'slug' => 'accepted',
                'sort_order' => 3,
            ],
            [
                'name' => 'Rejected',
                'slug' => 'rejected',
                'sort_order' => 4,
            ],
        ];

        JobStatus::query()->upsert($statuses, ['slug'], ['name', 'sort_order']);
    }
}

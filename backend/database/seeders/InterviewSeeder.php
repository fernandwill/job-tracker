<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class InterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $startOfWeek = (clone $now)->startOfWeek(Carbon::MONDAY);

        DB::table('interviews')->delete();

        DB::table('interviews')->insert([
            [
                'company' => 'Aurora Systems',
                'role' => 'Senior Product Designer',
                'scheduled_at' => (clone $startOfWeek)->addDays(1)->setTime(9, 30),
                'format' => 'virtual',
                'location' => 'Zoom',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'company' => 'Luma Labs',
                'role' => 'Product Strategist',
                'scheduled_at' => (clone $startOfWeek)->addDays(3)->setTime(13, 0),
                'format' => 'in_person',
                'location' => 'San Francisco HQ',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'company' => 'Northwind Tech',
                'role' => 'Design Manager',
                'scheduled_at' => (clone $startOfWeek)->addDays(7)->setTime(11, 0),
                'format' => 'virtual',
                'location' => 'Google Meet',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}

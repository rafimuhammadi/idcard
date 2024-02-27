<?php

namespace Database\Seeders\auth_sys;

use App\Models\Auth\System;
use Illuminate\Database\Seeder;

class SystemSeeder extends Seeder
{
    public function run(): void
    {
        $systems = [
            [
                'system_name' => 'مدیریت کاربران',
            ]
        ];
        foreach ($systems as $system)
            System::create($system);
    }
}
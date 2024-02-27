<?php

namespace Database\Seeders\auth_sys;

use App\Models\Auth\UserSystem;
use Illuminate\Database\Seeder;

class UserSystemSeeder extends Seeder
{

    public function run(): void
    {
        $userSystems = [
            [
                'user_id' => 1,
                'system_id' => 1,
            ]
        ];

        foreach ($userSystems as $userSystem)
            UserSystem::create($userSystem);
    }
}
<?php

namespace Database\Seeders;

use Database\Seeders\ACU\LanguageSeeder;
use Database\Seeders\auth_sys\PermissionSeeder;
use Database\Seeders\auth_sys\UserSeeder;
use Database\Seeders\auth_sys\SystemSeeder;
use Database\Seeders\auth_sys\UserSystemSeeder;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            UserSeeder::class,
            SystemSeeder::class,
            UserSystemSeeder::class,
        ]);
    }
}
<?php

namespace Database\Seeders\auth_sys;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{

    public function run(): void
    {
        $permissions = [
            [
                'name' => 'create_card',
                'name_dr' => 'ثبت کارت',
                'guard_name' => 'web',
                'system_id' => 1,
            ],
            [
                'name' => 'view_card',
                'name_dr' => 'دیدن کارت',
                'guard_name' => 'web',
                'system_id' => 1,
            ],
            [
                'name' => 'check_card',
                'name_dr' => 'چک کردن کارت',
                'guard_name' => 'web',
                'system_id' => 1,
            ],
            [
                'name' => 'change_status',
                'name_dr' => 'تغیر حالت کاربر',
                'guard_name' => 'web',
                'system_id' => 1,
            ]
        ];
        foreach ($permissions as $permission)
            Permission::create($permission);
    }
}
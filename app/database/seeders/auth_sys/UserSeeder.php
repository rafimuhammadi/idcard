<?php

namespace Database\Seeders\auth_sys;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::create([
            'username' => 'Administrator',
            'name' => 'Rafi Muhammadi',
            'job' => 'System developer',
            'department' => 'Software development',
            'email' => 'admin@web.af',
            'status' => 'active',
            'password' => Hash::make('123456'),
            'created_by' => 1,
            'image' => '',
        ]);
        $role = Role::create([
            'name' => 'Super Admin',
            'guard_name' => 'web',
            'system_id' => 1,
        ]);
        $permissions = Permission::pluck('id')->all();
        $role->syncPermissions($permissions);
        $user->assignRole([$role->id]);
    }
}
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Add additional migration paths
        $this->loadMigrationsFrom([
            database_path('migrations'),
            database_path('migrations/auth_sys'),
            database_path('migrations/ACU'),
            // Add more paths as needed
        ]);
    }
}
<?php

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\ServiceProvider;

return [

    'name' => env('APP_NAME', 'ICC'),

    'env' => env('APP_ENV', 'production'),

    'debug' => (bool) env('APP_DEBUG', false),

    'url' => env('APP_URL', 'http://localhost'),

    'asset_url' => env('ASSET_URL'),

    'timezone' => 'Asia/Kabul',

    'locale' => 'da',

    'fallback_locale' => 'en',

    'faker_locale' => 'en_US',

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    'maintenance' => [
        'driver' => 'file',
        // 'store'  => 'redis',
    ],

    'providers' => ServiceProvider::defaultProviders()->merge([
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
        Jenssegers\Agent\AgentServiceProvider::class,
        Mccarlosen\LaravelMpdf\LaravelMpdfServiceProvider::class,
        Hekmatinasser\Verta\Laravel\VertaServiceProvider::class,

    ])->toArray(),

    'aliases' => Facade::defaultAliases()->merge([
        // 'Example' => App\Facades\Example::class,
        'Agent' => Jenssegers\Agent\Facades\Agent::class,
        'PDF' => Mccarlosen\LaravelMpdf\Facades\LaravelMpdf::class,
        'Verta' => Hekmatinasser\Verta\Verta::class,

    ])->toArray(),

];
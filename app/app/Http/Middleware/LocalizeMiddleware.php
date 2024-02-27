<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class LocalizeMiddleware
{

    public function handle(Request $request, Closure $next): Response
    {
        if (!Session::has('locale'))
            Session::put('locale', Config::get('app.locale'));
        App::setlocale(Session::get('locale'));
        return $next($request);
    }
}
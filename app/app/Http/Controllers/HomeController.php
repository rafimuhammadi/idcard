<?php

namespace App\Http\Controllers;

use App\Models\Auth\System;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $data['systems'] = System::get(['id', 'name_' .  get_locale() . ' as name','icon','route']);
        return view('home', $data);
    }
}

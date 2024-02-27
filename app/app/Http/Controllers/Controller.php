<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public const PER_PAGE = 10;
    public const DEFAULT_SORT_FIELD = 'id';
    public const DEFAULT_SORT_ORDER = 'desc';
    use AuthorizesRequests, ValidatesRequests;
}

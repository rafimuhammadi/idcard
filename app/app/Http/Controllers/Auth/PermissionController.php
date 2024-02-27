<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Auth\System;
use Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use DB;

class PermissionController extends Controller
{
    function __construct()
    {
        $this->middleware('permission:admin-view')->only('index');
        $this->middleware(function ($request, $next) {
            $this->user = Auth::guard('web')->user();
            return $next($request);
        });
    }

    protected function index(Request $request)
    {
        $data['permissions'] = Permission::join('systems', 'systems.id', 'permissions.system_id')
            ->select(
                "permissions.id",
                "permissions.name",
                "systems.name_da as system_name"
            )
            ->when(request()->item, function ($query) {
                $query->where('permissions.name', 'like', '%' . trim(request()->item) . '%');
            })
            ->orderBy('permissions.id', 'DESC')
            ->paginate(10);
        if ($request->ajax() == 1) {
            return view('auth.permissions.list_ajax', $data);
        } else {
            return view('auth.permissions.list', $data);
        }
    }

    protected function create()
    {
        $systems = System::select('id', 'name_da')->get();
        return view('auth.permissions.create', compact('systems'));
    }


    protected function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'systems.*' => 'required',
                'name.*' => 'required|string|max:50'
            ],
            [
                'systems.*.required' => trans('global.selectRequired_', ['name' => trans('global.system')]),
                'name.*.required' => trans('global.rquired_', ['name' => trans('global.permissions_name')])
            ]
        );
        $permissionName = $request->name;
        if ($permissionName) {
            $countPer = count($permissionName);
            for ($i = 0; $i < $countPer; $i++) {
                $record = new Permission;
                $record->name = $request->name[$i];
                $record->system_id = $request->systems[$i];
                $record->guard_name = "web";
                $record->save();
            }
            session()->flash('success', __("auth.success_msg"));
            return response()->json('permission-index');
        }
    }

    protected function destroy($id = 0)
    {
        //Check the User has Access the delete operation or not
        DB::table("permissions")->where('id', $id)->delete();
        session()->flash('success', __("auth.success_msg"));
        return response()->json('permission-index');
    }

    function add_more(Request $request)
    {
        $systems = System::select('id', 'name_da')->get();
        $number = $request->number;
        return view('auth.permissions.add_more', compact('number', 'systems'));
    }

    protected function getPermissionBySystemId($id = 0)
    {
        $permissions = getPermissionsBySystemId($id);
        return response($permissions, 200);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\Authentication\RoleResource;
use App\Models\Auth\System;
use Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Models\Auth\UserSystem;
use DB;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view_card')->only('index');
        $this->middleware('permission:create_card')->only('store');
        $this->middleware(function ($request, $next) {
            $this->user = Auth::guard('web')->user();
            return $next($request);
        });
    }

    protected array $sortFields = ['roles.id', 'roles.name', 'roles.system_id'];
    protected function index(Request $request)
    {
        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder = $request->input('sort_order', self::DEFAULT_SORT_ORDER);

        $query = Role::join('systems', 'systems.id', 'roles.system_id')
            ->select(
                'roles.id',
                'roles.name',
                'systems.system_name as systemName',
            )
            ->orderBy($sortField, $sortOrder)
            ->when(request()->search, function ($query) {
                $query->where('roles.name', 'like', '%' . trim(request()->search) . '%');
            });

        $perPage = $request->input('per_page') ?? self::PER_PAGE;
        $records = $query->paginate((int) $perPage);
        return RoleResource::collection($records);
    }

    protected function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'name' => 'required|unique:roles',
                'system_id' => 'required',
                'permissions' => 'required',
            ],
            [
                'name.required' => trans('words.Required_', ['name' => trans('words.Name')]),
                'name.unique' => trans('words.Unique'),
                'system_id.required' => trans('words.Required_', ['name' => trans('words.System')]),
                'permissions.required' => trans('words.At Least Select One Permission'),
            ]
        );

        $role = Role::create(['guard_name' => 'web', 'name' => $request->name, 'system_id' => $request->system_id]);
        $array = explode(',', $request->permissions);
        $role->syncPermissions($array);
        if ($role) {
            return response([
                'message' => 'ریکارد شما موفقانه ثبت گردید!',
            ], 200);
        } else {
            return response([
                'message' => 'ثبت ریکارد ناموفق بود!',
            ], 401);
        }
    }

    protected function update(Request $request)
    {
        $this->validate(
            $request,
            [
                'id' => 'required:integer',
                'name' => 'required',
                'system_id' => 'required',
                'permissions' => 'required',
            ]
        );

        $role = Role::findOrFail($request->id);
        $role->guard_name = 'web';
        $role->name = $request->name;
        $role->system_id = $request->system_id;
        $role->update();
        $role->revokePermissionTo($role->permissions);
        $array = explode(',', $request->permissions);
        $role->syncPermissions($array);
        if ($role) {
            return response([
                'message' => 'ریکارد شما موفقانه ثبت گردید!',
            ], 200);
        } else {
            return response([
                'message' => 'ثبت ریکارد ناموفق بود!',
            ], 401);
        }
    }

    protected function details(Request $request, $type)
    {
        if ($type == 'details') {
            $data['roles'] = Role::whereIn('system_id', $request->system_id)->get();
            $data['type'] = 'role_details';
        }
        if ($type == 'edit') {
            $data['user_id'] = $request->id;
            $data['roles'] = Role::whereIn('system_id', $request->system_id)->get();
            $data['type'] = 'edit_role_details';
        }
        return view('auth.roles.data', $data);
    }

    #System Routes
    protected function system_details(Request $request)
    {
        function check_user_system($user_id, $system_id)
        {
            $user_system = UserSystem::where('user_id', $user_id)->where('system_id', $system_id)->first();
            if (isset($user_system)) {
                return 'selected';
            }
        }
        $systems = System::get(['id', 'name_' . get_locale() . ' as name']);
        $data = '';
        foreach ($systems as $item) {
            $data .= '<option value="' . $item->id . '" style="direction: ltr !important;" ' . check_user_system($request->id, $item->id) . '>' . $item->name . '</option>';
        }
        return $data;
    }

    #End System Routes
    protected function permission_details(Request $request, $type)
    {
        if ($type == 'store') {
            $data['permission'] = \Illuminate\Support\Facades\DB::table('permissions')
                ->where('system_id', $request->id)->get();
            $data['type'] = $type;
        }
        if (
            $type == 'edit'
        ) {
            $data['permission'] = \Illuminate\Support\Facades\DB::table('permissions')
                ->where('system_id', $request->id)->get();
            $data['type'] = $type;
            $data['role'] = Role::find($request->id);
        }
        return view('auth.roles.data', $data);
    }

    protected function edit($id)
    {
        $roles = Role::find($id);
        $permissions = DB::table('permissions')
            ->join('role_has_permissions', 'role_has_permissions.permission_id', 'permissions.id')
            ->where('role_has_permissions.role_id', $roles->id)
            ->get(['permissions.id', 'permissions.name_dr as name', 'permissions.system_id']);
        return response(
            [
                'roles' => $roles,
                'permissions' => $permissions,
                'rolePermissions' => getPermissionsBySystemId($roles->system_id),
            ],
            200
        );
    }

    protected function getSystem()
    {
        $systems = get_all_systems();
        return response($systems, 200);
    }

    protected function getRolesBySystemId(Request $request)
    {
        $data = bringRolesBySystemId($request->systems_id);
        return response($data, 200);
    }
}
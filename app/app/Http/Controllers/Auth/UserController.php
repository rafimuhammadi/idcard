<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\Authentication\userResource;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Auth\System;
use App\Models\Auth\UserSystem;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use View;
class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view_card')->only('index');
        $this->middleware('permission:create_card')->only('store');
        $this->middleware('permission:create_card')->only('update');
        $this->middleware('permission:create_card')->only('destroy');
        $this->middleware(function ($request, $next) {
            $this->user = Auth::guard('web')->user();
            return $next($request);
        });
    }

    protected function view($id = 0)
    {
        $record = User::select(
                'name',
                'username',
                'job',
                'department',
                'email',
                'image',
                'deleted_at',
            )
            ->where('id', $id)
            ->withTrashed()
            ->first();
        $system = System::join('user_systems', 'user_systems.system_id', 'systems.id')
            ->select(
                'systems.system_name as name',
            )
            ->where('user_systems.user_id', $id)
            ->get();
        $role = Role::join('user_systems', 'user_systems.system_id', 'roles.system_id')
            ->join('model_has_roles', 'model_has_roles.role_id', 'roles.id')
            ->select(
                'roles.id',
                'roles.name',
            )
            ->groupBy('roles.id', 'roles.name')
            ->where('model_has_roles.model_id', $id)
            ->get();
        return response([
            'record' => $record,
            'userSystem' => $system,
            'role' => $role,
        ], 200);
    }

    protected function edit($id = 0)
    {
        $record = User::find($id);
        $userSystem = UserSystem::join('systems', 'systems.id', 'user_systems.system_id')
            ->select(
                'systems.id as value',
                'systems.system_name as label',
            )
            ->where('user_systems.user_id', $id)
            ->get();
        $role = Role::join('user_systems', 'user_systems.system_id', 'roles.system_id')
            ->join('model_has_roles', 'model_has_roles.role_id', 'roles.id')
            ->select(
                'roles.id as value',
                'roles.name as label',
            )
            ->groupBy('roles.id', 'roles.name')
            ->where('model_has_roles.model_id', $id)
            ->get();
        return response([
            'record' => $record,
            'userSystem' => $userSystem,
            'role' => $role,
        ], 200);
    }

    
    protected array $sortFields = ['id', 'name', 'username', 'email', 'status', 'department', 'job'];

    protected function index(Request $request)
    {
        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder = $request->input('sort_order', self::DEFAULT_SORT_ORDER);
        $query = User::select(
                'id',
                'name',
                'username',
                'job',
                'department',
                'email',
                'status',
                'created_at',
                'deleted_at',
            )
            ->orderBy($sortField, $sortOrder)
            ->withTrashed()
            ->when($request->search != '', function ($query) use ($request) {
                return $query->where('name', 'LIKE', '%' . trim($request->search) . '%')
                    ->orWhere('username', 'LIKE', '%' . trim($request->search) . '%');
            })
            ->when($request->searchByJob != '', function ($query) use ($request) {
                return $query->where('job',  trim($request->searchByJob));
            })
            ->when($request->searchByEmail != '', function ($query) use ($request) {
                return $query->where('email',  trim($request->searchByEmail));
            })
            ->when($request->searchByDepartment != '', function ($query) use ($request) {
                return $query->where('department',  trim($request->searchByDepartment));
            });
        $perPage = $request->input('per_page') ?? self::PER_PAGE;
        $records = $query->paginate((int) $perPage);
        return userResource::collection($records);

    }

    protected function create()
    {
        $data['directorates'] = get_directorate();
        $data['provinces'] = get_allProvinces();
        $data['systems'] = get_all_systems();
        return view('auth.user.create', $data);
    }

    protected function store(Request $request)
    {
        $this->validate(
            $request,
            [
                'username' => 'required|unique:users',
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed|min:6',
                'department' => 'required',
                'job' => 'required',
                'system_id' => 'required:array',
                'roles' => 'required:array',
                'image' => $request->file('image') ? 'mimes:jpeg,bmp,jpg,png|max:2000' : '',
                'signature' => $request->file('signature') ? 'mimes:jpeg,bmp,jpg,png|max:2000' : '',
            ]
        );
        DB::beginTransaction();
        try {
            if ($request->file('image')) {
                $imagePath = Storage::disk('attachments')->put('user/' . date('Y') . '/' . date('m'), $request->file('image'));
            }
            
            $user = new User;
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->name = $request->name;
            $user->department = $request->department;
            $user->job = $request->job;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->image = $request->file('image') ? $imagePath : '';
            $user->status = 'active';
            $user->created_by = uid();
            $user->save();
            foreach ($request->system_id as $key => $value) {
                UserSystem::create([
                    'user_id' => $user->id,
                    'system_id' => $request->system_id[$key]
                ]);
            }
            $user->assignRole($request->roles);
            DB::commit();
            if ($user) {
                return response([
                    'message' => 'ریکارد شما موفقانه ثبت گردید!',
                ], 200);
            } else {
                return response([
                    'message' => 'رمز شما موفقانه تغیر نمود!',
                ], 401);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return response('Record not saved please try again!', 200);
        }
    }

    protected function update(Request $request, $id = 0)
    {
        $this->validate(
            $request,
            [
                'username' => 'required|unique:users,username,' . $id,
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => $request->password != '' ? 'required|confirmed|min:6' : '',
                'department' => 'required',
                'job' => 'required',
                'system_id' => 'required:array',
                'roles' => 'required:array',
                'image' => $request->file('image') ? 'mimes:jpeg,bmp,jpg,png|max:2000' : '',
            ]
        );
        DB::beginTransaction();
        try {
            if ($request->file('image')) {
                $imagePath = Storage::disk('attachments')->put('user/' . date('Y') . '/' . date('m'), $request->file('image'));
            }
            $user = User::findOrFail($id);

            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password ? Hash::make($request->password) : $user->password;
            $user->image = $request->file('image') ? $imagePath : $user->image;
            $user->department = $request->department;
            $user->job = $request->job;
            $user->update();
            UserSystem::where('user_id', $user->id)->delete();
            foreach ($request->system_id as $key => $value) {
                UserSystem::create([
                    'user_id' => $user->id,
                    'system_id' => $request->system_id[$key]
                ]);
            }
            foreach ($user->roles as $key => $value) {
                $user->removeRole($value);
            }
            $user->assignRole($request->roles);
            DB::commit();
            // all good
            return response([
                'message' => 'ریکارد شما موفقانه ثبت گردید!',
            ], 200);

        } catch (\Exception $e) {
            DB::rollback();
            // something went wrong
            return response([
                'message' => $e,
            ], 401);
        }
    }


    protected function changeStatus($id = 0, $status = 0)
    {

        $status == 1 ? User::findOrFail($id)->delete() : User::withTrashed()->find($id)->restore();
        return response(
            $status == 1 ? 'User successfully disabled!' : 'User successfully enabled!'
        );
    }

    protected function changePassword(Request $request)
    {
        $this->validate(
            $request,
            [
                'newPassword' => 'required',
                'confirmPassword' => 'required|same:newPassword'
            ],
            [
                'newPassword.required' => "درج رمز جدید ضروری میباشد!",
                'confirmPassword.required' => "درج رمز جدید ضروری میباشد!",
                'confirmPassword.save' => "رمز با تایید رمز مطابقت ندارد!"
            ]
        );
        $user = User::findOrFail(userid());
        $user->password = Hash::make($request->newPassword);
        $user->update();
        return response([
            'status' => true,
            'message' => 'رمز شما موفقانه تغیر نمود!',
        ], 200);
    }
    protected function changeUserImage(Request $request)
    {
        if ($request->has('profile_avatar')) {
            $user = User::findOrFail(auth()->id());
            $img = Storage::disk('user_images')->put(date('Y') . '/' . date('m'), $request->file('profile_avatar'));
            $user->image = $img;
            $user->updated_by = uid();
            $user->update();
            return true;
        } else {
            return false;
        }
    }
   
    protected function bringRolesBySystemId(Request $request)
    {
        if ($request->ajax()) {
            $data = bringRolesBySystemId($request->id);
            return view('reusable-balds.option', compact('data'));
        }
    }

    protected function restore($id = 0)
    {
        User::withTrashed()->find($id)->restore();
        session()->flash('success', __("global.success_msg"));
        return redirect()->route('users');
    }

    protected function authUser()
    {
        if (Auth::user()) {
            $user = User::join('departments', 'departments.id', 'users.department_id')
                ->join('provinces', 'provinces.id', 'users.location_id')
                ->select(
                    'users.id',
                    'users.name',
                    'users.username',
                    'users.email',
                    'users.image',
                    'users.signature',
                    'departments.name_da as departmentName',
                    'provinces.name_dr as provinceName',
                )
                ->where('users.id', userid())
                ->first();
            return json_encode([
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->image,
                'signature' => $user->signature,
                'departmentName' => $user->departmentName,
                'provinceName' => $user->provinceName,
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'role' => $user->roles()->pluck('name'),
                'systems' => user_system(),
            ]);
        } else {
            return response(['message' => 'User not authenticated'], 401);
        }
    }
    public function logout()
    {
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
    protected function changeUserPassword(Request $request, $id = 0)
    {
        $this->validate(
            $request,
            [
                'password' => 'required',
                'password_confirmation' => 'required|same:password'
            ]
        );
        $user = User::findOrFail($id);
        $user->password = Hash::make($request->password);
        $user->update();
        return response([
            'status' => true,
            'message' => 'رمز شما موفقانه تغیر نمود!',
        ], 200);
    }

    protected function print ($id=0)
    {
        $user  = User::find($id);
        // return view('users.print',compact('user'));
        $html = View::make('users.print', compact('user'))->render();

        return response()->json([
            'html' => $html,
        ]);
    }

    protected function check($search = 0)
    {
        $record = User::select(
                'name',
                'username',
                'job',
                'department',
                'email',
                'image',
                'deleted_at',
            )
            ->where('username', $search)
            ->first();
        return response([
            'record' => $record,
        ], 200);
    }

}
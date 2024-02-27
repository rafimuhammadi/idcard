<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Auth;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    protected function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password')) && auth::user()->status == "active") {
            $user = Auth::user();
            $token = $user->createToken("API TOKEN")->plainTextToken;
            $user->roles()->pluck('name')[0];
            return response([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'api_token' => $token,
                'expires_at' => now()->addMinutes(60),
            ], 201);
        }
        return response()->json([
            'status' => false,
            'message' => 'Email & Password does not match with our record.',
        ], 401);
    }

    protected function verify_user(Request $request)
    {
        // $user = $request->user();
        $user = User::select(
                'id',
                'name',
                'job',
                'department',
                'username',
                'email',
                'image',
            )
            ->where('users.id', userid())
            ->first();
        return response([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username,
            'job' => $user->job,
            'department' => $user->department,
            'image' => $user->image,
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'role' => $user->roles()->pluck('name'),
            'systems' => [],
        ], 201);
    }
}
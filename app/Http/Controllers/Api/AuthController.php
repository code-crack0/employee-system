<?php

namespace App\Http\Controllers\Api;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided Email or Password is incorrect'
            ]
            );
        }
        /** @var \App\Models\User $user */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' -> $user,
            'token' -> $token,

        ]);


    }
    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name'=> $data['name'],
            'email'=>$data['email'],
            'password' => bcrypt($data['password']),
            'department' => $data['department'],
            'phoneNumber' => $data['phoneNumber']
            
            

        ]);
        $token = $user -> createToken('main') -> plainTextToken;
        return response([
            'user' => $user,
            'token' => $token,

        ]);
    }
    public function logout(Request $request){
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
// normally i won't include the 'use App\Http\Controllers\Controller;' line if i did not create a new folder for API controllers
use App\Models\User;
use App\Models\Ticle;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api", ["except" => ["login", "register"]]);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'display_name' => 'required|max:15',
            'email' => 'email|required',
            'password' => 'required|confirmed'
        ]);
        
        if(User::where('display_name', $validatedData['display_name'])->exists()){
            return response(['message' => 'Display name already exist'],422);
        }
        if(User::where('email', $validatedData['email'])->exists()){
            return response(['message' => 'Email already exist'],422);
        }
        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response([ 'user' => $user, 'access_token' => $accessToken]);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'Invalid Credentials'],401);
            // return error
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        $response = [
            'user' => auth()->user(), 
            'access_token' => $accessToken
        ];

        return response($response);

    }

    public function logout (Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();

        $response = [
            'message' => "You have been Logged out, successfully!"
        ];
        return response($response);
    }

    public function get_user_with_ticle(Request $request, $id = null){
        $user = $id ? User::with('ticles')->findOrFail($id) : User::with('ticles')->findOrFail($request->user()->id);

        return response($user);
    }
    
    public function get_user(Request $request){
        $user = User::findOrFail($request->user()->id);

        return response($user);
    }

    public function edit_user_profile(Request $request){
        $data = $request->validate([
            'display_name'=>'nullable',
            'bio'=>'nullable',
            'dp'=>'image|nullable|max:1999|mimes:png,jpg,jpeg'
        ]);

        $user = User::findOrFail($request->user()->id);
        if($request->hasFile('dp')){
            $file= $request->file('dp');
            $fileExt = $file->getClientOriginalExtension();
            $fileName = 'user'.$request->user()->id.'_'.'dp';
            $fileNameToStore = $fileName.'.'.$fileExt;
            $path = Env('DP_PATH');

            if( file_exists($path.'\\'.$fileName.'.png') ){
                unlink($path.'\\'.$fileName.'.png');
            }elseif( file_exists($path.'\\'.$fileName.'.jpeg') ){
                unlink($path.'\\'.$fileName.'.jpeg');
            }elseif( file_exists($path.'\\'.$fileName.'.jpg') ){
                unlink($path.'\\'.$fileName.'.jpg');
            }

            $upload = $file->move($path, $fileNameToStore);
            $user->dp = $fileNameToStore;
        }

        $user->display_name = $request->input('display_name');
        $user->bio = $request->input('bio');
        $user->save();

        return response($user);
    }

    public function delete_ticle(Request $request, $ticle_id){
        $ticle = Ticle::findOrFail($ticle_id);
        $userId = $request->user()->id;
        if($userId === $ticle->user_id){
            $ticle->delete();
            $response = [
                "message" => "Ticle has been successfully deleted."
            ];
            return response($response);
        }else{
            $response = [
                "message" => "Not so sure how you got here or what you tryna do, but if you don't get the f!"
            ];
            return response($response, 403);
        }
    }

}

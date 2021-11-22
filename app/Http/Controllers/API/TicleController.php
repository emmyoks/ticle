<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// normally i won't include the 'use App\Http\Controllers\Controller;' line if i did not create a new folder for API controllers
use App\Models\Ticle;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;

class TicleController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api", ["except" => ["index", "search", " get_ticle", "get_ticle_comments"]]);
    }

    public function index($byPopularity = null){
        $ticles = Ticle::with('user:id,display_name,dp')->get();
        
        $response = [...$ticles];
        return response($response);
    }

    public function search($q){

        $searchTerm = $q;
        $result = Ticle::query()->where('title', 'LIKE',"%{$searchTerm}%")
        ->orWhere('body', 'LIKE', "%{$searchTerm}%")->with('user:id,display_name,dp')->get();
        return response($result);
    }

    public function write_ticle(Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            // 'user_id'=>'required',
            'title'=>'required',
            'body'=>'required',
            'cover_img'=>'image|nullable|max:1999'
        ]);

        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }

         // Handle file upload 
        if($request->hasFile('cover_img')){
            // Get image file name with extension
            $file= $request->file('cover_img');
            // $fileName = $request->user_id;
            $fileName = "cover_img";
            // GET only image extension
            $fileExt = $request->file('cover_img')->getClientOriginalExtension();
            // File name store so that there wont be a clash when user upload files of different names
            $fileNameToStore = $fileName.'_'.time().'.'.$fileExt;
            // get a better way to do this
            $path = Env('COVER_IMAGE_PATH');
            $upload = $file->move($path, $fileNameToStore);
        }
        else{
            $fileNameToStore = 'default_cover.jpg';
        }

        // create ticle
        $ticle = new Ticle;
        $ticle->title = $request->input('title');
        $ticle->body = $request->input('body');
        $ticle->user_id = $request->user()->id;
        $ticle->cover_img = $fileNameToStore;
        $ticle->save();

        $response = [
            'success' => 'Ticle stored successfully'
        ];

        return response($response);
    }

    public function get_ticle($id){
        $ticle = Ticle::with('user:id,display_name,dp')->findOrFail($id);

        $response = [];
        return response($ticle);
    }

    // Comment 

    // I was thinking of embeding this in the get_ticle function so that the Ticle data and the comments can be fetched at once but i won't, to reduce the time complexity(Maybe not time complexity but, A user can start reading a Ticle while the comments are loading)
    public function get_ticle_comments($id){
        $comments = Comment::with('user:id,display_name,dp')->where('ticle_id','=',$id)->get();

        if(count($comments) == 0){
            $comments = null ;
        }

        return response($comments);
    }

    public function post_comment(Request $request, $id){
        $data = $request->all();
        $validator = Validator::make($data, [
            'body' =>'required'
        ]);

        $comment = new Comment;
        $comment->user_id = 2;
        $comment->ticle_id = $id;
        $comment->body = $request->input('body');
        $comment->save();
        $comment->user;

        $response = [ ];
        return response($comment);
    }

    public function like_ticle(Request $request, $ticle_id){
        if($request->user()->id){
            $ticle = Ticle::findOrFail($ticle_id);
            $likes = $ticle->likes;
            array_push($likes, $request->user()->id);
            $ticle->likes = $likes;
            $ticle->save();
            return response($ticle);
        }
        else{
            return response([]);
        }
    }

    public function edit_ticle(Request $request){
        $data = $request->all();
        $validator = Validator::make($data, [
            'ticle_id'=>'required',
            'title'=>'required',
            'body'=>'required',
            'cover_img'=>'image|nullable|max:1999'
        ]);

        if($validator->fails()){
            return response(['error' => $validator->errors(), 'Validation Error']);
        }

        $ticle = Ticle::findOrFail($request->input('ticle_id'));
        $userId = $request->user()->id;
        if($userId === $ticle->user_id){
             // Handle file upload 
            if($request->hasFile('cover_img')){
                // Get image file name with extension
                $file= $request->file('cover_img');
                // $fileName = $request->user_id;
                $fileName = "cover_img";
                // GET only image extension
                $fileExt = $file->getClientOriginalExtension();
                // File name store so that there wont be a clash when user upload files of different names
                $fileNameToStore = $fileName.'_'.time().'.'.$fileExt;
                // get a better way to do this
                $path = Env('COVER_IMAGE_PATH');
                
                $upload = $file->move($path, $fileNameToStore);
                    if($request->input('initial_cover_img') != "default_cover.jpg"){
                        if( file_exists($path.'\\'.$request->input('initial_cover_img')) ){
                            unlink($path.'\\'.$request->input('initial_cover_img'));
                        }
                    }
                $ticle->cover_img = $fileNameToStore;
            }

            $ticle->title = $request->input('title');
            $ticle->body = $request->input('body');
            $ticle->save();

            $response = [
                'success' => 'Ticle edited successfully'
            ];

            return response($response);
        }else{
            $response = [
                "message" => "Not so sure how you got here or what you tryna do, but if you don't get the f!"
            ];
            return response($response, 403);
        }
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

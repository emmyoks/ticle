<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TicleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/edit/profile', [AuthController::class, 'edit_user_profile']);
Route::post('/post/ticle', [TicleController::class, 'write_ticle']);
Route::post('/edit/ticle', [TicleController::class, 'edit_ticle']);
Route::post('/post/comment/{id}', [TicleController::class, 'post_comment']);

Route::get('/search/q={q}', [TicleController::class, 'search']);

Route::get('/profile/{id?}', [AuthController::class, 'get_user_with_ticle']);
Route::get('/user', [AuthController::class, 'get_user']);

Route::get('/index/{op?}', [TicleController::class, 'index']);
Route::get('/get/ticle/{id}', [TicleController::class, 'get_ticle']);
Route::get('/get/ticle/comments/{id}', [TicleController::class, 'get_ticle_comments']);

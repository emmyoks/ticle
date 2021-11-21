<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'header_img', 'body', 'likes'
    ];
    
    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function comments() {
        return $this->hasMany('App\Models\Comment');
    }

    protected $casts = [
        'likes' => 'array'
    ];
}

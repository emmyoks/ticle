<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id', 'ticle_id', 'body'
    ];

    public function ticle() {
        return $this->belongsTo('App\Models\Ticle');
    }
    
    public function user() {
        return $this->belongsTo('App\Models\User');
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function initiator(){
        return $this->belongsTo(User::class,'initiator_id','id');
    }

    public function reciever(){
        return $this->belongsTo(User::class,'reciever_id','id');
    }

    public function direct_messages(){
        return $this->hasMany(DirectMessage::class);
    }
}

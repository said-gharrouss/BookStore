<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use  HasApiTokens,HasFactory,SoftDeletes,Notifiable;

    protected $appends = ["role"];

    public function getRoleAttribute($key)
    {
        return "admin";
    }

    protected $hidden = ["password"];

}

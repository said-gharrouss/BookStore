<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        "address_one",
        "address_two",
        "city",
        "state",
        "zip_code",
        "phone_number",
        "user_id",
        "email",
    ];

}

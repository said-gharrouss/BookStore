<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "title",
        "author",
        "description",
        "publisher",
        "genre",
        "language",
        "publication_date",
        "price",
        "page_count",
        "quantity",
        "image",
    ];

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'user_book_favorites');
    }
}

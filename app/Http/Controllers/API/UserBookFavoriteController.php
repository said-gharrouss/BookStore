<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\UserBookFavorite;
use Illuminate\Http\Request;

class UserBookFavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $userId = $request->query('user_id');

        $user = User::find($userId);

        $favorites = $user->favoriteBooks()->get();

        return $favorites;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $book = $request->validate([
            "user_id" => "required",
            "book_id" => "required",
        ]);
        UserBookFavorite::create($book);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $user_id,string $book_id)
    {
        $book = UserBookFavorite::where("user_id",$user_id)->where("book_id",$book_id)->firstOrFail();
        $book->delete();
    }
}

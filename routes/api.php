<?php

use App\Http\Controllers\API\BookController;
use App\Http\Controllers\Api\UserBookFavoriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum',"ability:admin"])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('books', [BookController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('books', BookController::class)->except(['index']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::delete('favorites/{user_id}/{book_id}', [UserBookFavoriteController::class, 'destroy']);
    Route::apiResource('favorites', UserBookFavoriteController::class);
});

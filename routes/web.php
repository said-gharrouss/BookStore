<?php

use App\Http\Controllers\StripeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::post("/checkout",[StripeController::class,"pay"]);

require __DIR__.'/auth.php';



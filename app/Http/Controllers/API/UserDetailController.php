<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserDetailRequest;
use App\Http\Requests\UpdateUserDetailRequest;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;

class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        $user = User::find($userId);

        $details = $user->details()->get();

        return $details;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserDetailRequest $request)
    {
        $user_detail = $request->validated();
        UserDetail::create($user_detail);
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
    public function update(UpdateUserDetailRequest $request,string $id)
    {
        $newUserDetails = $request->validated();

        $user = User::findOrFail($id);

        $userDetails = $user->details;

        $userDetails->update($newUserDetails);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(userdetail $userdetail)
    {
        //
    }
}

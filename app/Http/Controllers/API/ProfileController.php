<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $id = $request->query("user_id");
        $user = User::find($id);
        return $user;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, User $profile)
    {
        $newProfile = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:20'],
            'email' => ['required', 'string', 'email', 'unique:users,email,' . $profile->id],
            'old_password' => ['required', 'string', 'min:8',"max:15"],
            'new_password' => ['nullable','string','min:8','max:15'],
        ]);


        if (!Hash::check($request->old_password, $profile->password)) {
            return response()->json(['message' => 'Current password does not match our records.'], 422);
        }

        if (!is_null($request->new_password)) {
            $newProfile['password'] = Hash::make($newProfile['new_password']);
        } else {
            $newProfile['password'] = Hash::make($request->old_password);
        }

        unset($newProfile['new_password']);
        unset($newProfile['old_password']);

        $profile->update($newProfile);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

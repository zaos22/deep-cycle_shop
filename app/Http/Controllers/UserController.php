<?php

namespace App\Http\Controllers;

use \App\Models\User;

use \Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(User $user){
        $user = User::all();
        $data = $user;
        return json_encode($data);
    }

    public function allUsers()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'DNI' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'role' => ['required', 'string', 'max:255'],
            'password' => ['required']
        ]);

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'DNI' => $request->DNI,
            'phone' => $request->phone,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password)
        ]);
    }

    public function update(Request $request, User $idUser)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users,email,'.$idUser->id],
            'password' => ['min:4', 'max:30'],
            'role' => ['string', 'max:255'],
        ]);

        $idUser->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);
    }

    public function destroy(User $idUser)
    {
        $idUser->delete();
    }
}

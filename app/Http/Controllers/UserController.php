<?php

namespace App\Http\Controllers;

use \App\Models\User;

use \Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(User $user)
    {
        $user = User::all();
        $data = $user;
        return json_encode($data);
    }

    public function allUsers(Request $request)
    {
        // Crear una consulta para obtener todos los usuarios
        $query = User::query();

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $query->where('DNI', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
        }

        // Ejecuta la consulta y obtén los resultados
        $data = $query->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'DNI' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
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
            'lastname' => ['required', 'string', 'max:255'],
            'DNI' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $idUser->id],
            'role' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'min:6'], // Validación para la nueva contraseña
        ]);

        $user = User::find($idUser->id);

        if ($user) {
            $user->name = $request->name;
            $user->lastname = $request->lastname;
            $user->DNI = $request->DNI;
            $user->phone = $request->phone;
            $user->email = $request->email;
            $user->role = $request->role;

            // Verifica si se proporciona una nueva contraseña
            if ($request->has('password') && $request->password != null) {
                $user->password = Hash::make($request->password);
            }

            $user->save();
        }
    }

    public function destroy(User $idUser)
    {
        $idUser->delete();
    }
}

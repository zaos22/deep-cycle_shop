<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use \App\Models\User;

use \Illuminate\Support\Facades\DB;

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
        $query = DB::table('users');

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $query->where('DNI', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
        }

        // Unión para cargar los datos de nómina relacionados
        $query->leftJoin('payrolls', 'users.id', '=', 'payrolls.user_id');

        // Seleccionar los campos de usuario y nómina
        $query->select('users.*', 'payrolls.*');

        // Ejecutar la consulta y obtener los resultados
        $data = $query->get();

        // Devuelve los resultados en formato JSON como respuesta
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
            'password' => ['required', 'string', 'min:6'], // Validación para la nueva contraseña
            'salary' => ['nullable', 'integer'],
            'payday' => ['nullable','date']
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

        $payroll = Payroll::create([
            'salary' => $request->salary,
            'payday' => $request->payday,
            'user_id' => $user->id
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
            'salary' => ['required', 'integer'],
            'payday' => ['date'],
        ]);

        // Actualizar el usuario
        $user = User::find($idUser->id);

        if ($user) {
            $user->update($request->only(['name', 'lastname', 'DNI', 'phone', 'email', 'role']));

            // Verifica si se proporciona una nueva contraseña
            if ($request->has('password') && $request->password !== null) {
                $user->password = Hash::make($request->password);
                $user->save();
            }
        }

        // Actualizar la nómina del usuario
        $payroll = Payroll::where('user_id', $idUser->id)->first();

        if ($payroll) {
            $payroll->update($request->only(['salary', 'payday']));
        }

        // Puedes devolver una respuesta, por ejemplo, un mensaje de éxito
        return response()->json(['message' => 'Usuario y nómina actualizados con éxito']);
    }


    public function destroy(User $idUser)
    {
        $idUser->delete();
    }
}

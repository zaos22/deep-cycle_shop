<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Crear una consulta para obtener todos los usuarios
        $query = Product::query();

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

        $product = Product::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'DNI' => $request->DNI,
            'phone' => $request->phone,
            'email' => $request->email,
            'role' => $request->role,
        ]);
    }

    public function update(Request $request, Product $idProduct)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'DNI' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $idProduct->id],
            'role' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'min:6'], // Validación para la nueva contraseña
        ]);

    }
    public function destroy(Product $idProduct)
    {
        $idProduct->delete();
    }
}

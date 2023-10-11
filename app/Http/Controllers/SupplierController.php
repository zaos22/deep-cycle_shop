<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Support\Facades\DB;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SupplierController extends Controller
{
    public function index()
    {
        $data = DB::table('suppliers')
            ->select(
                'suppliers.id',
                'suppliers.company',
                'suppliers.agent_name',
                'suppliers.agent_lastname',
                'suppliers.phone',
                'suppliers.email',
                'suppliers.ubication'
            )
            ->leftJoin('materials', 'suppliers.id', '=', 'materials.suppliers_id')
            ->selectRaw('materials.id as material, materials.type, materials.price');
        return response()->json($data);
    }

    public function allSuppliers(Request $request)
    {
        $query = DB::table('suppliers')
            ->select(
                'suppliers.id',
                'suppliers.company',
                'suppliers.agent_name',
                'suppliers.agent_lastname',
                'suppliers.phone',
                'suppliers.email',
                'suppliers.ubication'
            )
            ->leftJoin('materials', 'suppliers.id', '=', 'materials.suppliers_id')
            ->selectRaw('materials.id as material, materials.type, materials.price');

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $query->where('suppliers.company', 'like', '%' . $search . '%')
                ->orWhere('suppliers.email', 'like', '%' . $search . '%');
        }
        // Ejecuta la consulta y obtén los resultados
        $data = $query->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'agent_name' => ['required', 'string', 'max:255'],
            'agent_lastname' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . Supplier::class],
            'ubication' => ['required', 'string', 'max:255'],
        ]);

        $supplier = Supplier::create([
            'company' => $request->company,
            'agent_name' => $request->agent_name,
            'agent_lastname' => $request->agent_lastname,
            'phone' => $request->phone,
            'email' => $request->email,
            'ubication' => $request->ubication,
        ]);

        $material = Material::create([
            'type' => $request->type,
            'price' => $request->price,
            'suppliers_id' => $supplier->id,
        ]);
    }

    public function update(Request $request, Supplier $idSupplier, Material $idMaterial)
    {
        $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'agent_name' => ['required', 'string', 'max:255'],
            'agent_lastname' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'integer'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $idSupplier->id],
            'ubication' => ['required', 'string', 'max:255'],
        ]);

        $idSupplier->update([
            'company' => $request->company,
            'agent_name' => $request->agent_name,
            'agent_lastname' => $request->agent_lastname,
            'phone' => $request->phone,
            'email' => $request->email,
            'ubication' => $request->ubication,
        ]);

        $idMaterial->update([
            'type' => $request->type,
            'price' => $request->price,
            'suppliers_id' => $request->suppliers_id,
        ]);
    }

    public function destroy(Supplier $idSupplier)
    {
        // Eliminar el proveedor
        $idSupplier->delete();
    }
}

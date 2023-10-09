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
    public function index(Supplier $supplier)
    {
        $supplier = Supplier::all();
        $data = $supplier;
        return json_encode($data);
    }

    public function allSuppliers()
    {
        $data = DB::table('materials')
            ->select(
                'suppliers.id',
                'suppliers.company',
                'suppliers.agent_name',
                'suppliers.agent_lastname',
                'suppliers.phone',
                'suppliers.email',
                'suppliers.ubication',
                'materials.id as material',
                'materials.type',
                'materials.price',
                'materials.suppliers_id'
            )
            ->join('suppliers', 'materials.suppliers_id', '=', 'suppliers.id')->get();

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
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$idSupplier->id],
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

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\Material;
use App\Models\Supplier;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function index (){
        $materials = Material::all();
        return response()->json($materials);
    }

    public function allMaterials(Request $request, Supplier $idSupplier)
    {
        // Obtén todos los materiales relacionados con el proveedor $idSupplier
        $materials = Material::where('suppliers_id', $idSupplier->id);

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $materials->where(function ($query) use ($search) {
                $query->where('type', 'like', '%' . $search . '%')
                      ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        // Ejecuta la consulta y obtén los resultados
        $data = $materials->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($data);
    }


    public function store(Request $request)
    {

        Material::create([
            'type' => $request->type,
            'price' => $request->price,
            'suppliers_id' => $request->suppliers_id
        ]);
    }

    public function update(Request $request, Material $idMaterial)
    {

        $idMaterial->update([
            'type' => $request->type,
            'price' => $request->price,
        ]);
    }

    public function destroy(Material $idMaterial)
    {
        $idMaterial->delete();
    }
}

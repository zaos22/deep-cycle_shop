<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\Inventory;
use App\Models\Material;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialController extends Controller
{
    public function index()
    {
        $materials = Material::all();
        return response()->json($materials);
    }

    public function allMaterials(Request $request, Supplier $idSupplier)
    {
        $data = DB::table('materials')
            ->leftJoin('inventories', 'inventories.material_id', '=', 'materials.id')
            ->select('materials.*', DB::raw('COALESCE(COUNT(inventories.material_id), 0) as stock'))
            ->groupBy('materials.id')
            ->where('materials.suppliers_id', $idSupplier->id);

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $data->where(function ($query) use ($search) {
                $query->where('materials.type', 'like', '%' . $search . '%')
                    ->orWhere('materials.price', 'like', '%' . $search . '%');
            });
        }

        // Ejecuta la consulta y obtén los resultados
        $result = $data->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($result);
    }


    public function duplicate($idMaterial)
    {
        // Crea 5 filas con el mismo 'product_id'
        for ($i = 0; $i < 5; $i++) {
            Inventory::create([
                'material_id' => $idMaterial,
            ]);
        }

        // Devuelve una respuesta adecuada, por ejemplo:
        return response()->json(['message' => '5 products duplicated']);
    }


    public function used($idMaterial)
    {
        // Elimina una fila donde 'product_id' coincide con $idProduct y limita la eliminación a una fila
        $deletedRows = Inventory::where('material_id', $idMaterial)->limit(5)->delete();

        if ($deletedRows > 0) {
            return response()->json(['message' => 'One product is marked as sold out']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold out']);
        }
    }

    public function usedAll($idMaterial)
    {
        // Elimina todas las filas donde 'product_id' coincide con $idProduct
        $deletedRows = Inventory::where('material_id', $idMaterial)->delete();

        if ($deletedRows > 0) {
            return response()->json(['message' => 'All products are marked as sold out']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold out']);
        }
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

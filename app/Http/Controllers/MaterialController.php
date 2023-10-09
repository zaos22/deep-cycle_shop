<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\Material;
use App\Models\Supplier;
use Illuminate\Http\Request;

class MaterialController extends Controller
{

    public function allMaterials(Supplier $idSupplier)
    {
        // Obtén todos los materiales relacionados con el proveedor $idSupplier
        $materials = Material::where('suppliers_id', $idSupplier->id)->get();

        return $materials;
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

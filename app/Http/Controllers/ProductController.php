<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Montage;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Primera consulta para la tabla 'products'
        $query = DB::table('products')
            ->select(
                'products.id',
                'products.name',
                'products.brand',
                'products.description',
                'products.price',
                'products.num_serie',
                'products.montage_id'
            );

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('brand', 'like', '%' . $search . '%');
        }

        // Ejecuta la consulta y obtén los resultados
        $data = $query->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($data);
    }

    public function moreInfo(Product $idProduct)
    {
        $data = DB::table('products')
            ->leftJoin('montages', 'montages.id', '=', 'products.montage_id')
            ->leftJoin('users', 'montages.user_id', '=', 'users.id')
            ->leftJoin('inventories', 'inventories.product_id', '=', 'products.id')
            ->select('users.name', 'users.lastname', DB::raw('COALESCE(COUNT(inventories.product_id), 0) as stock'))
            ->groupBy('products.id')
            ->where('products.id', $idProduct->id);

        // Ejecuta la consulta y obtén los resultados
        $result = $data->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer'],
            'montage_id' => ['required', 'integer'],
            'num_serie' => ['required', 'string', 'max:255', 'unique:' . Product::class],
        ]);

        $product = Product::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'num_serie' => $request->num_serie,
            'montage_id' => $request->montage_id
        ]);

        Inventory::create([
            'product_id' => $product->id,
        ]);
    }

    public function duplicate($idProduct)
    {
        // Crea 5 filas con el mismo 'product_id'
        for ($i = 0; $i < 5; $i++) {
            Inventory::create([
                'product_id' => $idProduct,
            ]);
        }

        // Devuelve una respuesta adecuada, por ejemplo:
        return response()->json(['message' => '5 products duplicated']);
    }


    public function sell($idProduct)
    {
        // Elimina una fila donde 'product_id' coincide con $idProduct y limita la eliminación a una fila
        $deletedRows = Inventory::where('product_id', $idProduct)->limit(5)->delete();

        if ($deletedRows > 0) {
            return response()->json(['message' => 'One product is marked as sold out']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold out']);
        }
    }

    public function soldout($idProduct)
    {
        // Elimina todas las filas donde 'product_id' coincide con $idProduct
        $deletedRows = Inventory::where('product_id', $idProduct)->delete();

        if ($deletedRows > 0) {
            return response()->json(['message' => 'All products are marked as sold out']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold out']);
        }
    }

    public function storeMaterials(Request $request)
    {
        try {
            Montage::create([
                'user_id' => auth()->user()->id,
                'material_id' => $request->material_id,
                'montage_id' => $request->montage_id,
            ]);
            return response()->json(['id' => 'Success']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error'], 500);
        }
    }

    public function update(Request $request, Product $idProduct)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer'],
            'num_serie' => ['required', 'string', 'max:255', 'unique:products,num_serie,' . $idProduct->id],
        ]);

        $idProduct->update([
            'name' => $request->name,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'num_serie' => $request->num_serie,
        ]);
    }
    public function destroy($productID, $montageID)
    {
        // Buscar el producto por su ID
        $product = Product::find($productID);

        // Buscar el montaje por su ID
        $montage = Montage::find($montageID);

        if ($product && $montage) {
            // Eliminar el producto
            $product->delete();

            // Eliminar el montaje
            $montage->delete();

            return response()->json(['message' => 'Product and Montage deleted successfully']);
        } else {
            return response()->json(['error' => 'Product or Montage not found'], 404);
        }
    }
}

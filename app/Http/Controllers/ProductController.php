<?php

namespace App\Http\Controllers;

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
                'products.num_serie'
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
            ->select('users.name', 'users.lastname', DB::raw('COALESCE(SUM(inventories.product_id), 0) as stock'))
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
            'price' => ['required', 'double'],
            'num_serie' => ['required', 'string', 'max:255', 'unique:' . Product::class],
        ]);

        $product = Product::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'num_serie' => $request->num_serie,
        ]);
    }

    public function update(Request $request, Product $idProduct)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price' => ['required', 'double'],
            'num_serie' => ['required', 'string', 'email', 'max:255', 'unique:products,num_serie,' . $idProduct->id],
        ]);

        $idProduct->update([
            'name' => $request->name,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'num_serie' => $request->num_serie,
        ]);
    }
    public function destroy(Product $idProduct)
    {
        $idProduct->delete();
    }
}

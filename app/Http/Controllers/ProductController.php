<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Bill_lines;
use App\Models\Inventory;
use App\Models\Montage;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    public function checkout(Request $request)
    {
        $selectedProducts = $request->input('selectedProducts');
        $quantities = $request->input('quantities');
        $totalPrice = $request->input('totalPrice');

        // Verifica que haya productos seleccionados y cantidades
        if (empty($selectedProducts) || empty($quantities)) {
            return response()->json(['error' => 'No products selected for checkout'], 400);
        }

        $name = "Factura de " . auth()->user()->name;

        // Crea una nueva factura
        $bill = Bill::create([
            'name' => $name,
            'user_id' => auth()->user()->id,
            'total' => $totalPrice,
        ]);

        // Procesa cada producto seleccionado
        foreach ($selectedProducts as $product) {
            $productId = $product['id'];
            $quantity = $quantities[$productId] ?? 1;

            // Marca los productos como vendidos y crea las líneas de factura
            $this->sellProducts($productId, $quantity, $bill->id);
        }

        return response()->json(['billId' => $bill->id]);
    }

    // Método para marcar productos como vendidos y crear líneas de factura
    private function sellProducts($productId, $quantity, $billId)
    {
        for ($i = 0; $i < $quantity; $i++) {
            $deletedRows = Inventory::where('product_id', $productId)->limit(1)->delete();

            $billLine = Bill_lines::create([
                'unity' => 1,
                'product_id' => $productId,
                'bill_id' => $billId,
            ]);
        }
    }
    public function index(Request $request)
    {
        // Primera consulta para la tabla 'products'
        $query = DB::table('products')
            ->leftJoin('inventories', 'inventories.product_id', '=', 'products.id')
            ->select(
                'products.id',
                'products.name',
                'products.brand',
                'products.description',
                'products.price',
                'products.num_serie',
                'products.image_url',
                'products.montage_id',
                DB::raw('COALESCE(COUNT(inventories.product_id), 0) as stock')
            )->groupBy('products.id');

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
            'image' => ['required', 'image', 'max:2048'],
        ]);

        $imagePath = $request->file('image')->store('public/products');
        $imageUrl = Storage::url($imagePath);

        $product = Product::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'description' => $request->description,
            'price' => $request->price,
            'num_serie' => $request->num_serie,
            'montage_id' => $request->montage_id,
            'image_url' => $imageUrl,
        ]);

        Inventory::create([
            'product_id' => $product->id,
        ]);
    }

    public function duplicate1($idProduct)
    {

        Inventory::create([
            'product_id' => $idProduct,
        ]);

        // Devuelve una respuesta adecuada, por ejemplo:
        return response()->json(['message' => 'The product duplicated']);
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

    public function sell1(Request $request, $idProduct)
    {
        // Elimina una fila donde 'product_id' coincide con $idProduct y limita la eliminación a una fila
        $deletedRows = Inventory::where('product_id', $idProduct)->limit(1)->delete();

        $bill_lines = Bill_lines::create([
            'unity' => $request->unity,
            'product_id' => $idProduct,
            'bill_id' => $request->bill_id,
        ]);

        if ($deletedRows > 0) {
            return response()->json(['message' => 'One product is marked as sold']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold']);
        }
    }

    public function sell($idProduct)
    {
        // Elimina una fila donde 'product_id' coincide con $idProduct y limita la eliminación a una fila
        $deletedRows = Inventory::where('product_id', $idProduct)->limit(5)->delete();

        if ($deletedRows > 0) {
            return response()->json(['message' => 'Five product is marked as sold']);
        } else {
            return response()->json(['message' => 'No matching rows found to mark as sold']);
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
            'price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
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

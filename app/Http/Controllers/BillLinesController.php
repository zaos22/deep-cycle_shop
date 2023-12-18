<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBill_linesRequest;
use App\Http\Requests\UpdateBill_linesRequest;
use App\Models\Bill_lines;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillLinesController extends Controller
{
    public function index(Request $request, $billID)
    {
        // Realiza una consulta en la base de datos para obtener información de las líneas de factura
        $data = DB::table('bill_lines')
            ->leftJoin('materials', 'materials.id', '=', 'bill_lines.material_id')
            ->leftJoin('products', 'products.id', '=', 'bill_lines.product_id')
            ->join('bills', 'bills.id', '=', 'bill_lines.bill_id')
            ->select('bill_lines.id', 'bill_lines.unity', 'bills.name as bill_name','products.name as product_name', 'materials.type as material_name')
            ->where('bill_lines.bill_id', $billID);

        // Obtiene los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $data->where(function ($query) use ($search) {
                $query->where('products.name', 'like', '%' . $search . '%')
                    ->orWhere('materials.type', 'like', '%' . $search . '%');
            });
        }

        // Ejecuta la consulta y obtén los resultados
        $result = $data->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($result);
    }

    public function index2(Request $request, $billID)
    {
        // Realiza una consulta en la base de datos para obtener información de las líneas de factura
        $data = DB::table('bill_lines')
            ->leftJoin('materials', 'materials.id', '=', 'bill_lines.material_id')
            ->leftJoin('products', 'products.id', '=', 'bill_lines.product_id')
            ->join('bills', 'bills.id', '=', 'bill_lines.bill_id')
            ->select('bill_lines.id', 'bill_lines.unity', 'bills.name as bill_name','products.name as product_name', 'materials.type as material_name', 'products.price as price')
            ->where('bill_lines.bill_id', $billID)
            ->where('bills.user_id', auth()->user()->id);

        // Ejecuta la consulta y obtén los resultados
        $result = $data->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($result);
    }


    public function destroy(Bill_lines $idBill)
    {
        $idBill->delete();
    }
}

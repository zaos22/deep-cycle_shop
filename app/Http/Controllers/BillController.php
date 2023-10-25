<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{

    public function index(Request $request)
    {
        $data = DB::table('bills')
            ->join('suppliers', 'suppliers.id', '=', 'bills.suppliers_id')
            ->join('users', 'users.id', '=', 'bills.user_id')
            ->select('bills.id as id', 'bills.name', DB::raw("CONCAT(users.name, ' ', users.lastname) as client"), DB::raw("CONCAT(suppliers.agent_name, ' ', suppliers.agent_lastname) as supplier"), 'bills.created_at as date', 'bills.total');

        // Obtén los parámetros de búsqueda del Request
        $search = $request->input('search');

        // Aplica filtros de búsqueda si se proporcionan
        if (!empty($search)) {
            $data->where(function ($query) use ($search) {
                $query->where('bills.created_at', 'like', '%' . $search . '%')
                    ->orWhere('bills.total', 'like', '%' . $search . '%')
                    ->orWhere('bills.name', 'like', '%' . $search . '%')
                    ->orWhere(DB::raw("CONCAT(users.name, ' ', users.lastname)"), 'like', '%' . $search . '%')
                    ->orWhere(DB::raw("CONCAT(suppliers.agent_name, ' ', suppliers.agent_lastname)"), 'like', '%' . $search . '%');
            });
        }

        // Ejecuta la consulta y obtén los resultados
        $result = $data->get();

        // Devuelve los resultados de la consulta en formato JSON como respuesta
        return response()->json($result);
    }

    public function destroy(Bill $idBill)
    {
        $idBill->delete();
    }
}

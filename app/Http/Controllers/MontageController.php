<?php

namespace App\Http\Controllers;

use App\Models\Montage;
use Illuminate\Http\Request;

class MontageController extends Controller
{

    public function store()
    {
        try {
            $montage = Montage::create([
                'user_id' => auth()->user()->id
            ]);
            return response()->json(['id' => $montage->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el montaje'], 500);
        }
    }

    public function destroy(Montage $montage)
    {
        try {
            $montage->delete();
            return response()->json(['message' => 'Montage deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete montage'], 500); // Código de error 500 para errores internos del servidor
        }
    }
}

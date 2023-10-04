<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill_lines extends Model
{
    protected $fillable = [
        'unity',
        'product_id',
        'user_id',
        'bill_id',
        'material_id'
    ];

}

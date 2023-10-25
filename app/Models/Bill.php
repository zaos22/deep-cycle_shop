<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = [
        'name',
        'total',
        'user_id',
        'suppliers_id'
    ];

}

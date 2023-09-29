<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Montage extends Model
{
    protected $fillable = [
        'material_id',
        'user_id',
    ];

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uslugi extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'doctor_id',
        'usluga_id',
        "price_item",
        // 'code_price',
        // 'name_price',
        // 'amount_price'
    ];

    protected $casts = [
        'price_item' => 'array',
    ];
}

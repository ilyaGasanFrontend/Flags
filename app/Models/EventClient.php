<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventClient extends Model
{
    use HasFactory;

    protected $dates = [
        'start',
        'end'
    ];

    protected $fillable = [
        'title',
        'start',
        'end',
        'start_date',
        'usluga_id',
        'client_id',
        'event_phone',
        'time_min',
        'doctor_id',
        'event_color'
    ];
}

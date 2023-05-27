<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class test extends Model
{
    use HasFactory;

    protected $guarded = [];

    // protected static function booted(): void
    // {
    //     static::creating(function (test $user) {
    //         // return $user->time;
    //     });

    //     static::created(function (test $user) {
    //         // dump('321');
    //     });
    // }
}

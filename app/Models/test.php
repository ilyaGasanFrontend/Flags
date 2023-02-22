<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class test extends Model
{
    // $guarded = [];
    use HasFactory;
    protected $table = 'tests';
    protected $guarded = false;
    // protected $guarded = [] or $fillable['title1', 'title2' ... etc]
    // $fillable = ['x', 'y', 'width', 'height'];

}

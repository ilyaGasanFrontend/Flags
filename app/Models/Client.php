<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'fio',
        'email',
        'phone',
        'comment',
        'gender',
        'marketing',
        'date_birth',
        'street',
        'house',
        'flat',
        'city'
    ];

    public function streets()
    {
        return $this->hasOne(ManualStreet::class, 'id', 'street');
    }

    // связь записи на прием к клиенту
    public function events()
    {
        return $this->hasMany(EventClient::class, 'client_id', 'id');
    }

    // города
    public function citys()
    {
        return $this->hasOne(City::class, 'id', 'city');
    }
}

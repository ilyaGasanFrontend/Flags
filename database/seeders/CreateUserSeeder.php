<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userRoot = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.ru',
            'password' => Hash::make('1qazxsw2'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Role::create([
            'name'=>'root',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $userRoot->assignRole('root');
    }
}

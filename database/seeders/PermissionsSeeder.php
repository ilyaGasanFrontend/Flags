<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'role_create']);
        Permission::create(['name' => 'role_delete']);
        Permission::create(['name' => 'role_show']);
        Permission::create(['name' => 'role_edit']);
    }
}

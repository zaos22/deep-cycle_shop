<?php

namespace Database\Seeders;

use \App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'lastname'=>'Admin',
            'DNI'=> 'X5419870N',
            'phone'=> '617177042',
            'email' => 'admin@dev.com',
            'role'=>'admin',
            'password' => 'r00tr00t',
        ]);
    }
}

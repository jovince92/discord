<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Vince',
            'email' => 'vince',
            'password'=>bcrypt('vince'),
        ]);

        User::factory()->create([
            'name' => 'HHH',
            'email' => 'hhh',
            'password'=>bcrypt('123'),
        ]);
    }
}

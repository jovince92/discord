<?php

namespace Database\Seeders;

use App\Models\Channel;
use App\Models\Message;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MessageTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Factory::create();
        for($i=0;$i<=600;$i++){
            Message::create([
                'user_id'=>User::all()->random()->id,
                'channel_id'=>Channel::all()->random()->id,
                'content'=>$faker->sentence(5),
            ]);
        }
    }
}

<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ServerController;
use App\Models\Member;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::middleware(['auth'])->group(function(){
    
    Route::get('/', function () {
        $server = Member::where('user_id',Auth::id())->first();
        if(!$server){
            return redirect(route('setup'));
        }else{
            return redirect(route('server.index',['server_id'=>$server->server_id]));
        }
        
    })->name('home');

    Route::get('/setup', function () {
        return Inertia::render('SetUp');
    })->name('setup');

    


    Route::prefix('server')->name('server.')->group(function(){
        Route::get('/{server_id}', [ServerController::class, 'index'])->name('index');
        Route::get('invite/{invite_code}', [ServerController::class, 'invite'])->name('invite');
        Route::post('store', [ServerController::class, 'store'])->name('store');
        Route::post('update', [ServerController::class, 'update'])->name('update');
        Route::post('generate', [ServerController::class, 'generate'])->name('generate');
    });

    Route::prefix('member')->name('member.')->group(function(){
        Route::post('/role_change', [MemberController::class, 'role_change'])->name('role_change');
    });
    
});




require __DIR__.'/auth.php';

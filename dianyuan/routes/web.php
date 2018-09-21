<?php

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

Route::get('/', function () {
    return view('welcome');
});

// 路由器设置

//Route::resource('/index','UserController');

Route::get('/index','UserController@index');
Route::post('/create','UserController@create');
Route::post('/mydelete','UserController@delete');
Route::post('/login','UserController@login');
Route::post('/update','UserController@update');

// 业主信息
Route::get('/ownerinfo/index','OwnerController@index');
Route::post('/ownerinfo/create','OwnerController@create');
Route::post('/ownerinfo/update','OwnerController@update');
Route::post('/ownerinfo/delete','OwnerController@delete');
Route::post('/ownerinfo/search','OwnerController@find');

//Lessee租户信息
Route::get('/lesseeinfo/index','LesseeController@index');
Route::post('/lesseeinfo/create','LesseeController@create');
Route::post('/lesseeinfo/update','LesseeController@update');
Route::post('/lesseeinfo/delete','LesseeController@delete');
Route::post('/lesseeinfo/search','LesseeController@find');

// 房源信息
Route::get('/houseinfo/index','HouseController@index');
Route::post('/houseinfo/create','HouseController@create');
Route::post('/houseinfo/update','HouseController@update');
Route::post('/houseinfo/delete','HouseController@delete');
Route::post('/houseinfo/search','HouseController@find');


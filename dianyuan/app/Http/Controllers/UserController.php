<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use App\Model\User;
use DB;

class UserController extends Controller
{
    //

    public function index(){
        $data = User::orderBy('id', 'desc')
                    ->get();
        return response()->json($data);

    }


    public function create(Request $req){

        $data = $req->all();
//        $res = DB::table('userinfo')->insert([$data]);

        $res = User::insert([$data]);

        $data = User::orderBy('id', 'desc')
            ->get();
        return response()->json($data);
    }

    public function delete(Request $req){
        $data =  $req->all('id'); //获取ID
        $res = DB::table('userinfo')->where('id',$data)->delete();
        $data = User::all();
        $data =  $data->toArray();
        $data = array_reverse($data);
        return response()->json($data);
    }


    public function update(Request $req){
        $id =  $req->input('id');
        $data = $req->input('username');

        $res = DB::table('userinfo')->where('id',$id)->update(['username'=>$data]);


        $data = User::orderBy('id', 'desc')
            ->get();
        return response()->json($data);
    }



//    登录
    public function login(Request $req){
        $data = $req->all();
        $users = User::all();

        $status = 'error';

        foreach ($users as $v){
            if($data['userName'] == $v['username'] && $data['password'] == $v['password']){
                $status = 'ok';
                break;
            }
        }

        return response()->json(['status'=>$status,'type'=>'account','currentAuthority'=> "user"]);
    }
}

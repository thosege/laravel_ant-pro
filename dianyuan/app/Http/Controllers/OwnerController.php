<?php

namespace App\Http\Controllers;

use App\Model\Owner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    // 浏览业主信息
    public function index()
    {
        $data = Owner::orderby('ownerid','desc')
                 ->get();

        return response()->json($data);
    }

    // 添加业主信息
    public function create(Request $req)
    {
        $data = $req->all();

        $res = Owner::insert([$data]);

        $data = Owner::orderBy('ownerid', 'desc')
                 ->get();
        return response()->json($data);
    }

    // 修改业主信息
    public function update(Request $req)
    {
        $id =  $req->input('ownerid');
        $data = $req->except('ownerid');

        $res = Owner::where('ownerid',$id)->update($data);

        $data = Owner::orderBy('ownerid', 'desc')
                 ->get();
        return response()->json($data);
    }

    // 删除业主信息
    public function delete(Request $req)
    {
        $id = $req->input('ownerid');

        $res = Owner::where('ownerid',$id)
                ->delete();

        $data = Owner::orderBy('ownerid', 'desc')
                ->get();
        return response()->json($data);
    }

    // 查询业主信息
    public function find(Request $request)
    {
        $req = $request->all();

        $owner = new Owner();

        // $owner为查询构建器实例
        $data = $owner->where(function ($owner) use($req){
            foreach($req as $k=>$v) {
                switch ($k) {
                    case 'ownername':
                        $owner->where('ownername', 'like', '%' . $v . '%');
                        break;
                    case 'sex':
                        $owner->where('sex', 'like', '%' . $v . '%');
                        break;
                    case 'identitycord':
                        $owner->where('identitycord', 'like', '%' . $v . '%');
                        break;
                    case 'ownerphone':
                        $owner->where('ownerphone', 'like', '%' . $v . '%');
                        break;
                }
            }
            })->orderBy('ownerid','desc')
            ->get();

        return response()->json($data);
    }
}

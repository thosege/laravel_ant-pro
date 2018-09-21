<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Lessee;
use DB;

class LesseeController extends Controller
{
    // 浏览业主信息
    public function index()
    {
        $data = Lessee::orderby('lessee_id','desc')
            ->get();

        return response()->json($data);
    }

    // 添加业主信息
    public function create(Request $req)
    {
        $data = $req->all();

        $res = Lessee::insert([$data]);

        $data = Lessee::orderBy('lessee_id', 'desc')
            ->get();
        return response()->json($data);
    }

    // 修改业主信息
    public function update(Request $req)
    {
        $id =  $req->input('lessee_id');
        $data = $req->except('lessee_id');

        $res = Lessee::where('lessee_id',$id)->update($data);

        $data = Lessee::orderBy('lessee_id', 'desc')
            ->get();
        return response()->json($data);
    }

    // 删除业主信息
    public function delete(Request $req)
    {
        $id = $req->input('lessee_id');

        $res = Lessee::where('lessee_id',$id)
            ->delete();

        $data = Lessee::orderBy('lessee_id', 'desc')
            ->get();
        return response()->json($data);
    }

    // 查询业主信息
    public function find(Request $request)
    {
        $req = $request->all();

        $Lessee = new Lessee();

        // $Lessee为查询构建器实例
        $data = $Lessee->where(function ($Lessee) use($req){
            foreach($req as $k=>$v) {
                switch ($k) {
                    case 'lessee_name':
                        $Lessee->where('lessee_name', 'like', '%' . $v . '%');
                        break;
                    case 'lessee_sex':
                        $Lessee->where('lessee_sex', 'like', '%' . $v . '%');
                        break;
                    case 'lessee_identitycord':
                        $Lessee->where('lessee_identitycord', 'like', '%' . $v . '%');
                        break;
                    case 'lessee_phone':
                        $Lessee->where('lessee_phone', 'like', '%' . $v . '%');
                        break;
                }
            }
        })->orderBy('lessee_id','desc')
            ->get();

        return response()->json($data);
    }
}

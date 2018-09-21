<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\House;
use DB;
//引用扩展上传图片
use Storage;

class HouseController extends Controller
{
    // 浏览房源信息
    public function index()
    {
        $data = House::orderby('houseid','desc')
            ->get();

        return response()->json($data);
    }


    // 添加房源信息
    public function create(Request $req)
    {
        // 接受图片数据
        $houseimage = $req->input('houseimage');

        // 设置初始图片文件名
        $HIname = [];
        // 遍历图片数据并上传
        if($houseimage){
            // 选择七牛上传引擎并实例化对象
            $drive = \Storage::drive('qiniu');
            foreach ($houseimage as $k=>$v){
                // 打开文件
                $handle = fopen($v['thumbUrl'], 'r');

                // 设置存储文件名
                // 随机字符串,拼接上传的图片名称
                $uid = str_random(10);;
                $dir = 'dianyuan/' . date('YmdHis', time());
                $imagename = $dir . '/'. $uid;

                // 上传文件
                $drive->writeStream("$imagename", $handle);

                // 七牛上传图片的地址及名称
                $newname = 'http://pfa6pq92y.bkt.clouddn.com/'.$imagename;
                // 将上传图片添加到数组中
                $HIname[] = $newname;
            }
        }

        // 将数组拼接成字符串
        $strurl = implode('@',$HIname);
        // 接受传来的其他数据
        $houseinfo = $req->input('params');

        $houseinfo['housephoto'] = $strurl;

        // 将新建房源信息插入到房源数据表中
        $res = House::insert($houseinfo);

        $data = House::orderBy('houseid', 'desc')
            ->get();
        return response()->json($data);
    }


    // 修改房源信息
    public function update(Request $req)
    {
        // 接受图片数据
        $houseimage = $req->input('houseimage');

        // 设置初始图片文件名来接受图片名
        $HIname = [];

        //  判断是否有图片数据
        if($houseimage){

            // 遍历图片数据并上传
            foreach ($houseimage as $k=>$v){
                //  判断是新上传图片还是原图片
                if(!empty($v['thumbUrl'])){

                    // 选择七牛上传引擎并实例化对象
                    $drive = \Storage::drive('qiniu');
                    // 打开文件
                    $handle = fopen($v['thumbUrl'], 'r');

                    // 设置存储文件名
                    // 随机字符串,拼接上传的图片名称
                    $uid = str_random(10);;
                    $dir = 'dianyuan/' . date('YmdHis', time());
                    $imagename = $dir . '/'. $uid;

                    // 上传文件
                    $drive->writeStream("$imagename", $handle);

                    // 七牛上传图片的地址及名称
                    $newname = 'http://pfa6pq92y.bkt.clouddn.com/'.$imagename;
                    // 将上传图片添加到数组中
                    $HIname[] = $newname;
                }
                if(!empty($v['url'])){
                    $HIname[] = $v['url'];
                }
            }
        }

        // 将数组拼接成字符串
        $strurl = implode('@',$HIname);

        // 接受传来的其他数据
        $houseinfo = $req->input('params');

        $id = $houseinfo['houseid'];
        // 添加图片数据
        $houseinfo['housephoto'] = $strurl;

        // 将修改的房源信息插入到房源数据表中
        $res = House::where('houseid',$id)->update($houseinfo);

        // 获取修改后的数据
        $data = House::orderBy('houseid','desc')->get();

        return response()->json($data);
    }


    // 删除房源信息
    public function delete(Request $req)
    {
        $id = $req->input('houseid');

        $res = House::where('houseid',$id)
            ->delete();

        $data = House::orderBy('houseid', 'desc')
            ->get();
        return response()->json($data);
    }

    // 查询房源信息
    public function find(Request $request)
    {
        $req = $request->all();

        $house = new House();

        // $House为查询构建器实例
        $data = $house->where(function ($house) use($req){
            foreach($req as $k=>$v) {
                switch ($k) {
                    case 'houseaddress':
                        $house->where('houseaddress', 'like', '%' . $v . '%');
                        break;
                    case 'ownername':
                        $house->where('ownername', 'like', '%' . $v . '%');
                        break;
                    case 'housestate':
                        $house->where('housestate', 'like', '%' . $v . '%');
                        break;
                    case 'functionary':
                        $house->where('functionary', 'like', '%' . $v . '%');
                        break;
                }
            }
        })->orderBy('houseid','desc')
            ->get();

        return response()->json($data);
    }
}

<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class HouseImage extends Model
{
    // 房源图片信息表
    public $table = 'houseimage';

    // 字段
    public $fillable = ['house_image_id','houseaddress','house_image_name'];

    // 关闭数据表中有 created_at 和 updated_at 字段
    public $timestamps = false;
}

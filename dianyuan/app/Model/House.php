<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    // 房源信息表
    public $table = 'houseinfo';

    // 字段
    public $fillable = ['houseid','houseaddress','housephoto','ownername','housestate','functionary'];

    // 关闭数据表中有 created_at 和 updated_at 字段
    public $timestamps = false;
}

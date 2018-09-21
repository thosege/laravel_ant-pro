<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Lessee extends Model
{
    // 租户信息表
    public $table = 'lesseeinfo';

    // 填充字段
    public $fillable = ['lessee_rid','lessee_name','lessee_sex','lessee_identitycord','lessee_phone'];

    //关闭数据表中有 created_at 和 updated_at 字段
    public $timestamps = false;
}

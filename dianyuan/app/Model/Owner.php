<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    //业主信息表
    public $table = 'owner';

    public $fillable = ['ownerid','ownername','sex','identitycord','ownerphone'];

    //关闭数据表中有 created_at 和 updated_at 字段
    public $timestamps = false;
}

<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //引入数据表
    public $table = 'userinfo';

    public $fillable = ['id','username','sex','identify','age','phone','password','userphoto'];

//关闭数据表中有 created_at 和 updated_at 字段
    public $timestamps = false;
}

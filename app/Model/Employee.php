<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable=[
      'name', 'email','phone','address','sallary','phone','nid','joining_date'
    ];
    //
}

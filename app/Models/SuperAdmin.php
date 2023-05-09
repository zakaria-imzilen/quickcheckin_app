<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperAdmin extends Model
{
    use HasFactory;

    protected $fillable = [
        "firstName",
        "lastName",
        "pwd",
        "email",
        "auth_code",
        "auth_expiring",
    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'name',
        "price",
        "description",
        "date",
        "location",
        "imageURL",
        "status",
        "placesNumber",
        "type",
        "organizerId",
    ];
    use HasFactory;
}
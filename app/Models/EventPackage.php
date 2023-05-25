<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPackage extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "price",
        "eventId",
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'eventId');
    }
}
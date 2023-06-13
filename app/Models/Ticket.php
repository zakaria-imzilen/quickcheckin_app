<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        "date",
        "packId",
        "eventId",
        "userId",
        "status",
    ];

    public function Event()
    {
        return $this->hasOne(Event::class, 'id', 'eventId');
    }

    public function EventPackage()
    {
        return $this->hasOne(EventPackage::class, 'id', 'packId');
    }
}
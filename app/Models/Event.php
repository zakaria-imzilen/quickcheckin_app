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
        "categoryId",
        "slug",
        "organizerId",
    ];

    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function event_packages()
    {
        return $this->hasMany(EventPackage::class, 'eventId');
    }

    public function Tickets()
    {
        return $this->hasMany(Ticket::class, 'eventId');
    }
}
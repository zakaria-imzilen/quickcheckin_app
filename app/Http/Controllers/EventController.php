<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function display($limit = 10, $skip = 0)
    {
        $event = new Event;

        return $event->get()->skip($skip)->take($limit);
    }

    public function searchEvent(Request $request, $q)
    {
        $result = Event::where('name', 'LIKE', '%' . $q . '%')->get();

        return $result;
    }

    public function addEvent(Request $request)
    {
        $newEvent = Event::create($request->all());
        return $newEvent;
    }

    public function displayEventDetails($eventId)
    {
        $result = Event::where('id', $eventId)->get();

        return $result;
    }

    public function editEvent(Request $request, $id)
    {
        $result = Event::where('id', $id)
            ->update($request->all());
        return $result;
    }

}
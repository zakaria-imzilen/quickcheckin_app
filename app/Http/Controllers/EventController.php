<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventPackage;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function display($limit = 10, $skip = 0)
    {
        $event = new Event;
        $events = $event->get()->skip($skip)->take($limit);

        $toBeReturned = [];
        foreach ($events as $eve) {
            $packResult = EventPackage::where('eventId', $eve['id'])->get();
            $eventObj = [$eve, "packages" => $packResult];

            array_push($toBeReturned, $eventObj);
        }

        return json_encode($toBeReturned);
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
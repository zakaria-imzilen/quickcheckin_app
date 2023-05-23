<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            $categoryResult = Category::where('id', $eve['categoryId'])->get();

            $eventObj = ["event" => $eve, "category" => $categoryResult[0], "packages" => $packResult];

            array_push($toBeReturned, $eventObj);
        }

        return json_encode($toBeReturned);
    }

    public function searchEvent(Request $request, $q)
    {
        $result = Event::where('name', 'LIKE', '%' . $q . '%')->get();

        if (count($result) === 0) {
            $resultDesc = Event::where('description', 'LIKE', '%' . $q . '%')->get();

            if (count($resultDesc) === 0) {
                $resultLoc = Event::where('location', 'LIKE', '%' . $q . '%')->get();
                return $resultLoc;
            }

            return $resultDesc;
        }

        return $result;
    }

    public function addEvent(Request $request)
    {
        $newEvent = Event::create($request->all());

        if (gettype($newEvent->id) == "integer") {
            return json_encode([
                "created" => true
            ]);
        }

        return json_encode([
            "created" => false
        ]);
    }

    public function displayEventDetails($eventId)
    {
        $result = Event::where('id', $eventId)->get();

        if (count($result) === 0) {
            return json_encode([
                "status" => 404
            ]);
        }

        return json_encode($result[0]);
    }

    public function displayEventDetailsBySlug($slug)
    {
        $result = Event::where('slug', $slug)->get();

        if (count($result) === 0) {
            return json_encode([
                "status" => 404
            ]);
        }

        return json_encode($result[0]);
    }

    public function editEvent(Request $request, $id)
    {
        $result = Event::where('id', $id)
            ->update($request->all());

        if ($result === 1) {
            return json_encode([
                "updated" => true
            ]);
        }

        return json_encode([
            "updated" => false
        ]);
    }

    public function displayCategories()
    {
        $categories = Category::get();
        return json_encode($categories);
    }

    public function displayCategoryEvents(Request $request, $categoryId)
    {
        $events = Event::where('categoryId', $categoryId)->get();

        $toBeReturned = [];
        foreach ($events as $event) {
            $packResult = EventPackage::where('eventId', $event['id'])->get();
            $eventObj = ["event" => $event, "packages" => $packResult];

            array_push($toBeReturned, $eventObj);
        }


        return json_encode($toBeReturned);
    }
}
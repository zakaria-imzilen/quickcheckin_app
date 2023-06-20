<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use App\Models\EventPackage;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function display($skip, $limit = 10)
    {
        $events = Event::limit($limit)->offset($skip)->get()->toArray();

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
        $result = [];
        $eventRes = Event::where('name', 'LIKE', '%' . $q . '%')->get()->toArray();
        $resultDesc = Event::where('description', 'LIKE', '%' . $q . '%')->get()->toArray();
        $resultLoc = Event::where('location', 'LIKE', '%' . $q . '%')->get()->toArray();

        $combinedArray = array_merge($eventRes, $resultDesc, $resultLoc);

        // Loop through the combined array
        foreach ($combinedArray as $object) {
            // Check if the object already exists in the result array
            if (!in_array($object, $result)) {
                // Add the unique object to the result array
                $result[] = $object;
            }
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
        $packResult = EventPackage::where('eventId', $result[0]['id'])->get();
        $categoryResult = Category::where('id', $result[0]['categoryId'])->get();

        if (count($result) === 0) {
            return json_encode([
                "status" => 404
            ]);
        }

        return json_encode([
            "event" => $result[0],
            "packages" => $packResult,
            "category" => $categoryResult[0]
        ]);
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

    public function displayCategoryEvents($categoryId, $skip)
    {
        $result = Category::findOrFail($categoryId)->events()->get();
        return array_slice($result->toArray(), $skip);
    }
}
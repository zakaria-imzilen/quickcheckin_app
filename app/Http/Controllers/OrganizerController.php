<?php

namespace App\Http\Controllers;

use App\Models\Organizer;
use Illuminate\Http\Request;

class OrganizerController extends Controller
{
    public function displayAll($limit = 10, $skip = 0)
    {
        $organizers = new Organizer;
        return $organizers->get()->skip($skip)->take($limit);
    }

    public function search($q)
    {
        $resultFN = Organizer::where('firstName', 'LIKE', '%' . $q . '%')->get();

        if (count($resultFN) === 0) {
            $resultLN = Organizer::where('lastName', 'LIKE', '%' . $q . '%')->get();
            return $resultLN;
        }
        return $resultFN;
    }

    public function signUp(Request $request)
    {
        $result = Organizer::create($request->all());

        if (gettype($result->id) === "integer") {
            return json_encode([
                "created" => true,
                "id" => $result
            ]);
        } else {
            return json_encode([
                "created" => false,
            ]);
        }
    }
}
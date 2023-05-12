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

    public function logIn(Request $request)
    {
        $result = Organizer::where('email', $request->email)->where('pwd', $request->pwd)->get();

        if (count($result) > 0) {
            return json_encode([
                "status" => true,
                "data" => [
                    "id" => $result[0]['id'],
                    "firstName" => $result[0]['firstName'],
                    "lastName" => $result[0]['lastName'],
                    "email" => $result[0]['email'],
                    "organizationName" => $result[0]['organizationName'],
                ]
            ]);
        }

        return json_encode([
            "status" => false
        ]);
    }

    public function edit(Request $request)
    {
        $result = Organizer::where('id', $request->id)->update($request->all());

        if ($result === 1) {
            return json_encode([
                "updated" => true,
            ]);
        } else {
            return json_encode([
                "updated" => false,
            ]);
        }
    }
}
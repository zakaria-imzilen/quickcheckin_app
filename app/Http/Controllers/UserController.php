<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signUp(Request $request)
    {
        $result = User::create($request->all());

        if (gettype($result->id) == "integer") {
            $userInfo = User::find($result->id);
            return json_encode([
                "created" => true,
                "info" => $userInfo
            ]);
        }
        return json_encode([
            "created" => false,
        ]);
    }

    public function logIn(Request $request)
    {
        $result = User::where('email', $request->email)->where('pwd', $request->pwd)->get();

        if (count($result) > 0) {
            return json_encode([
                "found" => true,
                'firstName' => $result[0]['firstName'],
                'lastName' => $result[0]['lastName'],
                'email' => $result[0]['email'],
                'pwd' => $result[0]['pwd'],
                'sexe' => $result[0]['sexe'],
                "birthDate" => $result[0]['birthDate'],
                'imageURL' => $result[0]['imageURL'],
            ]);
        }
        return json_encode([
            "found" => false
        ]);
    }

    public function editInfo(Request $request)
    {
        $result = User::where('email', $request->email)->where('pwd', $request->pwd)->where('id', $request->id)->update($request->newData);

        if ($result === 1) {
            return json_encode([
                "updated" => true
            ]);
        }
        return json_encode([
            "updated" => false
        ]);
    }
}
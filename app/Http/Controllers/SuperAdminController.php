<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SuperAdmin;

class SuperAdminController extends Controller
{
    public function generate_auth_code($id)
    {
        $randomCode = rand(1000, 9999);
        $auth_expiring = date('H:i:s', strtotime('+15 minutes'));

        $result = SuperAdmin::where('id', $id)->update(['auth_code' => $randomCode, 'auth_expiring' => $auth_expiring]);

        if ($result === 1) {
            return true;
        } else {
            return false;
        }
    }

    public function login(Request $request)
    {
        // Check if there is a superadmin with the crendentials provided
        $result = SuperAdmin::where('email', $request->email)->where('pwd', $request->pwd)->get();
        // IF SO --> Generate a new Auth_Code
        if (count($result) === 1) {
            if ($this->generate_auth_code($result[0]['id'])) {
                return true;
            } else {
                abort(500, "Something went wrong with generating an authentication code");
            }
        } else {
            return [];
        }
    }

    public function checkCode(Request $request)
    {
        $result = SuperAdmin::where('id', $request->id)->get();
        if (count($result) == 1) {
            // Check the validaty of the code (Expiring date)
            if (
                (strtotime($result[0]['auth_expiring']) - strtotime(now()->format('h:m:i'))) > 50
            ) {
                if ($request->auth_code == $result[0]['auth_code']) {
                    $updateCode = SuperAdmin::where('id', $request->id)->update([
                        'auth_code' => 0,
                        'auth_expiring' => ''
                    ]);

                    if ($updateCode == 1) {
                        return json_encode([
                            'updated' => true
                        ]);
                    } else {
                        return json_encode([
                            'updated' => false
                        ]);
                    }
                }
            }
            return json_encode([
                'updated' => false
            ]);
        } else {
            abort(500, "SuperAdmin doesn't exist");
        }
    }
}
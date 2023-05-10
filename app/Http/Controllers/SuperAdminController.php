<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SuperAdmin;

class SuperAdminController extends Controller
{
    public function login(Request $request)
    {
        // Check if there is a superadmin with the crendentials provided
        // IF SO --> Generate a new Auth_Code
        $result = SuperAdmin::where('email', $request->email)->where('pwd', $request->pwd)->get();
        return $result;
    }

    public function checkCode(Request $request)
    {

    }
}
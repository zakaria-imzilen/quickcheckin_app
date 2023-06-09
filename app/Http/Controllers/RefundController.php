<?php

namespace App\Http\Controllers;

use App\Models\Refund;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function editRefund(Request $request)
    {
        $result = Refund::where('id', $request->id)->update($request->newData);

        if ($result === 1) {
            return json_encode([
                "updated" => true
            ]);
        }
        return json_encode([
            "updated" => false,
            "message" => "Refund record not found"
        ]);
    }
}
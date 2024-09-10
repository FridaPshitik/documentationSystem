<?php
 
namespace App\Http\Controllers;
 
use App\Models\Chirp;
// use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response;
 
class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // return response('Hello, World!');
        return Inertia::render('Chirps/Index', [
            //
        ]);
    }

}
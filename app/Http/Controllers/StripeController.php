<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public $stripe;
    public function __construct()
    {
        $this->stripe = new StripeClient(
            config('services.stripe.secret')
        );

    }

    public function pay(Request $request){
        $books = $request->all();

        $lineItems = [];

        foreach($books as $book){
            $title = $book['item']['title'];
            $price = $book['item']['price'];
            $quantity = $book['quantity'];
            array_push($lineItems,
            [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $title,
                    ],
                    'unit_amount' => $price * 100,
                ],
                'quantity' => $quantity,
            ],);
        }

        foreach ($books as $book) {
            $title = $book['item']['title'];
            $price = $book['item']['price'];
            $quantity = $book['quantity'];
            $_session = $this->stripe->checkout->sessions->create([
                'mode' => 'payment',
                'line_items' => $lineItems,
                'success_url' => 'http://localhost:3000/successpayment',
                'cancel_url' => 'http://localhost:3000/cancel',
            ]);
        }
            return response()->json(['url' => $_session->url]);
    }
}

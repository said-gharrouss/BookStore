<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Webhook;

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
                'success_url' => 'http://localhost:3000/successpayment?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => 'http://localhost:3000/cancel',
            ]);
        }


        return response()->json(['url' => $_session->url, 'sessionId' => $_session->id]);
    }

    public function getPaymentStatus(Request $request)
    {
        $sessionId = $request->input('sessionId');

        // Retrieve the session details from Stripe
        $session = $this->stripe->checkout->sessions->retrieve($sessionId);

        // Check if the payment was successful
        if ($session->payment_status == 'paid') {
            return response()->json(['payment_status' => 'paid']);
        }

        return response()->json(['payment_status' => 'unpaid']);
    }
}

// $validated = $request->validate([
//     'user_id' => 'required|exists:users,id',
//     'items' => 'required|array',
//     'items.*.book_id' => 'required|exists:books,id',
//     'items.*.quantity' => 'required|integer|min:1',
//     'items.*.price' => 'required|numeric|min:0',
//     'total_price' => 'required|numeric|min:0',
// ]);

// $order = Order::create([
//     'user_id' => $validated['user_id'],
//     'total_price' => $validated['total_price'],
// ]);

// foreach ($validated['items'] as $item) {
//     OrderItem::create([
//         'order_id' => $order->id,
//         'book_id' => $item['book_id'],
//         'quantity' => $item['quantity'],
//         'price' => $item['price'],
//     ]);
// }

// {
//     "user_id": 10,
//     "total_price": 1200,
//     "items": [
//         {
//             "book_id": 15,
//             "quantity": 10,
//             "price": 100
//         }
//     ]
// }

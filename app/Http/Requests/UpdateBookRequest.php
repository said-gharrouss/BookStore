<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "required|min:5|max:50",
            "author" => "required|min:5|max:50",
            "description" => "required|min:10|max:255",
            "publisher" => "required|min:5|max:50",
            'genre' => ["required", Rule::in("Art","Fantasy","Travel","Poetry","Biography","Science","Sports","Education")],
            "language" => ["required", Rule::in("EN","FR","AR","SP")],
            "publication_date" => "required",
            'price' => 'required|numeric|min:0',
            'page_count' => 'required|integer|min:1',
            'quantity' => 'required|integer|min:1',
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048"
        ];
    }
}

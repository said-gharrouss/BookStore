<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserDetailRequest extends FormRequest
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
            "user_id" => "required",
            "address_one" => "required|min:10|max:255",
            "address_two" => "nullable|min:10|max:255|different:address_one",
            "city" => "required|min:2|max:30",
            "state" => "nullable",
            "zip_code" => "nullable",
            "phone_number" => "required",
            "email" => "required|email"
        ];
    }
}

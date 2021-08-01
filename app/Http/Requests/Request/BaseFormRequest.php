<?php

namespace App\Http\Requests\Request;

use App\Http\Traits\ValidationResponseTrait;
use Illuminate\Foundation\Http\FormRequest;

class BaseFormRequest extends FormRequest
{
    use ValidationResponseTrait;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}

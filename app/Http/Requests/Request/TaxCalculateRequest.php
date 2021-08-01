<?php

namespace App\Http\Requests\Request;

class TaxCalculateRequest extends BaseFormRequest
{
    public function rules()
    {
        return [
            "name" => 'required',
            "occupation" => 'nullable|string',
            "mobile_number" => 'nullable|string',
            "email" => 'nullable|email',
            "age" => 'required|numeric',
            "gender" => 'required|in:m,f',
            "year_basic" => 'required|numeric',
            "year_house_rent" => 'nullable|numeric',
            "year_medical" => 'nullable|numeric',
            "year_transport" => 'nullable|numeric',
            "year_bonus" => 'nullable|numeric',
            "extra_income" => 'nullable|numeric',
            "total_invest" => 'nullable|numeric',

            "attain_transport" => 'required',
            "in_city" => 'required',
            "ctg_or_dhaka" => 'required',
            "is_freedom_fighter" => 'required',
            "is_disabled" => 'required',
            "has_disabled_child" => 'required',
        ];
    }
}

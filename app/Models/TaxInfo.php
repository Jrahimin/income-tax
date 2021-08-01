<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxInfo extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = [
        'name', 'age', 'gender', 'occupation', 'address', 'tin_no', 'mobile_number', 'email',
        'year_basic', 'year_house_rent', 'year_medical', 'year_transport', 'year_bonus', 'extra_income', 'total_invest',
        'attain_transport', 'in_city', 'ctg_or_dhaka', 'is_freedom_fighter', 'is_disabled', 'has_disabled_child',
        'total_taxable_income', 'payable_income_above_bar', 'tax_on_payable_amount', 'tax_rebate_amount', 'final_income_tax', 'request_data', 'response_data',
    ];
}

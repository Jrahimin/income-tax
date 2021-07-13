<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaxCalculateController extends Controller
{
    /*
        ::Sample Request::
    "name": "Md Ariful",
    "occupation": "Software Engineer",
    "age": 32,
    "gender": "m",
    "is_freedom_fighter": false,
    "is_disabled": false,
    "has_disabled_child": false,
    "bar_taken": false,
    "year_basic": 1500000, (full add)
    "year_bonus": 120000, (full add)
    "extra_income": 150000 (full add)
    "year_house_rent": 800000, ( min(50% or 3lakh) => minus from total house rent )
    "year_medical": 400000, ( min(10% or 1lakhs20k) => minus from total medical )
    "year_transport": 100000, ( for no car facility => won't add upto 30k. for car facility => max(5% or 60k) will be added )
    "attain_transport": false
    "in_city": true ( if false => 3k min )
    "ctg_or_dhaka": true ( true => 5k min. false => 4k min )
    "total_invest": 0
     */

    public function index()
    {
        return view('tax-calculate');
    }

    public function calculate(Request $request)
    {
        // TODO need to about provident fund

        // Taxable income Calculation
        $houseRentTaxable = $this->getHouseRentTaxableAmount($request->year_house_rent);
        $medicalTaxable = $this->getMedicalTaxableAmount($request->year_medical);
        $transportTaxable = $this->getTransportTaxableAmount($request->year_transport, $request->attain_transport);

        $totalTaxableIncome = $request->year_basic + $request->year_bonus + $request->extra_income + $houseRentTaxable + $medicalTaxable + $transportTaxable;

        Log::info("Total taxable income : {$totalTaxableIncome}");

        $taxFreeIncome = $this->getTaxFreeAmount($request);

        if($totalTaxableIncome <= $taxFreeIncome)
            return response()->json(['tax' => 0]);

        $payableAmount = $totalTaxableIncome - $taxFreeIncome;

        Log::info("Tax payable income : {$payableAmount}");

        $taxOnPayableAmount = $this->getTaxAmountOnPayableMoney($payableAmount, $request);

        Log::info("tax on payable money : {$taxOnPayableAmount}");

        $rebateAmount = $this->getTaxRebateAmount($request->total_invest);

        Log::info("total rebate : {$rebateAmount}");

        $finalTaxAmount = $taxOnPayableAmount > $rebateAmount ? $taxOnPayableAmount - $rebateAmount : 0;

        Log::info("Final Income Tax : {$finalTaxAmount}");

        $taxInfo = array(
            "totalTaxableIncome" => $totalTaxableIncome,
            "payableIncomeAboveBar" => $payableAmount,
            "taxOnPayableAmount" => $taxOnPayableAmount,
            "taxRebateAmount" => $rebateAmount,
            "finalIncomeTax" => $finalTaxAmount
        );

        return response()->json($taxInfo);
    }

    protected function getHouseRentTaxableAmount($houseRent)
    {
        if(!$houseRent)
            return 0;

        $amount = $houseRent - min($houseRent*0.5, 300000);

        Log::info("House rent taxable amount: {$amount}");

        return $amount;
    }

    protected function getMedicalTaxableAmount($medicalCost)
    {
        if(!$medicalCost)
            return 0;

        $amount = $medicalCost - min($medicalCost*0.1, 120000);

        Log::info("Medical taxable amount: {$amount}");

        return $amount;
    }

    protected function getTransportTaxableAmount($transportCost, $providedCar)
    {
        if(!$transportCost)
            return 0;

        if($providedCar) {
            return max($transportCost*0.05, 60000);
        }

        $amount = $transportCost - 30000;

        Log::info("Transport taxable amount: {$amount}");

        return $amount > 0 ? $amount : 0;
    }

    protected function getTaxFreeAmount(Request $request)
    {
        $amount = 300000;

        if($request->is_freedom_fighter){
            $amount = 425000;
        } elseif($request->is_disabled){
            $amount = 400000;
        } elseif ($request->age > 65 || $request->gender == 'f'){
            $amount = 350000;
        }

        if($request->has_disabled_child){
            $amount += 25000;
        }

        Log::info("Tax free amount: {$amount}");

        return $amount;
    }

    protected function getTaxAmountOnPayableMoney($payableAmount, Request $request)
    {
        $taxAmount = 0;
        $taxCalculated = false;
        //upto 4lakh
        if($payableAmount <= 400000){
            $taxAmount = $payableAmount*0.1;
            Log::info("within 400000. Payable amount: {$payableAmount}. taxAmount: {$taxAmount}");
            $taxCalculated = true;
        }

        //for next 5lakh
        if(!$taxCalculated && $payableAmount <= 900000){
            $taxAmount = 400000*0.1 + ($payableAmount - 400000)*0.15;
            Log::info("within 900000. Payable amount: {$payableAmount}. taxAmount: {$taxAmount}");
            $taxCalculated = true;
        }

        //for next 6lakh
        if(!$taxCalculated && $payableAmount <= 1500000){
            $taxAmount = 400000*0.1 + 500000*0.15 + ($payableAmount - 900000)*0.2;
            Log::info("within 1500000. Payable amount: {$payableAmount}. taxAmount: {$taxAmount}");
            $taxCalculated = true;
        }

        //for next 30lakh
        if(!$taxCalculated && $payableAmount <= 4500000){
            $taxAmount = 400000*0.1 + 500000*0.15 + 600000*0.2 + ($payableAmount - 1500000)*0.25;
            Log::info("within 4500000. Payable amount: {$payableAmount}. taxAmount: {$taxAmount}");
            $taxCalculated = true;
        }

        //all above
        if(!$taxCalculated){
            $taxAmount = 400000*0.1 + 500000*0.15 + 600000*0.2 + 3000000*0.25 + ($payableAmount - 4500000)*0.30;
            Log::info("Above all bar. Payable amount: {$payableAmount}. taxAmount: {$taxAmount}");
        }

        if($taxAmount > 5000){
            return $taxAmount;
        }

        //minimum tax check
        if(!$request->in_city){
            if($request->ctg_or_dhaka){
                return 5000;
            }

            return 4000;
        }

        return 3000;
    }

    protected function getTaxRebateAmount($investAmount)
    {
        // rebate :: 1st 2.5 lakh = 15%. next 5 lakh 12%. above that 10%

        if($investAmount <= 250000){
            Log::info("Tax rebate investment: {$investAmount}. within 250000");
            return $investAmount*0.15;
        }

        if($investAmount <= 75000){
            Log::info("Tax rebate investment: {$investAmount}. within 750000");
            return 25000*0.15 + ($investAmount - 250000)*0.12;
        }

        Log::info("Tax rebate investment: {$investAmount}. above all bar");

        return 25000*0.15 + 500000*0.12 + ($investAmount - 750000)*0.1;
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaxInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tax_infos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('age');
            $table->string('gender');

            $table->string('occupation')->nullable();
            $table->string('address')->nullable();
            $table->string('tin_no')->nullable();
            $table->string('mobile_number')->nullable()->index();
            $table->string('email')->nullable()->index();

            $table->float('year_basic',14,4);
            $table->float('year_house_rent',12,4)->nullable();
            $table->float('year_medical',12,4)->nullable();
            $table->float('year_transport',12,4)->nullable();
            $table->float('year_bonus',12,4)->nullable();
            $table->float('extra_income',14,4)->nullable();
            $table->float('total_invest',12,4)->nullable();

            $table->tinyInteger('attain_transport')->default(0);
            $table->tinyInteger('in_city')->default(0);
            $table->tinyInteger('ctg_or_dhaka')->default(0);
            $table->tinyInteger('is_freedom_fighter')->default(0);
            $table->tinyInteger('is_disabled')->default(0);
            $table->tinyInteger('has_disabled_child')->default(0);

            $table->float('total_taxable_income',14,4)->nullable();
            $table->float('payable_income_above_bar',14,4)->nullable();
            $table->float('tax_on_payable_amount',14,4)->nullable();
            $table->float('tax_rebate_amount',14,4)->nullable();
            $table->float('final_income_tax',14,4)->nullable();

            $table->json('request_data')->nullable();
            $table->json('response_data')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tax_infos');
    }
}

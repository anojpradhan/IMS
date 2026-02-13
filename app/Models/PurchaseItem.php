<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model
{
    protected $fillable = [
        'purchase_id',
        'product_id',
        'quantity',
        'payment_status',
        'purchase_price',
        'is_active',

        'remain_amount'
    ];

    // Relationships

    // belongings to whihc purchase 
    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }


    // products inn items 
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

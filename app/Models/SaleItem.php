<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    use HasFactory;

    protected $table = 'sale_items';

    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'sale_price',
        'remain_amount',
        'is_active',
        'payment_status',
    ];


    // Relationships

    // Sale item belongs to a sale
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    // Sale item belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';

    protected $fillable = [
        'organization_id',
        'customer_id',
        'invoice_number',
        'sale_date',
        'total_amount',
        'remain_amount',
        'payment_status',
    ];

        protected $casts = [
        'sale_date' => 'date:Y-m-d',
    ];

    // Relationships

    // A sale belongs to a customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // A sale has many sale items
    public function items()
    {
        return $this->hasMany(SaleItem::class, 'sale_id');
    }
}

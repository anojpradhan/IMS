<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{

    protected $casts = [
        'purchase_date' => 'date:Y-m-d',
    ];

    protected $fillable = [
        'organization_id',
        'supplier_id',
        'invoice_number',
        'purchase_date',
        'total_amount',
        'remain_amount',
        'payment_status',
    ];

    // Relationships

    // supplier of purchase 
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // organization related with this purchase 
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    // items in the purchases 
    public function items()
    {
        return $this->hasMany(PurchaseItem::class);
    }
}

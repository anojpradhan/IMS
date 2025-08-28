<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{

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
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
    public function items()
    {
        return $this->hasMany(PurchaseItem::class);
    }
}

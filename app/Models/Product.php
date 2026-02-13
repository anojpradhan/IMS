<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategory_id',
        'name',
        'description',
        'selling_price',
        'buying_price',
        'quantity',
    ];

    // subcategories 
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class, 'subcategory_id');
    }

    // purchased items in each purchases 
    public function purchaseItems()
    {
        return $this->hasMany(PurchaseItem::class);
    }
    // sales items in each sales 
    public function salesItems()
    {
        return $this->hasMany(SaleItem::class);
    }
}

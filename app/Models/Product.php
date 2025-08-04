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

    /**
     * Relationship: Product belongs to a Subcategory (Category with parent_id != null)
     */
    public function subcategory()
    {
        return $this->belongsTo(Category::class, 'subcategory_id');
    }
}

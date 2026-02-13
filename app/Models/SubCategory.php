<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $table = 'subcategories';
    protected $fillable = [
        'category_id',
        'name',
    ];

    // Relationships

    // which category it belongs to 
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // producrs with in subcategory 
    public function products()
    {
        return $this->hasMany(Product::class, 'subcategory_id');
    }
}

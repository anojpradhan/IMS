<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = [
        'name',
        'organization_id',
        'description',
        'created_at',
    ];

    // sub category relationships
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    protected $fillable = [
        'name',
        'description',
        'created_at',
    ];

    public function subcategory()
            {
        return $this->hasMany(Subcategory::class);
    }
    
}

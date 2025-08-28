<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
        protected $fillable = [
        'organization_id',
        'name',
        'contact_person',
        'phone',
        'email',
        'address',
    ];

    // Relationships
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
    public function purchases()
    {
        return $this->hasMany(Supplier::class);
    }
}

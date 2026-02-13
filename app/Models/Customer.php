<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'organization_id',
        'name',
        'contact_person',
        'phone',
        'email',
        'address',
    ];

    // organization relationships
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
    // sales relationships
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

}

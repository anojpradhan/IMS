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

    /**
     * Get the organization that owns the customer.
     */
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

}

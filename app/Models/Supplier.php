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

    // which org suppliers is with 
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    //  purchase which with it is related 
    public function purchases()
    {
        return $this->hasMany(Supplier::class);
    }
}

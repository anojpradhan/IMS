<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'name',
        'description',
    ];


    // related to orgs 
    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    // user with role 
    public function users()
    {
        return $this->hasMany(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'created_by',
    ];

    // creator user 
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // all the users in orgs 
    public function users()
    {
        return $this->hasMany(User::class);
    }

    // all the suppliers 
    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }

    // all the customers 
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    // all purchases in 
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}

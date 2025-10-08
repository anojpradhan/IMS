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

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}

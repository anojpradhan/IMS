<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add foreignId columns
            $table->foreignId('organization_id')
                  ->nullable()
                  ->after('id')
                  ->constrained('organizations')
                  ->nullOnDelete();

            $table->foreignId('role_id')
                  ->nullable()
                  ->after('organization_id')
                  ->constrained('roles')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->dropForeign(['role_id']);
            $table->dropColumn(['organization_id', 'role_id']);
        });
    }
};



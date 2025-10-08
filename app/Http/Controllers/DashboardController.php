<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Subcategory;
use App\Models\Supplier;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $organization = null;
        $organizationData = null;

        if ($user->organization_id) {
            $organizationId = $user->organization_id;
            $organization = Organization::find($organizationId);

            /**
             * 🧮 PRODUCT COUNT (via Category → Subcategory → Product)
             */
            $productCount = Product::whereIn('subcategory_id', function ($query) use ($organizationId) {
                $query->select('id')
                    ->from('subcategories')
                    ->whereIn('category_id', function ($q) use ($organizationId) {
                        $q->select('id')
                            ->from('categories')
                            ->where('organization_id', $organizationId);
                    });
            })->count();

            /**
             * 🥧 PIE CHART: Product distribution by Category
             */
            $pieData = Category::where('organization_id', $organizationId)
                ->select('categories.name as name')
                ->selectSub(function ($query) {
                    $query->from('products')
                        ->join('subcategories', 'products.subcategory_id', '=', 'subcategories.id')
                        ->whereColumn('subcategories.category_id', 'categories.id')
                        ->selectRaw('COUNT(products.id)');
                }, 'value')
                ->get();

            /**
             * 💰 SALES & PURCHASES TOTALS
             */
            $salesSummary = [
                'total_amount' => Sale::where('organization_id', $organizationId)->sum('total_amount'),
                'remain_amount' => Sale::where('organization_id', $organizationId)->sum('remain_amount'),
            ];

            $purchaseSummary = [
                'total_amount' => Purchase::where('organization_id', $organizationId)->sum('total_amount'),
                'remain_amount' => Purchase::where('organization_id', $organizationId)->sum('remain_amount'),
            ];

            $supplierCount = Supplier::where('organization_id', $organizationId)->count();

            /**
             * 📊 BAR CHART: Monthly Totals for Last 3 Years
             */
            $currentYear = now()->year;
            $years = [$currentYear, $currentYear - 1, $currentYear - 2];
            $barData = [];

            foreach ($years as $year) {
                $monthlyData = [];

                for ($i = 1; $i <= 12; $i++) {
                    $month = date('M', mktime(0, 0, 0, $i, 10));

                    // Sales per month
                    $salesTotal = Sale::where('organization_id', $organizationId)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $i)
                        ->sum('total_amount');

                    $salesRemain = Sale::where('organization_id', $organizationId)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $i)
                        ->sum('remain_amount');

                    // Purchases per month
                    $purchaseTotal = Purchase::where('organization_id', $organizationId)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $i)
                        ->sum('total_amount');

                    $purchaseRemain = Purchase::where('organization_id', $organizationId)
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $i)
                        ->sum('remain_amount');

                    $monthlyData[] = [
                        'month' => $month,
                        'year' => $year,
                        'sales' => [
                            'total' => $salesTotal,
                            'paid' => $salesTotal - $salesRemain,
                            'remain' => $salesRemain,
                        ],
                        'purchases' => [
                            'total' => $purchaseTotal,
                            'paid' => $purchaseTotal - $purchaseRemain,
                            'remain' => $purchaseRemain,
                        ],
                    ];
                }

                $barData[$year] = $monthlyData;
            }

            /**
             * 🧩 FINAL DASHBOARD STATS
             */
            $stats = [
                [
                    'label' => 'Products',
                    'value' => $productCount,
                ],
                [
                    'label' => 'Sales',
                    'value' => $salesSummary['total_amount'],
                    'paid' => $salesSummary['total_amount'] - $salesSummary['remain_amount'],
                    'remain' => $salesSummary['remain_amount'],
                ],
                [
                    'label' => 'Purchases',
                    'value' => $purchaseSummary['total_amount'],
                    'paid' => $purchaseSummary['total_amount'] - $purchaseSummary['remain_amount'],
                    'remain' => $purchaseSummary['remain_amount'],
                ],
                [
                    'label' => 'Suppliers',
                    'value' => $supplierCount,
                ],
            ];

            $organizationData = [
                'stats' => $stats,
                'pieData' => $pieData,
                'barData' => $barData,
                'availableYears' => $years,
            ];
        }

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'organization' => $organization,
            'organizationData' => $organizationData,
        ]);
    }
}

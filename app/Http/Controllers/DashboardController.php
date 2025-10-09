<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Subcategory;
use App\Models\Supplier;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

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
            $productCount = Product::whereIn('subcategory_id', function ($query) use ($organizationId) {
                $query->select('id')
                    ->from('subcategories')
                    ->whereIn('category_id', function ($q) use ($organizationId) {
                        $q->select('id')
                            ->from('categories')
                            ->where('organization_id', $organizationId);
                    });
            })->count();


            $pieDataCategory = Category::where('organization_id', $organizationId)
                ->select('categories.id', 'categories.name')
                ->selectSub(function ($query) {
                    $query->from('products')
                        ->join('subcategories', 'products.subcategory_id', '=', 'subcategories.id')
                        ->whereColumn('subcategories.category_id', 'categories.id')
                        ->selectRaw('COUNT(products.id)');
                }, 'value')
                ->get();

            $pieDataSubcategory = Subcategory::whereIn('category_id', function ($query) use ($organizationId) {
                $query->select('id')->from('categories')->where('organization_id', $organizationId);
            })
                ->select('subcategories.id', 'subcategories.name')
                ->selectSub(function ($query) {
                    $query->from('products')
                        ->whereColumn('products.subcategory_id', 'subcategories.id')
                        ->selectRaw('COUNT(products.id)');
                }, 'value')
                ->get();


            $salesSummary = [
                'total_amount' => Sale::where('organization_id', $organizationId)->sum('total_amount'),
                'remain_amount' => Sale::where('organization_id', $organizationId)->sum('remain_amount'),
            ];

            $purchaseSummary = [
                'total_amount' => Purchase::where('organization_id', $organizationId)->sum('total_amount'),
                'remain_amount' => Purchase::where('organization_id', $organizationId)->sum('remain_amount'),
            ];

            $supplierCount = Supplier::where('organization_id', $organizationId)->count();
            $customerCount = Customer::where('organization_id', $organizationId)->count();
            $minSaleYear = Sale::where('organization_id', $organizationId)->min('sale_date');
            $minPurchaseYear = Purchase::where('organization_id', $organizationId)->min('purchase_date');

            $earliestDate = Carbon::parse(min($minSaleYear ?? now(), $minPurchaseYear ?? now()));
            $startYear = $earliestDate->year;
            $currentYear = now()->year;

            $availableYears = range($startYear, $currentYear);

            $barData = [
                'yearly' => [],
                '6months' => [],
                '3months' => [],
            ];

            foreach ($availableYears as $year) {
                $monthlyData = [];
                for ($i = 1; $i <= 12; $i++) {
                    $monthName = date('M', mktime(0, 0, 0, $i, 10));

                    $salesTotal = Sale::where('organization_id', $organizationId)
                        ->whereYear('sale_date', $year)
                        ->whereMonth('sale_date', $i)
                        ->sum('total_amount');

                    $salesRemain = Sale::where('organization_id', $organizationId)
                        ->whereYear('sale_date', $year)
                        ->whereMonth('sale_date', $i)
                        ->sum('remain_amount');

                    $purchaseTotal = Purchase::where('organization_id', $organizationId)
                        ->whereYear('purchase_date', $year)
                        ->whereMonth('purchase_date', $i)
                        ->sum('total_amount');

                    $purchaseRemain = Purchase::where('organization_id', $organizationId)
                        ->whereYear('purchase_date', $year)
                        ->whereMonth('purchase_date', $i)
                        ->sum('remain_amount');

                    $monthlyData[] = [
                        'month' => $monthName,
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

                $barData['yearly'][$year] = $monthlyData;
            }

            $sixMonthsAgo = now()->subMonths(6);
            $barData['6months'] = $this->getPeriodData($organizationId, $sixMonthsAgo, now(), 'sale_date', 'purchase_date');

            $threeMonthsAgo = now()->subMonths(3);
            $barData['3months'] = $this->getPeriodData($organizationId, $threeMonthsAgo, now(), 'sale_date', 'purchase_date');


            $stats = [
                ['label' => 'Products', 'value' => $productCount],
                ['label'=>"Customers",'value'=>$customerCount],
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
                ['label' => 'Suppliers', 'value' => $supplierCount],
            ];

            $organizationData = [
                'stats' => $stats,
                'pieData' => [
                    'category' => $pieDataCategory,
                    'subcategory' => $pieDataSubcategory,
                ],
                'barData' => $barData,
                'availableYears' => $availableYears,
            ];
        }

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'organization' => $organization,
            'organizationData' => $organizationData,
        ]);
    }


    private function getPeriodData($organizationId, $startDate, $endDate, $saleCol, $purchaseCol)
    {
        $periodData = [];

        $period = new \DatePeriod(
            $startDate->copy()->startOfMonth(),
            \DateInterval::createFromDateString('1 month'),
            $endDate->copy()->endOfMonth()->addMonth()
        );

        foreach ($period as $dt) {
            $dt = Carbon::instance($dt);

            $month = $dt->format('M');
            $year = $dt->format('Y');

            $salesTotal = Sale::where('organization_id', $organizationId)
                ->whereBetween($saleCol, [$dt->copy()->startOfMonth(), $dt->copy()->endOfMonth()])
                ->sum('total_amount');

            $salesRemain = Sale::where('organization_id', $organizationId)
                ->whereBetween($saleCol, [$dt->copy()->startOfMonth(), $dt->copy()->endOfMonth()])
                ->sum('remain_amount');

            $purchaseTotal = Purchase::where('organization_id', $organizationId)
                ->whereBetween($purchaseCol, [$dt->copy()->startOfMonth(), $dt->copy()->endOfMonth()])
                ->sum('total_amount');

            $purchaseRemain = Purchase::where('organization_id', $organizationId)
                ->whereBetween($purchaseCol, [$dt->copy()->startOfMonth(), $dt->copy()->endOfMonth()])
                ->sum('remain_amount');

            $periodData[] = [
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
        return $periodData;
    }
}

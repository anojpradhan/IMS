import { Head, usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    // --- Static demo data (replace later with real data) ---
    const stats = [
        { label: "Products", value: 120 },
        { label: "Suppliers", value: 15 },
        { label: "Sales", value: 340 },
        { label: "Purchases", value: 220 },
    ];

    const pieData = [
        { name: "Electronics", value: 40 },
        { name: "Clothing", value: 25 },
        { name: "Groceries", value: 20 },
        { name: "Others", value: 15 },
    ];
    const COLORS = ["#2563EB", "#DC2626", "#16A34A", "#F59E0B"];

    const barData = [
        { month: "Jan", sales: 30, purchases: 20 },
        { month: "Feb", sales: 40, purchases: 25 },
        { month: "Mar", sales: 35, purchases: 30 },
        { month: "Apr", sales: 50, purchases: 40 },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <main className="flex-1 p-6 flex flex-col gap-8">
                    {user?.organization_id ? (
                        <>
                            {/* Welcome Card */}
                            <div className="bg-white shadow rounded-xl p-6">
                                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                                    Welcome to IMS Dashboard
                                </h3>
                                <p className="text-gray-700">
                                    Manage your inventory data with real-time
                                    insights.
                                </p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white shadow-md rounded-xl p-5 text-center hover:shadow-lg transition"
                                    >
                                        <h4 className="text-xl font-bold text-blue-700">
                                            {item.value}
                                        </h4>
                                        <p className="text-gray-600">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Graphs Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Pie Chart */}
                                <div className="bg-white shadow-md rounded-xl p-6">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">
                                        Products by Category
                                    </h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                dataKey="value"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Bar Chart */}
                                <div className="bg-white shadow-md rounded-xl p-6">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">
                                        Monthly Sales vs Purchases
                                    </h4>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={barData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="sales" fill="#2563EB" />
                                            <Bar dataKey="purchases" fill="#DC2626" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Organization Button */}
                            <div className="flex justify-center mt-8">
                                <Link
                                    href={route("organizations.edit")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                                >
                                    Your Organization
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center flex-1">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                No Organization Found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Please create an organization to get started.
                            </p>

                            <Link
                                href={route("organizations.create")}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105"
                            >
                                Create Organization
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

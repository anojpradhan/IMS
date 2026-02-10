import React, { useState, useRef, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
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
    Legend,
} from "recharts";
import { Package, Building2, X, ChartPie, BarChart2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Button } from "@headlessui/react";

export default function Dashboard() {
    const { auth, organization, organizationData } = usePage().props;
    const user = auth?.user;

    const hasOrgData =
        !!organizationData && typeof organizationData === "object";
    const availableYears =
        hasOrgData && Array.isArray(organizationData.availableYears)
            ? organizationData.availableYears
            : [new Date().getFullYear()]; // fallback to current year if null

    const [viewBy, setViewBy] = useState("category");
    const [selectedPeriod, setSelectedPeriod] = useState("yearly");
    const [selectedYear, setSelectedYear] = useState(
        availableYears[availableYears.length - 1],
    );

    const userName = user?.name || "User";

    //  Prevent crash if pieData or barData missing
    const pieData =
        hasOrgData &&
        organizationData?.pieData?.[viewBy] &&
        organizationData.pieData[viewBy].length
            ? organizationData.pieData[viewBy]
            : [];

    const COLORS = [
        "#2563EB",
        "#DC2626",
        "#16A34A",
        "#F59E0B",
        "#9333EA",
        "#14B8A6",
        "#8B5CF6",
    ];

    const [showModal, setShowModal] = useState(false);

    const getBarChartData = () => {
        if (!hasOrgData || !organizationData.barData) return [];

        let data = [];
        if (selectedPeriod === "yearly") {
            data =
                organizationData.barData.yearly?.[String(selectedYear)] ||
                organizationData.barData[String(selectedYear)] ||
                [];
        } else if (selectedPeriod === "6months") {
            data = organizationData.barData["6months"] || [];
        } else if (selectedPeriod === "3months") {
            data = organizationData.barData["3months"] || [];
        }

        return data.map((item) => ({
            month: item.month,
            salesTotal: Number(item.sales?.total || 0),
            purchasesTotal: Number(item.purchases?.total || 0),
            year: item.year,
        }));
    };

    const formattedBarData = getBarChartData();

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="p-6 md:p-10 bg-gray-50 min-h-screen flex flex-col gap-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-600"
                >
                    <h2 className="text-2xl font-bold text-blue-700">
                        Welcome, {userName}
                    </h2>
                    <p className="text-gray-600 mt-1">
                        {user?.organization_id
                            ? "Here’s your inventory overview and insights."
                            : "Let’s set up your organization to get started."}
                    </p>
                </motion.div>

                {user?.organization_id && hasOrgData ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
                            {organizationData.stats.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white shadow-md rounded-xl p-5 text-center border hover:shadow-lg transition"
                                >
                                    <h4 className="text-2xl font-bold text-blue-700">
                                        {item.value}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {item.label}
                                    </p>

                                    {(item.label === "Sales" ||
                                        item.label === "Purchases") && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            <p>
                                                Paid:{" "}
                                                <span className="text-green-600 font-semibold">
                                                    {item.paid}
                                                </span>
                                            </p>
                                            <p>
                                                Remain:{" "}
                                                <span className="text-red-600 font-semibold">
                                                    {item.remain}
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white shadow-md rounded-2xl p-6 border flex flex-col gap-4"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <ChartPie className="w-5 h-5 text-blue-600" />
                                        Product Distribution by{" "}
                                        {viewBy === "category"
                                            ? "Category"
                                            : "Subcategory"}
                                    </h3>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={
                                                viewBy === "category"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            className="rounded-xl px-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 text-green-600"
                                            onClick={() =>
                                                setViewBy("category")
                                            }
                                        >
                                            Category
                                        </Button>
                                        <Button
                                            variant={
                                                viewBy === "subcategory"
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            className="rounded-xl px-1 hover:cursor-pointer bg-gray-200 hover:bg-gray-300 text-green-600"
                                            onClick={() =>
                                                setViewBy("subcategory")
                                            }
                                        >
                                            Subcategory
                                        </Button>
                                    </div>
                                </div>

                                <div className="w-full h-[300px] sm:h-[350px]">
                                    {pieData.length > 0 ? (
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius="50%"
                                                    labelLine={false}
                                                    label={({
                                                        name,
                                                        percent,
                                                    }) =>
                                                        `${name} ${(
                                                            percent * 100
                                                        ).toFixed(0)}%`
                                                    }
                                                >
                                                    {pieData.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                                stroke="#fff"
                                                                strokeWidth={2}
                                                            />
                                                        ),
                                                    )}
                                                </Pie>
                                                <Tooltip />
                                                <Legend
                                                    layout="horizontal"
                                                    align="center"
                                                    verticalAlign="bottom"
                                                    wrapperStyle={{
                                                        fontSize: "12px",
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                            No data available
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* barrrchart */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white shadow-md rounded-2xl p-6 border"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <BarChart2 className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            Monthly Sales vs Purchases
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <select
                                            value={selectedPeriod}
                                            onChange={(e) =>
                                                setSelectedPeriod(
                                                    e.target.value,
                                                )
                                            }
                                            className="border rounded-lg px-6 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="yearly">
                                                Yearly
                                            </option>
                                            <option value="6months">
                                                Last 6 Months
                                            </option>
                                            <option value="3months">
                                                Last 3 Months
                                            </option>
                                        </select>

                                        {selectedPeriod === "yearly" && (
                                            <select
                                                value={selectedYear}
                                                onChange={(e) =>
                                                    setSelectedYear(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                className="border rounded-lg px-8 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                {organizationData.availableYears.map(
                                                    (year) => (
                                                        <option
                                                            key={year}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                {/* Bar Chart */}
                                {formattedBarData.length > 0 ? (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart data={formattedBarData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="salesTotal"
                                                name="Sales (Total)"
                                                fill="#2563EB"
                                                radius={[8, 8, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="purchasesTotal"
                                                name="Purchases (Total)"
                                                fill="#DC2626"
                                                radius={[8, 8, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
                                        No data available
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Manage Organization Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md font-semibold flex items-center gap-2"
                            >
                                <Building2 className="w-5 h-5" />
                                Manage Organization
                            </button>
                        </div>
                    </>
                ) : (
                    // No organization view
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center py-20"
                    >
                        <Package className="w-16 h-16 text-blue-600 mb-4" />
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
                            Welcome to LogiTrek
                        </h1>
                        <p className="mt-3 text-gray-600 max-w-lg">
                            Let’s set up your organization to start managing
                            your inventory efficiently.
                        </p>

                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-md flex items-center gap-2"
                        >
                            <Building2 className="w-5 h-5" />
                            Create Organization
                        </button>
                    </motion.div>
                )}

                {/* MODAL */}
                <AnimatePresence>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <OrganizationForm
                                organization={organization}
                                onClose={() => setShowModal(false)}
                            />
                        </Modal>
                    )}
                </AnimatePresence>
            </div>
        </AppLayout>
    );
}

function Modal({ children, onClose }) {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                ref={ref}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh]"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                >
                    <X size={22} />
                </button>
                <div className="p-6">{children}</div>
            </motion.div>
        </motion.div>
    );
}

// ------------------ ORGANIZATION FORM ------------------
function OrganizationForm({ organization, onClose }) {
    const isEdit = Boolean(organization);
    const { data, setData, post, put, processing, errors } = useForm({
        name: organization?.name || "",
        address: organization?.address || "",
        phone: organization?.phone || "",
        email: organization?.email || "",
    });
    console.log(organization);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("organizations.update", organization.id), {
                onSuccess: onClose,
            });
        } else {
            post(route("organizations.store"), { onSuccess: onClose });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
                {isEdit ? "Edit Organization" : "Create Organization"}
            </h2>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Name
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter organization name"
                />
                {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Phone
                </label>
                <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter phone number"
                />
                {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Address
                </label>
                <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter address"
                />
                {errors.address && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.address}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter email address"
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-600 hover:text-red-600 font-semibold"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isEdit ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}

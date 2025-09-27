import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index() {
    const { purchases } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState(null);

    const handleShow = (purchase) => {
        setCurrentPurchase(purchase);
        setShowModal(true);
    };

    const handleClose = (e) => {
        if (e.target.id === "modalOverlay") {
            setShowModal(false);
            setCurrentPurchase(null);
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this purchase?")) {
            Inertia.delete(`/purchases/${id}`);
        }
    };

    return (
        <AppLayout title="Purchases">
            <Head title="Purchases" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Purchases</h1>
                <Link
                    href="/purchases/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Add Purchase
                </Link>
            </div>

            {/* Purchases Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Invoice
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Date
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Supplier
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Total
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Remain
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {purchases.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm">
                                    {p.invoice_number}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {p.purchase_date}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {p.supplier?.name}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {p.total_amount}
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {p.remain_amount}
                                </td>
                                <td className="px-4 py-2 text-sm capitalize">
                                    {p.payment_status}
                                </td>
                                <td className="px-4 py-2 flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleShow(p)}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    >
                                        Show
                                    </button>
                                    <Link
                                        href={`/purchases/${p.id}/edit`}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modern Modal */}
            {showModal && currentPurchase && (
                <div
                    id="modalOverlay"
                    onClick={handleClose}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                >
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">
                                Invoice: {currentPurchase.invoice_number}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-4 space-y-2 text-gray-700">
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {currentPurchase.purchase_date}
                            </p>
                            <p>
                                <span className="font-semibold">Supplier:</span>{" "}
                                {currentPurchase.supplier?.name}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Total Amount:
                                </span>{" "}
                                {currentPurchase.total_amount}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Remain Amount:
                                </span>{" "}
                                {currentPurchase.remain_amount}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                {currentPurchase.payment_status}
                            </p>

                            <h3 className="font-semibold mt-4 mb-2">Items</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border rounded">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left text-sm font-medium">
                                                Product
                                            </th>
                                            <th className="px-3 py-2 text-left text-sm font-medium">
                                                Quantity
                                            </th>
                                            <th className="px-3 py-2 text-left text-sm font-medium">
                                                Price
                                            </th>
                                            <th className="px-3 py-2 text-left text-sm font-medium">
                                                Paid Status
                                            </th>
                                            <th className="px-3 py-2 text-left text-sm font-medium">
                                                Remain
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentPurchase.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.product?.name}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.purchase_price}
                                                </td>
                                                <td className="px-3 py-2 text-sm capitalize">
                                                    {item.payment_status}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.remain_amount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

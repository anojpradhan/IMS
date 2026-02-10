import React, { useState } from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
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
            router.delete(`/purchases/${id}`);
        }
    };

    return (
        <AppLayout title="Purchases">
            <Head title="Purchases" />

            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Purchases
                    </h1>
                    <Link
                        href="/purchases/create"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Create Purchase
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Invoice
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Supplier
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Purchase Date
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Total
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Remain
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {purchases.data.map((purchase) => (
                                <tr
                                    key={purchase.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2 text-sm">
                                        {purchase.invoice_number}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {purchase.supplier.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {purchase.purchase_date}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {purchase.total_amount}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {purchase.remain_amount}
                                    </td>
                                    <td className="px-4 py-2 text-sm capitalize">
                                        {purchase.payment_status}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleShow(purchase)}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Show
                                        </button>

                                        <Link
                                            href={`/purchases/${purchase.id}/edit`}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(purchase.id)
                                            }
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {purchases.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No purchases found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {purchases.links.map((link, index) => (
                        <span key={index}>
                            {link.url ? (
                                <Link
                                    href={link.url}
                                    className={`px-3 py-1 border rounded ${
                                        link.active
                                            ? "bg-green-500 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    className="px-3 py-1 border rounded text-gray-400"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && currentPurchase && (
                <div
                    id="modalOverlay"
                    onClick={handleClose}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                >
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">
                                Invoice: {currentPurchase.invoice_number}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl font-bold text-gray-500"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-4 space-y-2 text-gray-700">
                            <p>
                                <strong>Supplier:</strong>{" "}
                                {currentPurchase.supplier.name}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {currentPurchase.purchase_date}
                            </p>
                            <p>
                                <strong>Total:</strong>{" "}
                                {currentPurchase.total_amount}
                            </p>
                            <p>
                                <strong>Remain:</strong>{" "}
                                {currentPurchase.remain_amount}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {currentPurchase.payment_status}
                            </p>

                            <h3 className="font-semibold mt-4">Items</h3>

                            <table className="min-w-full border divide-y">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-2 text-left">
                                            Product
                                        </th>
                                        <th className="px-3 py-2">Qty</th>
                                        <th className="px-3 py-2">Price</th>
                                        <th className="px-3 py-2">Remain</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPurchase.items.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-3 py-2">
                                                {item.product?.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                {item.quantity}
                                            </td>
                                            <td className="px-3 py-2">
                                                {item.purchase_price}
                                            </td>
                                            <td className="px-3 py-2">
                                                {item.remain_amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end p-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
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

import React, { useState } from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Index() {
    const { sales } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [currentSale, setCurrentSale] = useState(null);

    const handleShow = (sale) => {
        setCurrentSale(sale);
        setShowModal(true);
    };

    const handleClose = (e) => {
        if (e.target.id === "modalOverlay") {
            setShowModal(false);
            setCurrentSale(null);
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this sale?")) {
            router.delete(`/sales/${id}`);
        }
    };

    return (
        <AppLayout title="Sales">
            <Head title="Sales" />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Sales</h1>
                    <Link
                        href="/sales/create"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Create Sale
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Invoice
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Customer
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Sale Date
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
                            {sales.data.map((sale) => (
                                <tr key={sale.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm">
                                        {sale.invoice_number}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {sale.customer.name}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {sale.sale_date}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {sale.total_amount}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                        {sale.remain_amount}
                                    </td>
                                    <td className="px-4 py-2 text-sm capitalize">
                                        {sale.payment_status}
                                    </td>
                                    <td className="px-4 py-2 flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleShow(sale)}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                        >
                                            Show
                                        </button>
                                        <Link
                                            href={`/sales/${sale.id}/edit`}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(sale.id)
                                            }
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {sales.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No sales found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-center space-x-2 flex-wrap">
                    {sales.links.map((link, index) => (
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
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className="px-3 py-1 border rounded text-gray-400"
                                />
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {showModal && currentSale && (
                <div
                    id="modalOverlay"
                    onClick={handleClose}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                >
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">
                                Invoice: {currentSale.invoice_number}
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
                                <span className="font-semibold">Customer:</span>{" "}
                                {currentSale.customer.name}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Sale Date:
                                </span>{" "}
                                {currentSale.sale_date}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Total Amount:
                                </span>{" "}
                                {currentSale.total_amount}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Remain Amount:
                                </span>{" "}
                                {currentSale.remain_amount}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                {currentSale.payment_status}
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
                                        {currentSale.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.product?.name}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-3 py-2 text-sm">
                                                    {item.sale_price}
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

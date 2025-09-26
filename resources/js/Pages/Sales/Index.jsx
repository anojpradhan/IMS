import React from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Index() {
    const { sales } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this sale?")) {
            router.delete(`/sales/${id}`);
        }
    };

    return (
        <>
            <Head title="Suppliers" />
            <div className="flex min-h-screen bg-white">
                <Sidebar />
                <div className=" flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Sales</h1>
                        <Link
                            href="/sales/create"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Create Sale
                        </Link>
                    </div>

                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Invoice</th>
                                <th className="border px-4 py-2">Customer</th>
                                <th className="border px-4 py-2">Sale Date</th>
                                <th className="border px-4 py-2">
                                    Total Amount
                                </th>
                                <th className="border px-4 py-2">
                                    Remain Amount
                                </th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.data.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="border px-4 py-2">
                                        {sale.invoice_number}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {sale.customer.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {sale.sale_date}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {sale.total_amount}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {sale.remain_amount}
                                    </td>
                                    <td className="border px-4 py-2 capitalize">
                                        {sale.payment_status}
                                    </td>
                                    <td className="border px-4 py-2 space-x-2">
                                        <Link
                                            href={`/sales/${sale.id}/edit`}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(sale.id)
                                            }
                                            className="bg-red-500 text-white px-2 py-1 rounded"
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
                                        className="text-center py-4"
                                    >
                                        No sales found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center space-x-2">
                        {sales.links.map((link, index) => (
                            <span key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-1 border rounded ${
                                            link.active
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-black"
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
                                        className="px-3 py-1 border rounded text-gray-500"
                                    />
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function CustomersIndex() {
    const { customers, flash } = usePage().props;
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this customer?")) {
            Inertia.delete(route("customers.destroy", id));
        }
    };

    return (
        <AppLayout title="Customers">
            <Head title="Customers" />

            <div className="flex flex-col p-4 gap-6 min-h-[calc(100vh-80px)] bg-gray-50">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h1 className="text-3xl font-bold text-green-700">
                        Customers
                    </h1>
                    <Link
                        href={route("customers.create")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow transition w-full sm:w-auto text-center"
                    >
                        + Add Customer
                    </Link>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="p-4 rounded-lg bg-green-100 text-green-800 shadow">
                        {flash.success}
                    </div>
                )}

                {/* Customers Table */}
                <div className="bg-white shadow-xl rounded-2xl overflow-x-auto border border-gray-200">
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border text-left">Name</th>
                                <th className="p-3 border text-left">
                                    Contact Person
                                </th>
                                <th className="p-3 border text-left">Phone</th>
                                <th className="p-3 border text-left">Email</th>
                                <th className="p-3 border text-left">
                                    Address
                                </th>
                                <th className="p-3 border text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 text-center text-gray-500 italic"
                                    >
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                            {customers.data.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="p-3 border">
                                        {customer.name}
                                    </td>
                                    <td className="p-3 border">
                                        {customer.contact_person || "-"}
                                    </td>
                                    <td className="p-3 border">
                                        {customer.phone}
                                    </td>
                                    <td className="p-3 border">
                                        {customer.email}
                                    </td>
                                    <td className="p-3 border">
                                        {customer.address}
                                    </td>
                                    <td className="p-3 border text-center flex justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                setSelectedCustomer(customer)
                                            }
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg shadow hover:bg-green-700 transition text-xs"
                                        >
                                            Show
                                        </button>
                                        <Link
                                            href={route(
                                                "customers.edit",
                                                customer.id
                                            )}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow hover:bg-yellow-600 transition text-xs"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(customer.id)
                                            }
                                            className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center flex-wrap gap-2 mt-6">
                    {customers.links &&
                        customers.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    link.url && Inertia.visit(link.url)
                                }
                                disabled={!link.url}
                                className={`px-3 py-1.5 rounded text-sm ${
                                    link.active
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                } ${
                                    !link.url
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                </div>

                {/* Customer Details Modal */}
                {selectedCustomer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative flex flex-col">
                            {/* Close X at top-right */}
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition text-xl font-bold"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Customer Details
                            </h2>

                            {/* Customer Info */}
                            <div className="space-y-2 text-gray-700 text-sm">
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {selectedCustomer.name}
                                </p>
                                <p>
                                    <strong>Contact Person:</strong>{" "}
                                    {selectedCustomer.contact_person || "-"}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedCustomer.phone}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedCustomer.email}
                                </p>
                                <p>
                                    <strong>Address:</strong>{" "}
                                    {selectedCustomer.address}
                                </p>
                            </div>

                            {/* Buttons at bottom-right */}
                            <div className="mt-6 flex justify-end gap-2 flex-wrap sm:flex-nowrap">
                                <button
                                    onClick={() => setSelectedCustomer(null)}
                                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition flex-1 sm:flex-none text-center"
                                >
                                    Close
                                </button>
                                <Link
                                    href={route(
                                        "customers.edit",
                                        selectedCustomer.id
                                    )}
                                    className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition flex-1 sm:flex-none text-center"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

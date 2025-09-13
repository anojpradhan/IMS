import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Index() {
    const { suppliers } = usePage().props;

    return (
        <>
            <Head title="Suppliers" />
            <div className="flex min-h-screen bg-white">
                <Sidebar />

                <div className="flex-1 p-8">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-blue-700">
                            Suppliers
                        </h1>
                        <Link
                            href={route("suppliers.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
                        >
                            + Add Supplier
                        </Link>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                        <table className="w-full border-collapse">
                            <thead className="bg-white text-blue-500">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Contact</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.data.map((supplier, index) => (
                                    <tr
                                        key={supplier.id}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-white"
                                        } hover:bg-blue-50 transition`}
                                    >
                                        <td className="p-3 border-t">
                                            {supplier.name}
                                        </td>
                                        <td className="p-3 border-t">
                                            {supplier.contact_person}
                                        </td>
                                        <td className="p-3 border-t">
                                            {supplier.phone}
                                        </td>
                                        <td className="p-3 border-t">
                                            {supplier.email}
                                        </td>
                                        <td className="p-3 border-t flex gap-3">
                                            <Link
                                                href={`/suppliers/${supplier.id}/edit`}
                                                className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={`/suppliers/${supplier.id}`}
                                                className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                                                onClick={() =>
                                                    confirm("Are you sure?")
                                                }
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

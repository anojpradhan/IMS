import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { customers } = usePage().props;
    const [showDetailsId, setShowDetailsId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this customer?")) {
            Inertia.delete(route("customers.destroy", id));
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Customers</h1>
                <Link
                    href={route("customers.create")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Customer
                </Link>
            </div>

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Contact Person</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.data.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{customer.name}</td>
                            <td className="p-2 border">
                                {customer.contact_person || "-"}
                            </td>
                            <td className="p-2 border">{customer.phone}</td>
                            <td className="p-2 border">{customer.email}</td>
                            <td className="p-2 border">{customer.address}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() =>
                                        setShowDetailsId(
                                            showDetailsId === customer.id
                                                ? null
                                                : customer.id
                                        )
                                    }
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Show
                                </button>
                                <Link
                                    href={route("customers.edit", customer.id)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(customer.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>

                                {/* Show details popup */}
                                {showDetailsId === customer.id && (
                                    <div
                                        className="absolute bg-white border shadow p-4 mt-2 rounded z-10"
                                        onClick={() => setShowDetailsId(null)}
                                    >
                                        <h3 className="font-bold mb-2">
                                            Customer Details
                                        </h3>
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {customer.name}
                                        </p>
                                        <p>
                                            <strong>Contact Person:</strong>{" "}
                                            {customer.contact_person || "-"}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {customer.phone}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {customer.email}
                                        </p>
                                        <p>
                                            <strong>Address:</strong>{" "}
                                            {customer.address}
                                        </p>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

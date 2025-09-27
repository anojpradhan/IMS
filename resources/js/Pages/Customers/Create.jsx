import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        const key = e.target.name;
        setValues({ ...values, [key]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("customers.store"), values);
    };

    return (
        <AppLayout title="Customers">
            <Head title="Customers" />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
                        Add Customer
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {[
                            { label: "Name", name: "name", type: "text" },
                            {
                                label: "Contact Person",
                                name: "contact_person",
                                type: "text",
                            },
                            { label: "Phone", name: "phone", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Address", name: "address", type: "text" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block font-semibold text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={values[field.name]}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 ${
                                        errors[field.name]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                                {errors[field.name] && (
                                    <div className="text-red-600 mt-1 text-sm">
                                        {errors[field.name]}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex flex-col sm:flex-row gap-3 justify-between">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition"
                            >
                                Save
                            </button>
                            <Link
                                href={route("customers.index")}
                                className="w-full sm:w-auto text-center bg-red-500 text-white px-5 py-2.5 rounded-lg shadow hover:bg-red-600 transition"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

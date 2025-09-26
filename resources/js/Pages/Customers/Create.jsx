import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

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
        <>
            <Head title="Suppliers" />
            <div className="flex min-h-screen bg-white">
                <Sidebar />

                <div className="flex-1 flex justify-center items-start p-8">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h1 className="text-xl font-bold mb-4">Add Supplier</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: "Name", name: "name", type: "text" },
                                {
                                    label: "Contact Person",
                                    name: "contact_person",
                                    type: "text",
                                },
                                { label: "Phone", name: "phone", type: "text" },
                                {
                                    label: "Email",
                                    name: "email",
                                    type: "email",
                                },
                                {
                                    label: "Address",
                                    name: "address",
                                    type: "text",
                                },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block font-medium">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        className={`border w-full p-2 rounded ${
                                            errors[field.name]
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors[field.name] && (
                                        <div className="text-red-500 mt-1">
                                            {errors[field.name]}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <Link
                                    href={route("customers.index")}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/react";

export default function OrganizationForm({ organization }) {
    const isEdit = Boolean(organization);

    const { data, setData, post, put, processing, errors } = useForm({
        name: organization?.name || "",
        address: organization?.address || "",
        phone: organization?.phone || "",
        email: organization?.email || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("organizations.update", organization.id));
        } else {
            post(route("organizations.store"));
        }
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this organization?")) {
            Inertia.delete(route("organizations.destroy", organization.id));
        }
    };

    return (
        <>
            <Head title={isEdit ? "Edit Organization" : "Create Organization"} />

            <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
                {/* Hero Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        {isEdit ? "Edit Your Organization" : "Create a New Organization"}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isEdit
                            ? "Update the details of your organization below."
                            : "Fill in the details below to get started with your organization."}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter organization name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                {errors.phone && (
                                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter address"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                {errors.address && (
                                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 font-semibold text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t">
                            {isEdit && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {isEdit ? "Update Organization" : "Create Organization"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

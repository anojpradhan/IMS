import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Form({ organization }) {
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
            Inertia.delete(route("organizations.destroy"));
        }
    };

    return (
        <>
            <Head
                title={isEdit ? "Edit Organization" : "Create Organization"}
            />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-100 min-h-screen">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white shadow-md rounded-2xl p-8">
                            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                                {isEdit
                                    ? "Edit Organization"
                                    : "Create Organization"}
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200 outline-none"
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200 outline-none"
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200 outline-none"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200 outline-none"
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4">
                                    {isEdit && (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {isEdit ? "Update" : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

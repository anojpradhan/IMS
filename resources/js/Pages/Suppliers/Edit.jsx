import React from "react";
import { useForm, usePage, Link, Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Edit() {
    const { supplier, errors } = usePage().props;

    const { data, setData, put, processing } = useForm({
        name: supplier.name || "",
        contact_person: supplier.contact_person || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        address: supplier.address || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("suppliers.update", supplier.id));
    };

    return (
        <>
            <Head title="Suppliers" />
            <div className="flex min-h-screen bg-white">
                <Sidebar />

                <div className="flex-1 flex justify-center items-start p-8">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h1 className="text-2xl font-bold text-blue-700 mb-6">
                            Edit Supplier
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Supplier Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Supplier Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter supplier name"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Contact Person */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    name="contact_person"
                                    value={data.contact_person}
                                    onChange={(e) => setData("contact_person", e.target.value)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter contact person"
                                />
                                {errors.contact_person && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.contact_person}
                                    </div>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.phone}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter address"
                                    rows="3"
                                />
                                {errors.address && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.address}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition disabled:opacity-70"
                                    disabled={processing}
                                >
                                    {processing ? "Updating..." : "Update"}
                                </button>

                                <Link
                                    href={route("suppliers.index")}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
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

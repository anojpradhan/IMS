import React from "react";
import { useForm, Link, usePage, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Edit() {
    const { role } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: role.name || "",
        description: role.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("roles.update", role.id));
    };

    return (
        <AppLayout title="Edit Role">
            <Head title="Edit Role" />

            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4 bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Edit Role
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                disabled={processing}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                disabled={processing}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.description && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 items-center mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>

                            <Link
                                href={route("roles.index")}
                                className="text-gray-600 hover:text-gray-800 underline"
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

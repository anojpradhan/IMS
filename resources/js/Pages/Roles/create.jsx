import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("roles.store"));
    };

    return (
        <AppLayout title="Create Role">
            <Head title="Create Role" />

            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4 bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
                        Create New Role
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 font-semibold text-gray-700"
                            >
                                Role Name
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
                                placeholder="Enter role name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                                className="block mb-2 font-semibold text-gray-700"
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
                                placeholder="Enter description for this role"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            />
                            {errors.description && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 justify-between items-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto text-center"
                            >
                                {processing ? "Creating..." : "Create Role"}
                            </button>

                            <Link
                                href={route("roles.index")}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition w-full sm:w-auto text-center"
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

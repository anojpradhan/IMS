import React from "react";
import { useForm, Link, usePage, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Edit() {
    const { category } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || "",
        description: category.description || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id));
    };

    return (
        <AppLayout title="Categories">
            <Head title="Edit Category" />

            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-4">
                <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
                        Edit Category
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label
                                className="block mb-1 font-semibold text-gray-700"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                                type="text"
                                disabled={processing}
                                placeholder="Enter category name"
                            />
                            {errors.name && (
                                <div className="text-red-600 mt-1 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                className="block mb-1 font-semibold text-gray-700"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                                rows={4}
                                disabled={processing}
                                placeholder="Write a short description..."
                            />
                            {errors.description && (
                                <div className="text-red-600 mt-1 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>

                            <Link
                                href={route("categories.index")}
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

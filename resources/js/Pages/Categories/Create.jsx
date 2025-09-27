import React from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout"; // assuming you already have this

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("categories.store"));
    };

    return (
        <AppLayout title="Categories">
            <Head title="Categories" />

            <div className="flex justify-center items-center min-h-[80vh] p-4 sm:p-6">
                <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
                        Create Category
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
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                type="text"
                                disabled={processing}
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
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                                disabled={processing}
                            />
                            {errors.description && (
                                <div className="text-red-600 mt-1 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {processing ? "Creating..." : "Create"}
                            </button>

                            <Link
                                href={route("categories.index")}
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

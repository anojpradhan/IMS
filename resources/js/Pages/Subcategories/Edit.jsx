import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function EditSubcategory({ subcategory, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        name: subcategory.name || "",
        category_id: subcategory.category_id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("subcategories.update", subcategory.id));
    };

    return (
        <AppLayout title="Edit Subcategory">
            <Head title="Edit Subcategory" />

            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4 bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-green-700 mb-6">
                        Edit Subcategory
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Category Select */}
                        <div>
                            <label
                                htmlFor="category_id"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-green-500 ${
                                    errors.category_id
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                }`}
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Subcategory Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                Subcategory Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Enter subcategory name"
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-green-500 ${
                                    errors.name
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 items-center mt-2">
                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    !data.category_id ||
                                    !data.name
                                }
                                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>

                            <Link
                                href={route("subcategories.index")}
                                className="text-red-600 hover:text-red-800 underline"
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

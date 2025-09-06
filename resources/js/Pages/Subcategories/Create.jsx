import Sidebar from "@/Components/Sidebar";
import { Head, useForm } from "@inertiajs/react";

const AddSubcategory = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category_id: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("subcategories.store"));
    };

    return (
        <>
            <Head title="Edit" />
            <div className="flex">
                <Sidebar />

                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                    <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow">
                        <h1 className="text-2xl font-bold mb-6">
                            Add Subcategory
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Category Select */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="block font-semibold mb-1"
                                >
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData(
                                            "category_id",
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-full rounded border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={0}>
                                        -- Select Category --
                                    </option>
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
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            {/* Subcategory Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block font-semibold mb-1"
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
                                    className="w-full rounded border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter subcategory name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-between mt-6">
                                <button
                                    type="submit"
                                    disabled={
                                        processing || data.category_id === 0
                                    }
                                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? "Saving..." : "Save"}
                                </button>

                                <a
                                    href={route("subcategories.index")}
                                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddSubcategory;

import Sidebar from "@/Components/Sidebar";
import { Head, Link, useForm } from "@inertiajs/react";

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
            <Head title="Subcategories" />
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">
                            Add Subcategory
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Category Select */}
                            <div>
                                <label
                                    htmlFor="category_id"
                                    className="block mb-1 font-semibold text-gray-700"
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                    <div className="text-red-600 mt-1 text-sm">
                                        {errors.category_id}
                                    </div>
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter subcategory name"
                                />
                                {errors.name && (
                                    <div className="text-red-600 mt-1 text-sm">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={
                                        processing || data.category_id === 0
                                    }
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {processing ? "Saving..." : "Save"}
                                </button>

                                <Link
                                    href={route("subcategories.index")}
                                    className="text-gray-600 hover:text-gray-800 underline"
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
};

export default AddSubcategory;

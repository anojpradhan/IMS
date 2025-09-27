// resources/js/Pages/Products/ProductForm.jsx
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "@/Layouts/AppLayout";

export default function ProductForm({ product, categories }) {
    const isEdit = Boolean(product);
    const [subcategories, setSubcategories] = useState([]);

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        category_id: product?.subcategory?.category_id || "",
        subcategory_id: product?.subcategory_id || "",
    });

    useEffect(() => {
        if (data.category_id) {
            fetchSubcategories(data.category_id);
        } else {
            setSubcategories([]);
        }
    }, [data.category_id]);

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(
                `/categories/${categoryId}/subcategories`
            );
            setSubcategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("products.update", product.id));
        } else {
            post(route("products.store"));
        }
    };

    return (
        <AppLayout title="Products">
            <Head title={isEdit ? "Edit Product" : "Create Product"} />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
                    {/* Heading */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {isEdit ? "Edit Product" : "Create Product"}
                        </h2>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            {isEdit
                                ? "Update your product details below."
                                : "Fill in the details to add a new product."}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Enter product name"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none text-sm sm:text-base"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Enter product description"
                                rows="3"
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none text-sm sm:text-base"
                            />
                            {errors.description && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none text-sm sm:text-base"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Subcategory
                            </label>
                            <select
                                value={data.subcategory_id}
                                onChange={(e) =>
                                    setData("subcategory_id", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-400 focus:outline-none text-sm sm:text-base"
                                disabled={!data.category_id}
                            >
                                <option value="">Select subcategory</option>
                                {subcategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subcategory_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.subcategory_id}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                                disabled={processing}
                            >
                                {isEdit ? "Update Product" : "Create Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

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
            const response = await axios.get(`/categories/${categoryId}/subcategories`);
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
        <>
            <Head title={isEdit ? "Edit Product" : "Create Product"} />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isEdit ? "Edit Product" : "Create Product"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData("category_id", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-600 text-sm">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="block mb-1 font-medium">Subcategory</label>
                            <select
                                value={data.subcategory_id}
                                onChange={(e) => setData("subcategory_id", e.target.value)}
                                className="w-full border rounded-lg p-2"
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
                                <p className="text-red-600 text-sm">{errors.subcategory_id}</p>
                            )}
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            {isEdit ? "Update Product" : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

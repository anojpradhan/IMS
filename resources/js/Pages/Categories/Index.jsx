import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { categories, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {flash?.success && (
                <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
                    {flash.success}
                </div>
            )}

            <Link
                href={route("categories.create")}
                className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create New Category
            </Link>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">
                            Description
                        </th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.data.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center p-4">
                                No categories found.
                            </td>
                        </tr>
                    )}

                    {categories.data.map((category) => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 p-2">
                                {category.name}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {category.description}
                            </td>
                            <td className="border border-gray-300 p-2 space-x-2">
                                <Link
                                    href={route("categories.edit", category.id)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                {categories.links &&
                    categories.links.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => Inertia.visit(link.url)}
                            disabled={!link.url}
                            className={`mx-1 px-3 py-1 rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
            </div>
        </div>
    );
}

import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Index() {
    const { categories, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            Inertia.delete(route("categories.destroy", id));
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                 
                        <div className="mb-6 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                Categories
                            </h1>
                            <a
                                href={route("categories.create")}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                + Create New
                            </a>
                        </div>

                        {flash?.success && (
                            <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
                                {flash.success}
                            </div>
                        )}

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 p-2">
                                        Name
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                        Description
                                    </th>
                                    <th className="border border-gray-300 p-2">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="text-center p-4"
                                        >
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
                                                href={route(
                                                    "categories.edit",
                                                    category.id
                                                )}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(category.id)
                                                }
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
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                        </div>
                 
                </main>
            </div>
        </>
    );
}

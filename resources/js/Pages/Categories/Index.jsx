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
            <Head title="Categories" />
            <div className="flex flex-col md:flex-row min-h-screen">
                <Sidebar />

                <main className="flex-1 bg-gray-100 p-6">
                    {/* Header */}
                    <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Categories
                        </h1>
                        <a
                            href={route("categories.create")}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 transition"
                        >
                            + Create New
                        </a>
                    </div>

                    {/* Flash Message */}
                    {flash?.success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded">
                            {flash.success}
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="w-full border-collapse">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">
                                        Description
                                    </th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="text-center p-6 text-gray-600"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}

                                {categories.data.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3">{category.name}</td>
                                        <td className="p-3 text-gray-700">
                                            {category.description}
                                        </td>
                                        <td className="p-3 space-x-3">
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
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {categories.links &&
                            categories.links.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        link.url && Inertia.visit(link.url)
                                    }
                                    disabled={!link.url}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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

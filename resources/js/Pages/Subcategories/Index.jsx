import AppLayout from "@/Layouts/AppLayout";
import { Head, router, usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function SubcategoryIndex() {
    const { subcategories, flash } = usePage().props;
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this subcategory?")) {
            setDeletingId(id);
            router.delete(route("subcategories.destroy", id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AppLayout title="Subcategories">
            <Head title="Subcategories" />

            <div className="p-6 bg-gray-100 min-h-[calc(100vh-64px)]">
                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-green-700">
                        Subcategories
                    </h1>
                    <Link
                        href={route("subcategories.create")}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                    >
                        + Create New
                    </Link>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow">
                        {flash.success}
                    </div>
                )}

                {/* Subcategories Table */}
                <div className="overflow-x-auto rounded border border-gray-200 shadow bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="border p-3">ID</th>
                                <th className="border p-3">Subcategory Name</th>
                                <th className="border p-3">Category Name</th>
                                <th className="border p-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subcategories.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-4 text-center text-gray-500 italic"
                                    >
                                        No subcategories found.
                                    </td>
                                </tr>
                            ) : (
                                subcategories.data.map((subcat) => (
                                    <tr
                                        key={subcat.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="border p-3 text-center">
                                            {subcat.id}
                                        </td>
                                        <td className="border p-3">
                                            {subcat.name}
                                        </td>
                                        <td className="border p-3">
                                            {subcat.category?.name || "-"}
                                        </td>
                                        <td className="border p-3 text-center space-x-2">
                                            <Link
                                                href={route(
                                                    "subcategories.edit",
                                                    subcat.id
                                                )}
                                                className="rounded bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(subcat.id)
                                                }
                                                disabled={
                                                    deletingId === subcat.id
                                                }
                                                className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700 transition disabled:opacity-50"
                                            >
                                                {deletingId === subcat.id
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <div className="inline-flex gap-1 flex-wrap">
                        {subcategories.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && router.visit(link.url)
                                }
                                className={`rounded border px-3 py-1 text-sm ${
                                    link.active
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                } ${
                                    !link.url
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

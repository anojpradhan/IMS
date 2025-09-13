import Sidebar from "@/Components/Sidebar";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
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
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Subcategories</h1>
                        <a
                            href={route("subcategories.create")}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            + Create New
                        </a>
                    </div>

                    {flash?.success && (
                        <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow">
                            {flash.success}
                        </div>
                    )}

                    <div className="overflow-x-auto rounded border border-gray-200 shadow">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="border p-3">ID</th>
                                    <th className="border p-3">
                                        Subcategory Name
                                    </th>
                                    <th className="border p-3">
                                        Category Name
                                    </th>
                                    <th className="border p-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subcategories.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
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
                                                <a
                                                    href={route(
                                                        "subcategories.edit",
                                                        subcat.id
                                                    )}
                                                    className="rounded bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(subcat.id)
                                                    }
                                                    disabled={
                                                        deletingId === subcat.id
                                                    }
                                                    className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
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
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    } ${
                                        !link.url
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

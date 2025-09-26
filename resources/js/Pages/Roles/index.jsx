import Sidebar from "@/Components/Sidebar";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const { roles, flash } = usePage().props;
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this role?")) {
            setDeletingId(id);
            router.delete(route("roles.destroy", id), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    console.log(roles);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Roles</h1>
                        <a
                            href={route("roles.create")}
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
                                        Roles
                                    </th>
                                    <th className="border p-3">
                                        Description
                                    </th>
                                    <th className="border p-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-4 text-center text-gray-500 italic"
                                        >
                                            No roles found.
                                        </td>
                                    </tr>
                                ) : (
                                    roles.map((roles) => (
                                        <tr
                                            key={roles.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border p-3 text-center">
                                                {roles.id}
                                            </td>
                                            <td className="border p-3">
                                                {roles.name}
                                            </td>
                                            <td className="border p-3">
                                                {roles.description || "-"}
                                            </td>
                                            <td className="border p-3 text-center space-x-2">
                                                <a
                                                    href={route(
                                                        "roles.edit",
                                                        roles.id
                                                    )}
                                                    className="rounded bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(roles.id)
                                                    }
                                                    disabled={
                                                        deletingId === roles.id
                                                    }
                                                    className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                                                >
                                                    {deletingId === roles.id
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
                        {/* <div className="inline-flex gap-1 flex-wrap">
                            {roles.map((link, index) => (
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
                        </div> */}
                    </div>
                </main>
            </div>
        </>
    );
}

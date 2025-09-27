import AppLayout from "@/Layouts/AppLayout";
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

    const protectedRoles = ["Admin", "Manager", "User"]; // roles that cannot be edited/deleted

    return (
        <AppLayout title="Roles">
            <Head title="Roles" />

            <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-green-700">Roles</h1>
                    <a
                        href={route("roles.create")}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                    >
                        + Create New
                    </a>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow">
                        {flash.success}
                    </div>
                )}

                {/* Roles Table */}
                <div className="overflow-x-auto rounded border border-gray-200 shadow bg-white">
                    <table className="w-full text-left text-sm min-w-[500px]">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="border p-3">ID</th>
                                <th className="border p-3">Role</th>
                                <th className="border p-3">Description</th>
                                <th className="border p-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-4 text-center text-gray-500 italic"
                                    >
                                        No roles found.
                                    </td>
                                </tr>
                            ) : (
                                roles.map((role) => {
                                    const isProtected = protectedRoles.includes(
                                        role.name
                                    );
                                    return (
                                        <tr
                                            key={role.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border p-3 text-center">
                                                {role.id}
                                            </td>
                                            <td className="border p-3">
                                                {role.name}
                                            </td>
                                            <td className="border p-3">
                                                {role.description || "-"}
                                            </td>
                                            <td className="border p-3 text-center flex flex-wrap justify-center gap-2">
                                                <a
                                                    href={route(
                                                        "roles.edit",
                                                        role.id
                                                    )}
                                                    className={`rounded px-3 py-1 text-xs text-white transition ${
                                                        isProtected
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-yellow-500 hover:bg-yellow-600"
                                                    }`}
                                                    onClick={(e) =>
                                                        isProtected &&
                                                        e.preventDefault()
                                                    }
                                                >
                                                    Edit
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(role.id)
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                            role.id ||
                                                        isProtected
                                                    }
                                                    className={`rounded px-3 py-1 text-xs text-white transition ${
                                                        isProtected
                                                            ? "bg-gray-400 cursor-not-allowed"
                                                            : "bg-red-600 hover:bg-red-700"
                                                    }`}
                                                >
                                                    {deletingId === role.id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function CategoriesIndex() {
    const { users, flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.remove", id));
        }
    };

    console.log(users);

    return (
        <AppLayout title="Users">
            <Head title="Users" />

            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-green-700">Users</h1>
                <Link
                    href={route("users.addpage")}
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
                >
                    +Add User
                </Link>
            </div>

            {/* Flash Message */}
            {flash?.success && (
                <div className="mb-4 rounded bg-green-100 p-3 text-green-800 shadow">
                    {flash.success}
                </div>
            )}

            {/* Categories Table */}
            <div className="overflow-x-auto rounded border border-gray-200 shadow bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="border p-3">Name</th>
                            <th className="border p-3">Role</th>
                            <th className="border p-3">Email</th>
                            <th className="border p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="p-4 text-center text-gray-500 italic"
                                >
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="border p-3">{user.name}</td>
                                    <td className="border p-3">
                                        {user.role.name}
                                    </td>
                                    <td className="border p-3">
                                        {user.email || "-"}
                                    </td>
                                    <td className="border p-3 text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="rounded px-3 py-1 text-xs text-white bg-red-600 hover:bg-red-700 transition"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center flex-wrap gap-2">
                {users.links &&
                    users.links.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => link.url && router.visit(link.url)}
                            disabled={!link.url}
                            className={`px-3 py-1.5 rounded text-sm ${
                                link.active
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            } ${
                                !link.url ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
            </div>
        </AppLayout>
    );
}

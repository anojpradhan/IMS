import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function AddSubcategory({ roles, users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        role_id: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.add"));
    };
    return (
        <AppLayout title="Add Users">
            <Head title="Add Users" />

            <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4 bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-green-700 mb-6">
                        Add Users
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="role_id"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="role_id"
                                value={data.role_id}
                                onChange={(e) =>
                                    setData("role_id", e.target.value)
                                }
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-green-500 ${
                                    errors.role_id
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                }`}
                            >
                                <option value="">-- Select Role --</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role_id && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.role_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="user_id"
                                className="block mb-1 font-semibold text-gray-700"
                            >
                                User <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="user_id"
                                value={data.user_id}
                                onChange={(e) =>
                                    setData("user_id", e.target.value)
                                }
                                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-green-500 ${
                                    errors.user_id
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-500"
                                }`}
                            >
                                <option value="">-- Select User --</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 items-center mt-2">
                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    !data.user_id ||
                                    !data.role_id
                                }
                                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Save"}
                            </button>

                            <Link
                                href={route("users.index")}
                                className="text-red-600 hover:text-red-800 underline"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

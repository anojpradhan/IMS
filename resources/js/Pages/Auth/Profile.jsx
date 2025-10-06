import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { User, Mail, Lock, Trash2, Eye, EyeOff } from "lucide-react";

export default function ProfileEdit({ auth }) {
    const user = auth.user;

    const { data, setData, patch, processing, errors, delete: destroy } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const initials = user.name
        ? user.name
              .split(" ")
              .map((n) => n[0]?.toUpperCase())
              .join("")
              .slice(0, 2)
        : "U";

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    const handleDelete = () => {
        destroy(route("profile.destroy"));
    };

    const hours = new Date().getHours();
    const greeting =
        hours < 12
            ? "Good Morning 🌅"
            : hours < 18
            ? "Good Afternoon ☀️"
            : "Good Evening 🌙";

    return (
        <AppLayout>
            <Head title="Profile" />
            <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border-b pb-6">
                        <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow">
                            {initials}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Hello, {user.name?.split(" ")[0] || "User"} 👋
                            </h1>
                            <p className="text-gray-500">{greeting}</p>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                                <User className="text-gray-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full bg-transparent focus:outline-none text-gray-800"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                                <Mail className="text-gray-400" size={18} />
                                <input
                                    type="email"
                                    className="w-full bg-transparent focus:outline-none text-gray-800"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Passwords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    New Password
                                </label>
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                                    <Lock className="text-gray-400" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-transparent focus:outline-none text-gray-800"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Confirm Password
                                </label>
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                                    <Lock className="text-gray-400" size={18} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="w-full bg-transparent focus:outline-none text-gray-800"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition-all duration-200 disabled:opacity-60"
                            >
                                {processing ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>

                    {/* Danger Zone */}
                    <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Danger Zone
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Deleting your account will permanently remove all your data.
                        </p>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                        >
                            <Trash2 size={18} />
                            Delete Account
                        </button>
                    </div>

                    {/* Delete Modal */}
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-1/3 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Confirm Deletion
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Are you sure you want to delete your account? This action
                                    cannot be undone.
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

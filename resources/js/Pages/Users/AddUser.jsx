import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";

export default function AddSubcategory({ roles, users }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        role_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("users.add"));
    };

    // Transform users for React Select
    const userOptions = users.map((user) => ({
        value: user.id,
        label: user.name,
    }));

    return (
        <AppLayout title="Add Users">
            <Head title="Add Users" />

            <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-green-700 mb-6">
                        Add Users
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.role_id}
                                onChange={(e) =>
                                    setData("role_id", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="">-- Select Role --</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.role_id}
                                </p>
                            )}
                        </div>

                        {/* User */}
                        <div>
                            <label className="block mb-1 font-semibold text-gray-700">
                                User <span className="text-red-500">*</span>
                            </label>

                            <Select
                                options={userOptions}
                                value={userOptions.find(option => option.value === data.user_id) || null}
                                onChange={(option) =>
                                    setData("user_id", option?.value || "")
                                }
                                placeholder="Select user..."
                                isSearchable
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        border: "1px solid #d1d5db",
                                        borderRadius: "0.5rem",
                                        boxShadow: state.isFocused ? "0 0 0 2px #10b981" : "none",
                                        borderColor: state.isFocused ? "#10b981" : "#d1d5db",
                                        minHeight: "42px",
                                        "&:hover": {
                                            borderColor: state.isFocused ? "#10b981" : "#9ca3af",
                                        },
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "#9ca3af",
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        margin: 0,
                                        padding: 0,
                                        "input:focus": {
                                            boxShadow: "none !important",
                                            outline: "none !important",
                                        },
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: "#374151",
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e5e7eb",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected 
                                            ? "#10b981" 
                                            : state.isFocused 
                                            ? "#ecfdf5" 
                                            : "white",
                                        color: state.isSelected ? "white" : "#374151",
                                        "&:active": {
                                            backgroundColor: "#10b981",
                                            color: "white",
                                        },
                                    }),
                                }}
                                className="w-full focus:outline-none"
                            />

                            {errors.user_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
                            <button
                                type="submit"
                                disabled={
                                    processing || !data.user_id || !data.role_id
                                }
                                className="w-full sm:w-auto bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-medium"
                            >
                                {processing ? "Saving..." : "Save"}
                            </button>

                            <Link
                                href={route("users.index")}
                                className="w-full sm:w-auto text-center text-red-600 hover:text-red-800 underline px-4 py-2"
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
import { Head, useForm } from "@inertiajs/react";

export default function Form({ organization }) {
    const isEdit = Boolean(organization);

    const { data, setData, post, put, processing, errors } = useForm({
        name: organization?.name || "",
        address: organization?.address || "",
        phone: organization?.phone || "",
        email: organization?.email || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("organizations.update"));
        } else {
            post(route("organizations.store"));
        }
    };

    return (
        <>
            <Head title={isEdit ? "Edit Organization" : "Create Organization"} />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isEdit ? "Edit Organization" : "Create Organization"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData("address", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            {isEdit ? "Update Organization" : "Create Organization"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

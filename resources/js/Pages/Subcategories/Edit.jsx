
import { useForm } from "@inertiajs/react";


const EditSubcategory = ({ categories, subcategory }) => {

    const { data, setData, put, processing, errors } = useForm({
        name: subcategory.name || "",
        category_id: subcategory.category_id || 0,
        slug: subcategory.slug || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("subcategories.update", subcategory.id));
    };

    return (
        <div className="flex min-h-screen">
            {!collapsed && (
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            )}

            <div
                className={`flex flex-1 flex-col transition-all duration-300 ${
                    collapsed ? "" : "ml-64"
                }`}
            >
                <div className="relative">
                    <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                    {collapsed && (
                        <button
                            className="absolute top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 shadow-md"
                            onClick={() => setCollapsed(false)}
                            aria-label="Expand sidebar"
                            style={{
                                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                            }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>

                <main className="flex-1 p-8">
                    <div className="mb-6 text-3xl font-bold">
                        Edit Subcategory
                    </div>
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        <form
                            className="mx-auto max-w-6xl"
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-6 flex flex-col gap-6">
                                {/* Category Select */}
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <label
                                        htmlFor="category_id"
                                        className="mb-1 font-semibold md:mb-0 md:w-1/4"
                                    >
                                        Category{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="flex-1 rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={0}>
                                            -- Select Category --
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* Subcategory Name */}
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <label
                                        htmlFor="name"
                                        className="mb-1 font-semibold md:mb-0 md:w-1/4"
                                    >
                                        Subcategory Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter subcategory name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                    <label
                                        htmlFor="slug"
                                        className="mb-1 font-semibold md:mb-0 md:w-1/4"
                                    >
                                        Subcategory Slug
                                    </label>
                                    <input
                                        id="slug"
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        className="flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter slug"
                                    />
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={
                                        processing || data.category_id === 0
                                    }
                                    className="mt-4 rounded-lg bg-blue-600 px-16 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? "Saving..." : "Update"}
                                </button>

                                <a
                                    href={route("subcategories.index")}
                                    className="text-gray-600 hover:text-gray-800 text-sm underline"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default EditSubcategory;

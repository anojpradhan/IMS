import React from "react";
import { useForm, usePage, Link, Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function EditSale({ sale: initialSale }) {
    const { customers, products } = usePage().props;

    const { data, setData, put, errors } = useForm({
        customer_id: initialSale.customer_id,
        sale_date: initialSale.sale_date,
        payment_status: initialSale.payment_status,
        items: initialSale.items.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
            sale_price: i.sale_price,
            paid_amount: i.paid_amount ?? 0,
            remain_amount: i.remain_amount ?? i.quantity * i.sale_price,
            payment_status: i.payment_status,
        })),
    });

    const addItem = () => {
        const newItems = [
            ...data.items,
            {
                product_id: "",
                quantity: 1,
                sale_price: 0,
                paid_amount: 0,
                payment_status: "unpaid",
                remain_amount: 0,
            },
        ];
        setData("items", newItems);
        updateOverallStatus(newItems);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
        updateOverallStatus(newItems);
    };

    const updateOverallStatus = (items) => {
        let status = "unpaid";
        if (items.length > 0) {
            if (items.every((i) => i.payment_status === "paid"))
                status = "paid";
            else if (items.every((i) => i.payment_status === "unpaid"))
                status = "unpaid";
            else status = "partial";
        }
        setData("payment_status", status);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];

        newItems[index][field] = [
            "quantity",
            "sale_price",
            "paid_amount",
        ].includes(field)
            ? Number(value)
            : value;

        const total =
            (newItems[index].quantity || 0) * (newItems[index].sale_price || 0);

        if (newItems[index].payment_status === "paid") {
            newItems[index].paid_amount = total;
            newItems[index].remain_amount = 0;
        } else if (newItems[index].payment_status === "partial") {
            newItems[index].remain_amount = Math.max(
                0,
                total - (newItems[index].paid_amount || 0)
            );
        } else {
            newItems[index].paid_amount = 0;
            newItems[index].remain_amount = total;
        }

        setData("items", newItems);
        updateOverallStatus(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/sales/${initialSale.id}`);
    };

    return (
        <AppLayout title="Edit Sale">
            <Head title="Edit Sale" />
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Edit Sale
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Update customer, sale date, and items below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Customer */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Customer
                            </label>
                            <select
                                value={data.customer_id}
                                onChange={(e) =>
                                    setData("customer_id", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                            >
                                <option value="">Select Customer</option>
                                {customers.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            {errors.customer_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.customer_id}
                                </p>
                            )}
                        </div>

                        {/* Sale Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Sale Date
                            </label>
                            <input
                                type="date"
                                value={data.sale_date}
                                onChange={(e) =>
                                    setData("sale_date", e.target.value)
                                }
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            {errors.sale_date && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.sale_date}
                                </p>
                            )}
                        </div>

                        {/* Items */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Items
                            </h2>
                            <div className="space-y-4">
                                {data.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-xl p-4 sm:p-6 relative bg-gray-50"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm hover:bg-red-600"
                                        >
                                            Remove
                                        </button>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {/* Product */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Product
                                                </label>
                                                <select
                                                    value={item.product_id}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "product_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                                                >
                                                    <option value="">
                                                        Select Product
                                                    </option>
                                                    {products.map((p) => (
                                                        <option
                                                            key={p.id}
                                                            value={p.id}
                                                        >
                                                            {p.name} (Available:{" "}
                                                            {p.quantity + item.quantity})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Quantity
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                />
                                                {errors[
                                                    `items.${index}.quantity`
                                                ] && (
                                                    <p className="text-red-600 text-sm mt-1">
                                                        {
                                                            errors[
                                                                `items.${index}.quantity`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Sale Price
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.sale_price}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "sale_price",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Payment Status
                                                </label>
                                                <select
                                                    value={item.payment_status}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "payment_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
                                                >
                                                    <option value="paid">
                                                        Paid
                                                    </option>
                                                    <option value="partial">
                                                        Partial
                                                    </option>
                                                    <option value="unpaid">
                                                        Unpaid
                                                    </option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Paid Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.paid_amount}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "paid_amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        item.payment_status !==
                                                        "partial"
                                                    }
                                                    className={`w-full border rounded-lg p-3 focus:outline-none ${
                                                        item.payment_status ===
                                                        "partial"
                                                            ? "focus:ring-2 focus:ring-green-500"
                                                            : "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Remain Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.remain_amount}
                                                    readOnly
                                                    className="w-full border rounded-lg p-3 bg-gray-100 text-gray-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addItem}
                                className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 pt-6">
                            <Link
                                href="/sales"
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Update Sale
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

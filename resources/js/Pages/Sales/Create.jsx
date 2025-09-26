import React, { useState } from "react";
import { useForm, usePage, Link, Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Create() {
    const { customers, products } = usePage().props;

    const { data, setData, post, errors } = useForm({
        customer_id: "",
        sale_date: "",
        payment_status: "unpaid", // include overall sale status
        items: [],
    });

    // Add new empty item
    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                product_id: "",
                quantity: 1,
                sale_price: 0,
                paid_amount: 0,
                payment_status: "unpaid",
                remain_amount: 0,
            },
        ]);
        updateOverallStatus([
            ...data.items,
            {
                quantity: 1,
                sale_price: 0,
                payment_status: "unpaid",
                paid_amount: 0,
            },
        ]);
    };

    // Remove item
    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
        updateOverallStatus(newItems);
    };

    // Calculate and update overall sale status in form data
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

    // Handle item changes
    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];

        newItems[index][field] =
            field === "quantity" ||
            field === "sale_price" ||
            field === "paid_amount"
                ? Number(value)
                : value;

        const total = newItems[index].quantity * newItems[index].sale_price;

        if (newItems[index].payment_status === "paid") {
            newItems[index].remain_amount = 0;
            newItems[index].paid_amount = total;
        } else if (newItems[index].payment_status === "partial") {
            newItems[index].remain_amount = Math.max(
                0,
                total - newItems[index].paid_amount
            );
        } else {
            newItems[index].remain_amount = total;
            newItems[index].paid_amount = 0;
        }

        setData("items", newItems);
        updateOverallStatus(newItems);
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/sales"); // payment_status already inside form data
    };

    return (
        <>
            <Head title="Create Sale" />
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
                    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Sale
                            </h1>
                            <Link
                                href="/sales"
                                className="text-gray-600 hover:text-gray-800 underline"
                            >
                                Back
                            </Link>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {/* Customer */}
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">
                                    Customer <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.customer_id}
                                    onChange={(e) =>
                                        setData("customer_id", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="">-- Select Customer --</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.customer_id && (
                                    <p className="text-red-600 mt-1 text-sm">
                                        {errors.customer_id}
                                    </p>
                                )}
                            </div>

                            {/* Sale Date */}
                            <div>
                                <label className="block mb-1 font-semibold text-gray-700">
                                    Sale Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.sale_date}
                                    onChange={(e) =>
                                        setData("sale_date", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.sale_date && (
                                    <p className="text-red-600 mt-1 text-sm">
                                        {errors.sale_date}
                                    </p>
                                )}
                            </div>

                            {/* Items */}
                            <div>
                                <h2 className="font-semibold text-lg mb-2 text-gray-800">
                                    Items
                                </h2>
                                <div className="space-y-4">
                                    {data.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="grid md:grid-cols-7 gap-4 border rounded-lg p-4 bg-gray-50 relative"
                                        >
                                            {/* Product */}
                                            <div className="md:col-span-2">
                                                <label className="block mb-1 font-medium text-gray-700">
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
                                                    className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                >
                                                    <option value="">
                                                        -- Select Product --
                                                    </option>
                                                    {products.map((p) => (
                                                        <option
                                                            key={p.id}
                                                            value={p.id}
                                                        >
                                                            {p.name} (Available:{" "}
                                                            {p.quantity})
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[`items.${index}.product_id`] && (
                                                    <p className="text-red-600 mt-1 text-sm">
                                                        {
                                                            errors[
                                                                `items.${index}.product_id`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity */}
                                            <div>
                                                <label className="block mb-1 font-medium text-gray-700">
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
                                                    className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <label className="block mb-1 font-medium text-gray-700">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={item.sale_price}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "sale_price",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Payment Status */}
                                            <div>
                                                <label className="block mb-1 font-medium text-gray-700">
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
                                                    className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                >
                                                    <option value="unpaid">
                                                        Unpaid
                                                    </option>
                                                    <option value="partial">
                                                        Partial
                                                    </option>
                                                    <option value="paid">
                                                        Paid
                                                    </option>
                                                </select>
                                            </div>

                                            {/* Paid Amount (if partial) */}
                                            {item.payment_status === "partial" && (
                                                <div>
                                                    <label className="block mb-1 font-medium text-gray-700">
                                                        Paid Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={item.paid_amount}
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "paid_amount",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full border rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            )}

                                            {/* Remain Amount */}
                                            <div>
                                                <label className="block mb-1 font-medium text-gray-700">
                                                    Remain Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    value={item.remain_amount}
                                                    disabled
                                                    className="w-full border rounded-lg px-2 py-1 bg-gray-100"
                                                />
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                                >
                                    + Add Item
                                </button>
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                                >
                                    Save Sale
                                </button>

                                <Link
                                    href="/sales"
                                    className="text-gray-600 hover:text-gray-800 underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

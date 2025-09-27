import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

export default function Create() {
    const { suppliers, products, errors } = usePage().props;

    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: "",
            purchase_price: "",
            payment_status: "paid",
            paid_amount: "",
            remain_amount: 0,
        },
    ]);

    const [formData, setFormData] = useState({
        supplier_id: "",
        invoice_number: "",
        purchase_date: "",
    });

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];

        if (["quantity", "purchase_price", "paid_amount"].includes(field)) {
            // allow empty string for user typing
            newItems[index][field] = value === "" ? "" : Number(value);
        } else {
            newItems[index][field] = value;
        }

        // calculate totals
        const total =
            (newItems[index].quantity || 0) *
            (newItems[index].purchase_price || 0);

        if (newItems[index].payment_status === "paid") {
            newItems[index].paid_amount = total;
        } else if (newItems[index].payment_status === "unpaid") {
            newItems[index].paid_amount = 0;
        }

        const paid = newItems[index].paid_amount || 0;
        newItems[index].remain_amount = total - paid;

        setItems(newItems);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                product_id: "",
                quantity: "",
                purchase_price: "",
                payment_status: "paid",
                paid_amount: "",
                remain_amount: 0,
            },
        ]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, items };
        Inertia.post("/purchases", payload);
    };

    return (
        <AppLayout title="Create Purchase">
            <Head title="Create Purchase" />

            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-10">
                <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Create Purchase
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">
                            Fill in the supplier, invoice, and items to record a
                            new purchase.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Supplier */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Supplier
                            </label>
                            <select
                                value={formData.supplier_id}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        supplier_id: e.target.value,
                                    })
                                }
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.supplier_id}
                                </p>
                            )}
                        </div>

                        {/* Invoice & Date */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Invoice Number
                                </label>
                                <input
                                    type="text"
                                    value={formData.invoice_number}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            invoice_number: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                {errors.invoice_number && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.invoice_number}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Purchase Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.purchase_date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            purchase_date: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                {errors.purchase_date && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.purchase_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Items */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Items
                            </h2>
                            <div className="space-y-4">
                                {items.map((item, index) => (
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
                                                            {p.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors[
                                                    `items.${index}.product_id`
                                                ] && (
                                                    <p className="text-red-600 text-sm mt-1">
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

                                            {/* Purchase Price */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Purchase Price
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.purchase_price}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "purchase_price",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                />
                                                {errors[
                                                    `items.${index}.purchase_price`
                                                ] && (
                                                    <p className="text-red-600 text-sm mt-1">
                                                        {
                                                            errors[
                                                                `items.${index}.purchase_price`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Payment Status */}
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
                                                {errors[
                                                    `items.${index}.payment_status`
                                                ] && (
                                                    <p className="text-red-600 text-sm mt-1">
                                                        {
                                                            errors[
                                                                `items.${index}.payment_status`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Paid Amount - always visible */}
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
                                                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                                                        item.payment_status ===
                                                        "partial"
                                                            ? "focus:ring-green-500"
                                                            : "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                />
                                                {errors[
                                                    `items.${index}.paid_amount`
                                                ] && (
                                                    <p className="text-red-600 text-sm mt-1">
                                                        {
                                                            errors[
                                                                `items.${index}.paid_amount`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Remain Amount */}
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

                        {/* Actions */}
                        <div className="flex flex-wrap justify-end gap-3 pt-6">
                            <Link
                                href="/purchases"
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                            >
                                Save Purchase
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

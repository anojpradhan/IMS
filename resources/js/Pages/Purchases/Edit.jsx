import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Edit() {
    const { purchase, suppliers, products, errors } = usePage().props;

    const [formData, setFormData] = useState({
        supplier_id: purchase.supplier_id || "",
        invoice_number: purchase.invoice_number || "",
        purchase_date: purchase.purchase_date || "",
    });

    const [items, setItems] = useState(
        purchase.items.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            purchase_price: item.purchase_price,
            payment_status: item.payment_status,
            paid_amount:
                item.payment_status === "partial"
                    ? item.purchase_price * item.quantity - item.remain_amount
                    : 0,
            remain_amount: item.remain_amount,
        }))
    );

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] =
            field === "quantity" ||
            field === "purchase_price" ||
            field === "paid_amount"
                ? Number(value)
                : value;

        // Auto-calculate remain_amount
        const total = newItems[index].quantity * newItems[index].purchase_price;
        const paid =
            newItems[index].payment_status === "paid"
                ? total
                : newItems[index].payment_status === "unpaid"
                ? 0
                : newItems[index].paid_amount || 0;

        newItems[index].remain_amount = total - paid;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                product_id: "",
                quantity: 1,
                purchase_price: 0,
                payment_status: "paid",
                paid_amount: 0,
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
        Inertia.put(`/purchases/${purchase.id}`, { ...formData, items });
    };

    return (
        <>
            <Head title="Edit Purchase" />
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Edit Purchase
                            </h1>
                            <Link
                                href="/purchases"
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                ← Back to Purchases
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Supplier */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 border rounded-lg p-2 w-full"
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.supplier_id && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.supplier_id}
                                    </p>
                                )}
                            </div>

                            {/* Invoice Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 border rounded-lg p-2 w-full"
                                />
                                {errors.invoice_number && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.invoice_number}
                                    </p>
                                )}
                            </div>

                            {/* Purchase Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 border rounded-lg p-2 w-full"
                                />
                                {errors.purchase_date && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.purchase_date}
                                    </p>
                                )}
                            </div>

                            {/* Items Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Items
                                </h2>
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="relative border rounded-xl p-4 bg-gray-50 shadow-sm"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                                            >
                                                ×
                                            </button>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {/* Product */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
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
                                                        className="mt-1 border rounded-lg p-2 w-full"
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
                                                        <p className="text-red-500 text-sm mt-1">
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
                                                    <label className="block text-sm font-medium text-gray-700">
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
                                                        className="mt-1 border rounded-lg p-2 w-full"
                                                    />
                                                </div>

                                                {/* Purchase Price */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Purchase Price
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={
                                                            item.purchase_price
                                                        }
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "purchase_price",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 border rounded-lg p-2 w-full"
                                                    />
                                                </div>

                                                {/* Payment Status */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Payment Status
                                                    </label>
                                                    <select
                                                        value={
                                                            item.payment_status
                                                        }
                                                        onChange={(e) =>
                                                            handleItemChange(
                                                                index,
                                                                "payment_status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 border rounded-lg p-2 w-full"
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

                                                {/* Paid Amount (if partial) */}
                                                {item.payment_status ===
                                                    "partial" && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Paid Amount
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            value={
                                                                item.paid_amount
                                                            }
                                                            onChange={(e) =>
                                                                handleItemChange(
                                                                    index,
                                                                    "paid_amount",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="mt-1 border rounded-lg p-2 w-full"
                                                        />
                                                    </div>
                                                )}

                                                {/* Remain Amount */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Remain Amount
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={
                                                            item.remain_amount
                                                        }
                                                        readOnly
                                                        className="mt-1 border rounded-lg p-2 w-full bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    + Add Item
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update Purchase
                                </button>
                                <Link
                                    href="/purchases"
                                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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

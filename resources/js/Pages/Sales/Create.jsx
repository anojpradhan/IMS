import React, { useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";

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
        updateOverallStatus([...data.items, { quantity: 1, sale_price: 0, payment_status: "unpaid", paid_amount: 0 }]);
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
            if (items.every((i) => i.payment_status === "paid")) status = "paid";
            else if (items.every((i) => i.payment_status === "unpaid")) status = "unpaid";
            else status = "partial";
        }
        setData("payment_status", status);
    };

    // Handle item changes
    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];

        newItems[index][field] =
            field === "quantity" || field === "sale_price" || field === "paid_amount"
                ? Number(value)
                : value;

        const total = newItems[index].quantity * newItems[index].sale_price;

        if (newItems[index].payment_status === "paid") {
            newItems[index].remain_amount = 0;
            newItems[index].paid_amount = total;
        } else if (newItems[index].payment_status === "partial") {
            newItems[index].remain_amount = Math.max(0, total - newItems[index].paid_amount);
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
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Create Sale</h1>
                <Link href="/sales" className="text-blue-500 hover:underline">
                    Back
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
                {/* Customer */}
                <div>
                    <label className="block font-medium mb-1">Customer</label>
                    <select
                        value={data.customer_id}
                        onChange={(e) => setData("customer_id", e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && <p className="text-red-500 mt-1">{errors.customer_id}</p>}
                </div>

                {/* Sale Date */}
                <div>
                    <label className="block font-medium mb-1">Sale Date</label>
                    <input
                        type="date"
                        value={data.sale_date}
                        onChange={(e) => setData("sale_date", e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    {errors.sale_date && <p className="text-red-500 mt-1">{errors.sale_date}</p>}
                </div>

                {/* Items */}
                <div>
                    <h2 className="font-semibold mb-2">Items</h2>
                    {data.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-3 mb-3 border p-3 rounded items-end">
                            {/* Product */}
                            <div className="col-span-2">
                                <label className="block mb-1 font-medium">Product</label>
                                <select
                                    value={item.product_id}
                                    onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                                    className="border p-1 w-full rounded"
                                >
                                    <option value="">Select Product</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} (Available: {p.quantity})
                                        </option>
                                    ))}
                                </select>
                                {errors[`items.${index}.product_id`] && (
                                    <p className="text-red-500 mt-1">{errors[`items.${index}.product_id`]}</p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block mb-1 font-medium">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                    className="border p-1 w-full rounded"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block mb-1 font-medium">Price</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={item.sale_price}
                                    onChange={(e) => handleItemChange(index, "sale_price", e.target.value)}
                                    className="border p-1 w-full rounded"
                                />
                            </div>

                            {/* Payment Status */}
                            <div>
                                <label className="block mb-1 font-medium">Payment Status</label>
                                <select
                                    value={item.payment_status}
                                    onChange={(e) => handleItemChange(index, "payment_status", e.target.value)}
                                    className="border p-1 w-full rounded"
                                >
                                    <option value="unpaid">Unpaid</option>
                                    <option value="partial">Partial</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>

                            {/* Paid Amount */}
                            {item.payment_status === "partial" && (
                                <div>
                                    <label className="block mb-1 font-medium">Paid Amount</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.paid_amount}
                                        onChange={(e) => handleItemChange(index, "paid_amount", e.target.value)}
                                        className="border p-1 w-full rounded"
                                    />
                                </div>
                            )}

                            {/* Remain Amount */}
                            <div>
                                <label className="block mb-1 font-medium">Remain Amount</label>
                                <input
                                    type="number"
                                    value={item.remain_amount}
                                    disabled
                                    className="border p-1 w-full rounded bg-gray-100"
                                />
                            </div>

                            {/* Remove button */}
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 font-bold text-lg"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addItem}
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                    >
                        Add Item
                    </button>
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
                    >
                        Save Sale
                    </button>
                </div>
            </form>
        </div>
    );
}

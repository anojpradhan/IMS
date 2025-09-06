import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

export default function Edit() {
  const { purchase, suppliers, products, errors } = usePage().props;

  const [formData, setFormData] = useState({
    supplier_id: purchase.supplier_id || '',
    invoice_number: purchase.invoice_number || '',
    purchase_date: purchase.purchase_date || '',
  });

  const [items, setItems] = useState(
    purchase.items.map(item => ({
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      purchase_price: item.purchase_price,
      payment_status: item.payment_status,
      paid_amount: item.payment_status === 'partial' ? item.purchase_price * item.quantity - item.remain_amount : 0,
      remain_amount: item.remain_amount,
    }))
  );

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'quantity' || field === 'purchase_price' || field === 'paid_amount' ? Number(value) : value;

    // Auto-calculate remain_amount
    const total = newItems[index].quantity * newItems[index].purchase_price;
    const paid = newItems[index].payment_status === 'paid' ? total
                 : newItems[index].payment_status === 'unpaid' ? 0
                 : newItems[index].paid_amount || 0;

    newItems[index].remain_amount = total - paid;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product_id: '', quantity: 1, purchase_price: 0, payment_status: 'paid', paid_amount: 0, remain_amount: 0 }]);
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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Purchase</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Supplier */}
        <div>
          <label className="block font-medium">Supplier</label>
          <select
            value={formData.supplier_id}
            onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Supplier</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.supplier_id && <div className="text-red-500 mt-1">{errors.supplier_id}</div>}
        </div>

        {/* Invoice Number */}
        <div>
          <label className="block font-medium">Invoice Number</label>
          <input
            type="text"
            value={formData.invoice_number}
            onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
            className="border p-2 w-full rounded"
          />
          {errors.invoice_number && <div className="text-red-500 mt-1">{errors.invoice_number}</div>}
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block font-medium">Purchase Date</label>
          <input
            type="date"
            value={formData.purchase_date}
            onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
            className="border p-2 w-full rounded"
          />
          {errors.purchase_date && <div className="text-red-500 mt-1">{errors.purchase_date}</div>}
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-2">Items</h2>

        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded mb-2 relative">
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              X
            </button>

            {/* Product */}
            <div className="mb-2">
              <label className="block font-medium">Product</label>
              <select
                value={item.product_id}
                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors[`items.${index}.product_id`] && <div className="text-red-500 mt-1">{errors[`items.${index}.product_id`]}</div>}
            </div>

            {/* Quantity */}
            <div className="mb-2">
              <label className="block font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="border p-2 w-full rounded"
              />
              {errors[`items.${index}.quantity`] && <div className="text-red-500 mt-1">{errors[`items.${index}.quantity`]}</div>}
            </div>

            {/* Purchase Price */}
            <div className="mb-2">
              <label className="block font-medium">Purchase Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={item.purchase_price}
                onChange={(e) => handleItemChange(index, 'purchase_price', e.target.value)}
                className="border p-2 w-full rounded"
              />
              {errors[`items.${index}.purchase_price`] && <div className="text-red-500 mt-1">{errors[`items.${index}.purchase_price`]}</div>}
            </div>

            {/* Payment Status */}
            <div className="mb-2">
              <label className="block font-medium">Payment Status</label>
              <select
                value={item.payment_status}
                onChange={(e) => handleItemChange(index, 'payment_status', e.target.value)}
                className="border p-2 w-full rounded"
              >
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="unpaid">Unpaid</option>
              </select>
              {errors[`items.${index}.payment_status`] && <div className="text-red-500 mt-1">{errors[`items.${index}.payment_status`]}</div>}
            </div>

            {/* Paid Amount (only if partial) */}
            {item.payment_status === 'partial' && (
              <div className="mb-2">
                <label className="block font-medium">Paid Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.paid_amount}
                  onChange={(e) => handleItemChange(index, 'paid_amount', e.target.value)}
                  className="border p-2 w-full rounded"
                />
                {errors[`items.${index}.paid_amount`] && <div className="text-red-500 mt-1">{errors[`items.${index}.paid_amount`]}</div>}
              </div>
            )}

            {/* Remain Amount (read-only) */}
            <div>
              <label className="block font-medium">Remain Amount</label>
              <input
                type="number"
                value={item.remain_amount}
                readOnly
                className="border p-2 w-full rounded bg-gray-100"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Item
        </button>

        <div>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Purchase
          </button>
          <Link
            href="/purchases"
            className="ml-4 mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

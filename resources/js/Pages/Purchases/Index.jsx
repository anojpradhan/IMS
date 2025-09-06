import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { purchases } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(null);

  const handleShow = (purchase) => {
    setCurrentPurchase(purchase);
    setShowModal(true);
  };

  const handleClose = (e) => {
    if (e.target.id === 'modalOverlay') {
      setShowModal(false);
      setCurrentPurchase(null);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this purchase?')) {
      Inertia.delete(`/purchases/${id}`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchases</h1>
        <Link
          href="/purchases/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Purchase
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Invoice</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Supplier</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Remain</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border p-2">{p.invoice_number}</td>
              <td className="border p-2">{p.purchase_date}</td>
              <td className="border p-2">{p.supplier?.name}</td>
              <td className="border p-2">{p.total_amount}</td>
              <td className="border p-2">{p.remain_amount}</td>
              <td className="border p-2 capitalize">{p.payment_status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleShow(p)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Show
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <Link
                  href={`/purchases/${p.id}/edit`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Modal */}
      {showModal && currentPurchase && (
        <div
          id="modalOverlay"
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded p-6 w-11/12 max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Invoice: {currentPurchase.invoice_number}
            </h2>
            <p className="mb-2">Date: {currentPurchase.purchase_date}</p>
            <p className="mb-2">Supplier: {currentPurchase.supplier?.name}</p>
            <p className="mb-2">Total Amount: {currentPurchase.total_amount}</p>
            <p className="mb-2">Remain Amount: {currentPurchase.remain_amount}</p>
            <p className="mb-2">Status: {currentPurchase.payment_status}</p>

            <h3 className="font-semibold mt-4 mb-2">Items</h3>
            <table className="w-full border border-gray-300 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Paid Status</th>
                  <th className="border p-2">Remain</th>
                </tr>
              </thead>
              <tbody>
                {currentPurchase.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border p-2">{item.product?.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.purchase_price}</td>
                    <td className="border p-2 capitalize">{item.payment_status}</td>
                    <td className="border p-2">{item.remain_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

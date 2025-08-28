import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { suppliers } = usePage().props;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Suppliers</h1>
        <Link
          href={route('suppliers.create')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Supplier
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.data.map((supplier) => (
            <tr key={supplier.id} className="border">
              <td className="p-2">{supplier.name}</td>
              <td className="p-2">{supplier.contact_person}</td>
              <td className="p-2">{supplier.phone}</td>
              <td className="p-2">{supplier.email}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/suppliers/${supplier.id}/edit`} className="text-blue-600">
                  Edit
                </Link>
                <Link
                  as="button"
                  method="delete"
                  href={`/suppliers/${supplier.id}`}
                  className="text-red-600"
                  onClick={() => confirm('Are you sure?')}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

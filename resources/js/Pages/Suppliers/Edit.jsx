import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

export default function Edit() {
  const { supplier, errors } = usePage().props;

  const { data, setData, put, processing } = useForm({
    name: supplier.name || '',
    contact_person: supplier.contact_person || '',
    phone: supplier.phone || '',
    email: supplier.email || '',
    address: supplier.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('suppliers.update', supplier.id));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Supplier</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className="border p-2 rounded"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <input
          type="text"
          name="contact_person"
          placeholder="Contact Person"
          value={data.contact_person}
          onChange={(e) => setData('contact_person', e.target.value)}
          className="border p-2 rounded"
        />
        {errors.contact_person && <div className="text-red-500">{errors.contact_person}</div>}

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => setData('phone', e.target.value)}
          className="border p-2 rounded"
        />
        {errors.phone && <div className="text-red-500">{errors.phone}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          className="border p-2 rounded"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}

        <textarea
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={(e) => setData('address', e.target.value)}
          className="border p-2 rounded"
        />
        {errors.address && <div className="text-red-500">{errors.address}</div>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={processing}
          >
            {processing ? 'Updating...' : 'Update'}
          </button>

          <Link
            href={route('suppliers.index')}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';

export default function Edit() {
  const { customer, errors } = usePage().props;

  const [values, setValues] = useState({
    name: customer.name,
    contact_person: customer.contact_person || '',
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
  });

  const handleChange = (e) => {
    const key = e.target.name;
    setValues({ ...values, [key]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.put(route('customers.update', customer.id), values);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Customer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Contact Person', name: 'contact_person', type: 'text' },
          { label: 'Phone', name: 'phone', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Address', name: 'address', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              className={`border w-full p-2 rounded ${errors[field.name] ? 'border-red-500' : ''}`}
            />
            {errors[field.name] && <div className="text-red-500 mt-1">{errors[field.name]}</div>}
          </div>
        ))}

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <Link
            href={route('customers.index')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

import React from 'react';
import { useForm, Link, usePage } from '@inertiajs/react';

export default function Edit() {
  const { category } = usePage().props;

  const { data, setData, put, processing, errors } = useForm({
    name: category.name || '',
    description: category.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('categories.update', category.id));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            disabled={processing}
          />
          {errors.name && (
            <div className="text-red-600 mt-1 text-sm">{errors.name}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
            disabled={processing}
          />
          {errors.description && (
            <div className="text-red-600 mt-1 text-sm">{errors.description}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>

        <Link
          href={route('categories.index')}
          className="ml-4 text-gray-600 hover:underline"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}

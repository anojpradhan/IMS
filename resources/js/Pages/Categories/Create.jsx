import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('categories.store'));
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
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

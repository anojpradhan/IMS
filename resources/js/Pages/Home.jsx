// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-extrabold tracking-wide">IMS</h1>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-1 border border-white px-4 py-2 rounded-lg text-white hover:bg-white hover:text-indigo-600 transition"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
          <Link href="/register" className="flex items-center gap-1 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition">
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow max-w-7xl mx-auto px-6 py-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Manage Your Stocks <br /> Smarter & Faster
          </h2>
          <p className="mt-4 text-lg text-gray-200 max-w-lg">
            An intelligent Inventory Management System to track, update, and
            manage stock effortlessly with real-time updates.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition">
              <LayoutDashboard className="w-5 h-5" />
              Go to Dashboard
            </button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 mt-8 md:mt-0 flex justify-center"
        >
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/warehouse-inventory-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--storage-stockroom-goods-pack-illustrations-5795056.png"
            alt="Stock Management"
            className="w-full max-w-md"
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-white/20 text-center text-sm">
        © {new Date().getFullYear()} IMS — Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
}

import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
  Building2,
  LayoutDashboard,
  Plus,
  List,
  CheckCircle,
  ArrowRight,
  Package,
} from "lucide-react";

export default function Home() {
  // pull auth and organizations (if your backend provides them via Inertia props)
  const { auth, organizations = [] } = usePage().props;

  const userName = auth?.user?.name || auth?.user?.username || "User";

  const featureCards = [
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Centralized Dashboard",
      desc: "Quick snapshot of stock, alerts, and activity.",
    },
    {
      icon: <List className="w-8 h-8" />,
      title: "Manage Items & Stock",
      desc: "Add items, update quantities and track movements.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Automated Reports",
      desc: "Scheduled reports to help you make smarter decisions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Head title="Home" />

      {/* Top header (no sidebar) */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            InventoryPro
          </h1>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:shadow-md transition"
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>

          <button
            onClick={() => router.visit("/organizations/create")}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            aria-label="Create organization"
          >
            <Plus className="w-4 h-4" /> Create Organization
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative w-full bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Welcome back, <span className="text-blue-600">{userName}</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl">
              This is your Home. From here you can create an organization to start
              managing inventory, jump to the dashboard, or quickly learn how the
              system works. Everything uses the same InventoryPro theme for a
              consistent experience.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.visit("/organizations/create")}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-md"
              >
                <Building2 className="w-5 h-5" /> Create Organization
              </button>

              <Link
                href="/organizations"
                className="inline-flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-2xl text-gray-700 hover:shadow-md transition justify-center"
              >
                <List className="w-5 h-5" /> View Organizations
              </Link>
            </div>

            {/* quick stats */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">Organizations</div>
                <div className="text-xl font-bold">{organizations?.length || 0}</div>
              </div>

              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">Products</div>
                <div className="text-xl font-bold">—</div>
              </div>

              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
                <div className="text-xs text-gray-500">Pending Alerts</div>
                <div className="text-xl font-bold">—</div>
              </div>
            </div>
          </motion.div>

          {/* Right visual / cards (stacked on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="rounded-2xl p-4 bg-white shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Getting started</div>
                  <div className="font-semibold">Create your first organization</div>
                </div>
                <button
                  onClick={() => router.visit("/organizations/create")}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="w-4 h-4" /> Create
                </button>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Organizations help separate stock, users, and warehouses — create
                one to get started. You can add multiple organizations later.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureCards.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 bg-white shadow-sm border border-gray-100 flex items-start gap-3"
                >
                  <div className="p-2 bg-gray-50 rounded-lg">{f.icon}</div>
                  <div>
                    <div className="font-semibold">{f.title}</div>
                    <div className="text-sm text-gray-600">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to use */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-center">How to use InventoryPro</h3>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mt-3">
          Quick steps to get your account running — designed to be simple for new
          users.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="mt-4 font-semibold">1. Create Organization</h4>
            <p className="mt-2 text-sm text-gray-600">
              Set up an organization so you can add items, warehouses and users.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="mt-4 font-semibold">2. Add Items & Warehouses</h4>
            <p className="mt-2 text-sm text-gray-600">Populate stock and locations.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-red-600" />
            </div>
            <h4 className="mt-4 font-semibold">3. Monitor & Analyze</h4>
            <p className="mt-2 text-sm text-gray-600">Use dashboard and reports to decide.</p>
          </div>
        </div>
      </section>

      {/* Organizations preview */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Organizations</h3>
          <div className="text-sm text-gray-500">{organizations?.length || 0} total</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {organizations?.length > 0 ? (
            organizations.slice(0, 3).map((org) => (
              <div
                key={org.id}
                className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{org.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{org.description || "—"}</div>
                  </div>

                  <Link
                    href={`/organizations/${org.id}`}
                    className="inline-flex items-center gap-2 text-sm text-blue-600"
                  >
                    Open <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm text-center">
              <div className="font-semibold">You have no organizations yet</div>
              <div className="mt-2 text-sm text-gray-600">Create one to get started managing inventory.</div>
              <div className="mt-4">
                <button
                  onClick={() => router.visit("/organizations/create")}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" /> Create Organization
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 text-center text-sm bg-gray-50 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} InventoryPro — Advanced Inventory Management System.</p>
        </div>
      </footer>
    </div>
  );
}

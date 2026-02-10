// resources/js/Layouts/AppLayout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import {
    UserCircle,
    LogOut,
    Bell,
    Search,
    ChevronDown,
    Menu,
    Package,
} from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "@/store/slices/customerSlice";
import { fetchSuppliers } from "@/store/slices/supplierSlice";

export default function AppLayout({ children, title }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCustomers());
        dispatch(fetchSuppliers());
    }, []);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { auth } = usePage().props;

    // Handle scroll for header shadow
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            router.post(route("logout"));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
                {/* 🔹 Mobile Header */}
                <header
                    className={` md:hidden sticky h-fit top-0 z-20 transition-all duration-300 ${
                        isScrolled
                            ? "bg-white shadow-lg border-b border-gray-200"
                            : "bg-blue-700"
                    }`}
                    style={{
                        paddingTop: "env(safe-area-inset-top)",
                        paddingLeft: "env(safe-area-inset-left)",
                        paddingRight: "env(safe-area-inset-right)",
                    }}
                >
                    <div className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            {/* Left Section - Brand */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileOpen(true)}
                                    className="bg-red-600 hover:bg-red-500 p-2 rounded-md transition"
                                >
                                    <Menu size={22} />
                                </button>
                                <div>
                                    <h1 className="text-white font-bold text-lg">
                                        {title || "LogiTrek"}
                                    </h1>
                                </div>
                            </div>

                            {/* Right Section - Profile + Logout + Bell */}
                            <div className="flex items-center gap-3">
                                <button className="p-2 rounded-full bg-white text-blue-700 hover:bg-red-600 hover:text-white transition">
                                    <Bell size={18} />
                                </button>

                                <a
                                    href="/profile"
                                    className="p-2 rounded-full bg-red-600 text-white hover:bg-red-500 transition"
                                    title="Profile"
                                >
                                    <UserCircle size={18} />
                                </a>

                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Optional Search */}
                        {isScrolled && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3"
                            >
                                <div className="relative">
                                    <Search
                                        size={18}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </header>

                {/* 🔹 Desktop Header */}
                <header
                    className={`hidden md:flex top-0 z-20 bg-white border-b border-gray-200 transition-shadow duration-300 ${
                        isScrolled ? "shadow-lg" : "shadow-sm"
                    }`}
                >
                    <div className="flex-1 px-6 py-4 flex items-center justify-between">
                        {/* Left Section - Page Title */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {title || "Dashboard"}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                Welcome back, {auth.user?.name || "User"}!
                            </p>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                                    LogiTrek
                                </h1>
                            </div>

                            <div className="relative group">
                                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                        {auth.user?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "U"}
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400 group-hover:rotate-180 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
                                    >
                                        <UserCircle size={16} />
                                        Profile
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">{children}</div>
                </main>

                <footer className="bg-white border-t border-gray-200 mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-gray-600 text-center md:text-left">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-semibold text-blue-600">
                                LogiTrek
                            </span>{" "}
                            — Streamlined Inventory Management System
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

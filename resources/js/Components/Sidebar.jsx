import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    LayoutDashboard,
    Users,
    Package,
    Layers,
    List,
    Truck,
    ClipboardList,
    TrendingUp,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
    UserCircle,
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, link: "/dashboard" },
        { name: "Roles", icon: <Settings size={20} />, link: "/roles" },
        { name: "Users", icon: <Users size={20} />, link: "/users" },
        { name: "Categories", icon: <Layers size={20} />, link: "/categories" },
        { name: "Subcategories", icon: <List size={20} />, link: "/subcategories" },
        { name: "Suppliers", icon: <Truck size={20} />, link: "/suppliers" },
        { name: "Customers", icon: <Users size={20} />, link: "/customers" },
        { name: "Products", icon: <Package size={20} />, link: "/products" },
        { name: "Purchases", icon: <ClipboardList size={20} />, link: "/purchases" },
        { name: "Sales", icon: <TrendingUp size={20} />, link: "/sales" },
    ];

    return (
        <>
            {/* 🖥 Desktop Sidebar */}
            <aside
                className={`hidden md:flex flex-col justify-between bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-900 min-h-screen p-4 relative border-r border-gray-300 backdrop-blur-md transition-all duration-300 shadow-[2px_0_6px_rgba(0,0,0,0.1)]`}
                style={{ width: isOpen ? "16rem" : "5rem" }}
            >
                <div>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="absolute -right-3 top-6 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-500 hover:scale-105 transition"
                    >
                        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8 mt-2">
                        <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center font-bold shadow-md text-white">
                            L
                        </div>
                        {isOpen && (
                            <h2 className="text-xl font-semibold transition-opacity duration-300">
                                LogiTrek
                            </h2>
                        )}
                    </div>

                    {/* Menu Items */}
                    <ul className="space-y-2">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.link}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg group relative overflow-hidden"
                                >
                                    {/* Hover background with shadow */}
                                    <span className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg shadow-md group-hover:shadow-lg"></span>

                                    <span className="relative text-blue-600 group-hover:text-white transition-all duration-300">
                                        {item.icon}
                                    </span>

                                    {isOpen && (
                                        <span className="relative text-sm font-medium text-gray-800 group-hover:text-white transition-all duration-300">
                                            {item.name}
                                        </span>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {!isOpen && (
                                        <span className="absolute left-14 bg-gray-900 text-gray-200 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 text-xs whitespace-nowrap transition-opacity duration-200 z-50">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Profile Section */}
                <div className="mt-6 pt-4 border-t border-gray-400">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg group hover:bg-red-500 hover:shadow-md transition-all duration-300"
                    >
                        <span className="text-gray-700 group-hover:text-white transition-colors duration-300">
                            <UserCircle size={22} />
                        </span>
                        {isOpen && (
                            <span className="text-sm font-medium text-gray-800 group-hover:text-white transition-colors duration-300">
                                Profile
                            </span>
                        )}
                        {!isOpen && (
                            <span className="absolute left-14 bg-gray-900 text-gray-200 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 text-xs whitespace-nowrap transition-opacity duration-200">
                                Profile
                            </span>
                        )}
                    </Link>
                </div>
            </aside>

            {/* 📱 Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-50 flex md:hidden transition-transform duration-300 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setMobileOpen(false)}
                />
                <aside className="relative w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-4 shadow-2xl transition-transform duration-300">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X size={22} />
                    </button>

                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold shadow-md">
                            L
                        </div>
                        <h2 className="text-xl font-semibold">LogiTrek</h2>
                    </div>

                    <ul className="space-y-2">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.link}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 hover:shadow-md transition-all duration-300"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <span className="text-indigo-400">{item.icon}</span>
                                    <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Profile */}
                    <div className="mt-6 border-t border-gray-700 pt-4">
                        <Link
                            href="/profile"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 hover:shadow-md transition-all duration-300"
                        >
                            <UserCircle size={22} className="text-gray-300" />
                            <span className="text-sm font-medium">Profile</span>
                        </Link>
                    </div>
                </aside>
            </div>
        </>
    );
}

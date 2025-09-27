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
} from "lucide-react";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
    const [isOpen, setIsOpen] = useState(true); // desktop collapse

    const menuItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            link: "/dashboard",
        },
        { name: "Roles", icon: <Settings size={20} />, link: "/roles" },
        { name: "Users", icon: <Users size={20} />, link: "/users" },
        { name: "Categories", icon: <Layers size={20} />, link: "/categories" },
        {
            name: "Subcategories",
            icon: <List size={20} />,
            link: "/subcategories",
        },
        { name: "Suppliers", icon: <Truck size={20} />, link: "/suppliers" },
        { name: "Customers", icon: <Users size={20} />, link: "/customers" },
        { name: "Products", icon: <Package size={20} />, link: "/products" },
        {
            name: "Purchases",
            icon: <ClipboardList size={20} />,
            link: "/purchases",
        },
        { name: "Sales", icon: <TrendingUp size={20} />, link: "/sales" },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 text-gray-950 min-h-screen p-4 relative transition-all duration-300`}
                style={{ width: isOpen ? "16rem" : "5rem" }}
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-6 bg-red-700 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition"
                >
                    {isOpen ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

                {/* Logo / Title */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center font-bold transition-all duration-300">
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
                                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300 hover:bg-red-500 group relative"
                            >
                                {/* Icon */}
                                <span className="text-blue-500 group-hover:text-white transition-colors duration-300">
                                    {item.icon}
                                </span>

                                {/* Text */}
                                {isOpen && (
                                    <span className="text-sm font-medium text-gray-900 group-hover:text-white transition-colors duration-300">
                                        {item.name}
                                    </span>
                                )}

                                {/* Background Hover */}
                                <span className="absolute inset-0 bg-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[-1]"></span>

                                {/* Tooltip for collapsed sidebar */}
                                {!isOpen && (
                                    <span className="absolute left-20 bg-gray-900 text-gray-200 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 text-xs whitespace-nowrap transition-opacity duration-200">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Mobile Sidebar Drawer */}
            <div
                className={`fixed inset-0 z-50 flex md:hidden transition-transform duration-300 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setMobileOpen(false)}
                />
                <aside className="relative w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-4 shadow-lg transition-transform duration-300">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X size={22} />
                    </button>

                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
                            IMS
                        </div>
                        <h2 className="text-xl font-semibold">IMS Menu</h2>
                    </div>

                    <ul className="space-y-2">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={item.link}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <span className="text-indigo-400">
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </>
    );
}

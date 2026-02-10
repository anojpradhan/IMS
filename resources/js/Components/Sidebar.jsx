import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
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
    LogOut,
    Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const { auth, organizations = [] } = usePage().props;
    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
                setMobileOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            router.post(route("logout"));
        }
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
        { name: "Roles", icon: Settings, link: "/roles" },
        { name: "Users", icon: Users, link: "/users" },
        { name: "Categories", icon: Layers, link: "/categories" },
        { name: "Subcategories", icon: List, link: "/subcategories" },
        { name: "Suppliers", icon: Truck, link: "/suppliers" },
        { name: "Customers", icon: Users, link: "/customers" },
        { name: "Products", icon: Package, link: "/products" },
        { name: "Purchases", icon: ClipboardList, link: "/purchases" },
        { name: "Sales", icon: TrendingUp, link: "/sales" },
    ];

    const sidebarVariants = {
        open: { width: "15rem" },
        closed: { width: "4.5rem" },
    };

    const itemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -10 },
    };

    return (
        <div className="z-50">
            {/* Mobile menu button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed top-4 left-4 z-40 md:hidden bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-500 transition"
            >
                <Menu size={20} />
            </button>

            {/* Desktop Sidebar */}
            <motion.aside
                variants={sidebarVariants}
                initial="open"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
                className="hidden md:flex flex-col bg-white text-gray-900
             h-screen sticky top-0
             border-r border-gray-200 p-3 shadow-sm z-30 w-60"
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-6 bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-500 transition z-30"
                >
                    {isOpen ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>

                {/* Logo */}
                <div
                    className="flex items-center gap-3 mb-8 mt-2 min-h-[40px] overflow-hidden"
                    onClick={() => router.visit("dashboard")}
                >
                    <motion.div
                        // whileHover={{ scale: 1.05, rotate: 5 }}
                        className="h-10 w-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center font-bold shadow-md text-white flex-shrink-0 hover:cursor-pointer"
                    >
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.h2
                                key="logo-text"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-xl font-bold whitespace-nowrap hover:cursor-pointer"
                            >
                                LogiTrek
                            </motion.h2>
                        )}
                    </AnimatePresence>
                </div>

                {/* Menu Items */}
                <nav className="flex-1">
                    <ul className="space-y-1">
                        {menuItems.map((item, i) => {
                            const Icon = item.icon;
                            const isDisabled =
                                !auth?.user?.organization_id &&
                                organizations.length === 0;

                            return (
                                <li key={i}>
                                    {isDisabled ? (
                                        <div
                                            className="flex items-center gap-3 px-3 py-3 text-gray-400 bg-gray-100 rounded-md opacity-60 cursor-not-allowed"
                                            title="Access disabled until you join or create an organization"
                                        >
                                            <Icon size={20} />
                                            {isOpen && <span>{item.name}</span>}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.link}
                                            className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition-all duration-200 text-gray-800"
                                        >
                                            <Icon size={20} />
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.span
                                                        variants={itemVariants}
                                                        initial="closed"
                                                        animate="open"
                                                        exit="closed"
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                    >
                                                        {item.name}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Actions */}
                <div className="mt-auto border-t pt-3 border-gray-200 space-y-2">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition"
                    >
                        <UserCircle size={20} />
                        {isOpen && <span>Profile</span>}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition w-full text-left"
                    >
                        <LogOut size={20} />
                        {isOpen && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-900 shadow-md p-4 flex flex-col md:hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-600 rounded-lg">
                                        <Package className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-blue-700">
                                        LogiTrek
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="text-gray-500 hover:text-red-600"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            {/* Menu */}
                            <nav className="flex-1 overflow-y-auto">
                                <ul className="space-y-1">
                                    {menuItems.map((item, i) => {
                                        const Icon = item.icon;
                                        const isDisabled =
                                            !auth?.user?.organization_id &&
                                            organizations.length === 0;
                                        return (
                                            <li key={i}>
                                                {isDisabled ? (
                                                    <div
                                                        className="flex items-center gap-3 px-3 py-3 text-gray-400 bg-gray-100 rounded-md opacity-60 cursor-not-allowed"
                                                        title="Access disabled until you join or create an organization"
                                                    >
                                                        <Icon size={20} />
                                                        <span>{item.name}</span>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={item.link}
                                                        onClick={() =>
                                                            setMobileOpen(false)
                                                        }
                                                        className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition text-gray-800"
                                                    >
                                                        <Icon size={20} />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>

                            {/* User Section */}
                            <div className="mt-auto border-t pt-3 border-gray-200 space-y-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition"
                                >
                                    <UserCircle size={20} />
                                    <span>Profile</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setTimeout(handleLogout, 300);
                                    }}
                                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-red-600 hover:text-white transition w-full text-left"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

// resources/js/Layouts/AppLayout.jsx
import React, { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import { Menu } from "lucide-react";

export default function AppLayout({ children, title }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (desktop) */}
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar for mobile */}
                <header className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">
                            IMS
                        </div>
                        <span className="font-semibold">{title}</span>
                    </div>
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 rounded-md hover:bg-gray-800 transition"
                    >
                        <Menu size={22} />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}


import { Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 bg-gray-100 min-h-screen p-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">
                            Welcome to IMS Dashboard
                        </h3>
                        <p className="text-gray-700">
                            Select a section from the sidebar to manage your
                            inventory data.
                        </p>
                    </div>
                </main>
            </div>
            </>
    );
}

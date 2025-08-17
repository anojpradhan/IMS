import { Head, usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { Button } from "@headlessui/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    console.log("User:", user);
    console.log("Organization ID:", user?.organization_id);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-6 flex items-center justify-center">
                    {user?.organization_id ? (
                        <div className="bg-white shadow-sm sm:rounded-lg p-6 w-full">
                            <h3 className="text-lg font-bold mb-4">
                                Welcome to IMS Dashboard
                            </h3>
                            <p className="text-gray-700">
                                Select a section from the sidebar to manage your
                                inventory data.
                            </p>
                            <Link
                                href={route("organizations.edit")}
                                className="inline-block"
                            >
                                <Button className="px-6 py-3 text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105">
                                    Your Organization
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                No Organization Found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Please create an organization to get started.
                            </p>

                            <Link
                                href={route("organizations.create")}
                                className="inline-block"
                            >
                                <Button className="px-6 py-3 text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105">
                                    Create Organization
                                </Button>
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

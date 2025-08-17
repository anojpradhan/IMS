import { Head, usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { Button } from "@headlessui/react";
// import { Button } from "@/components/ui/button";
 // if using shadcn/ui, else style with Tailwind


export default function Dashboard() {
    const { auth } = usePage().props; 
    const user = auth?.user;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex">
                <Sidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-6 flex items-center justify-center">
                    {user?.org_id ? (
                        <div className="bg-white shadow-sm sm:rounded-lg p-6 w-full">
                            <h3 className="text-lg font-bold mb-4">
                                Welcome to IMS Dashboard
                            </h3>
                            <p className="text-gray-700">
                                Select a section from the sidebar to manage your
                                inventory data.
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                No Organization Found
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Please create an organization to get started.
                            </p>

                            {/* <Link href={route("/")}> */}
                                <Button className="px-6 py-3 text-lg rounded-2xl shadow-lg transition-transform transform hover:scale-105">
                                    🚀 Create Organization
                                </Button>
                            {/* </Link> */}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

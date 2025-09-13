// resources/js/Components/Sidebar.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Package,
  Layers,
  List,
  Truck,
  ShoppingCart,
  ClipboardList,
  TrendingUp,
  Boxes,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/dashboard" },
    { name: "Roles", icon: <Settings size={18} />, link: "/roles" },
    { name: "Users", icon: <Users size={18} />, link: "/users" },
    { name: "Categories", icon: <Layers size={18} />, link: "/categories" },
    { name: "Subcategories", icon: <List size={18} />, link: "/subcategories" },
    { name: "Suppliers", icon: <Truck size={18} />, link: "/suppliers" },
    { name: "Customers", icon: <Users size={18} />, link: "/customers" },
    { name: "Products", icon: <Package size={18} />, link: "/products" },
    { name: "Purchases", icon: <ClipboardList size={18} />, link: "/purchases" },
    // { name: "Purchase Items", icon: <Boxes size={18} />, link: "/purchase-items" },
    { name: "Sales", icon: <TrendingUp size={18} />, link: "/sales" },
    // { name: "Sale Items", icon: <Boxes size={18} />, link: "/sale-items" },
    // { name: "Stock Movements", icon: <Package size={18} />, link: "/stock-movements" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen p-4 hidden md:block">
      <h2 className="text-lg font-bold mb-6 px-2">IMS Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.link}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

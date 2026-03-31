import Link from "next/link";
import { FaServicestack, FaProjectDiagram, FaBlog, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token");
    router.push("/admin/login");
  };

  const sections = [
    { href: "/admin/dashboard/services", label: "Manage Services", icon: <FaServicestack size={30} /> },
    { href: "/admin/dashboard/projects", label: "Manage Projects", icon: <FaProjectDiagram size={30} /> },
    { href: "/admin/dashboard/blogs", label: "Manage Blog", icon: <FaBlog size={30} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="flex items-center text-red-600 hover:text-red-800">
          <FaSignOutAlt className="mr-1" /> Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">

            <div className="mb-4">{s.icon}</div>
            <p className="text-xl font-semibold">{s.label}</p>

          </Link>
        ))}
      </div>
    </div>
  );
}
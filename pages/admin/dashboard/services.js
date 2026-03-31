import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const fetch = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/services", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServices(data);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
  }, []);

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;
    await axios.delete(`/api/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServices(services.filter((s) => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <Link
          href="/admin/dashboard/services/add"
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">

          <FaPlus className="mr-2" />Add Service
                    
        </Link>
      </div>
      {loading ? <p>Loading…</p> : (
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2">{s.title}</td>
                <td className="p-2">{s.category}</td>
                <td className="p-2 flex space-x-2">
                  <Link
                    href={`/admin/dashboard/services/edit?id=${s._id}`}
                    className="text-primary">
                    <FaEdit />
                  </Link>
                  <button onClick={() => deleteService(s._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
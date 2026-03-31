import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function AddService() {
  const router = useRouter();
  const token = Cookies.get("token");
  const [form, setForm] = useState({ title: "", description: "", category: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await axios.post("/api/services", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSaving(false);
    router.push("/admin/dashboard/services");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={4} required className="w-full p-2 border rounded"></textarea>
        <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" disabled={saving} className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80">
          {saving ? "Saving…" : "Create Service"}
        </button>
      </form>
    </div>
  );
}
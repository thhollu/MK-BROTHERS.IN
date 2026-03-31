import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await axios.get(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await axios.put(`/api/blogs/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSaving(false);
    router.push("/admin/dashboard/blogs");
  };

  if (loading) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="content" placeholder="Content (HTML)" value={form.content} onChange={handleChange} rows={8} required className="w-full p-2 border rounded"></textarea>
        <input name="imageUrl" placeholder="Image URL (optional)" value={form.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" disabled={saving} className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80">
          {saving ? "Saving…" : "Update Post"}
        </button>
      </form>
    </div>
  );
}
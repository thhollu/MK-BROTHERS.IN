import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const token = Cookies.get("token");
  const [form, setForm] = useState({ title: "", description: "", images: "", resumeUrl: "", year: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const { data } = await axios.get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({
        ...data,
        images: data.images ? data.images.join(", ") : ""
      });
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      images: form.images ? form.images.split(",").map(s => s.trim()).filter(Boolean) : []
    };
    await axios.put(`/api/projects/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSaving(false);
    router.push("/admin/dashboard/projects");
  };

  if (loading) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="year" placeholder="Year (optional)" value={form.year} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={4} required className="w-full p-2 border rounded"></textarea>
        <input name="images" placeholder="Image URLs (comma separated)" value={form.images} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="resumeUrl" placeholder="Resume URL (PDF)" value={form.resumeUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" disabled={saving} className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80">
          {saving ? "Saving…" : "Update Project"}
        </button>
      </form>
    </div>
  );
}
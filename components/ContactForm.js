import { useState } from "react";
import axios from "axios";

export default function ContactForm({ type }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contacts`, { ...form, type });
      setStatus("Your message has been sent.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">{type} Form</h3>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="message" rows={4} placeholder="Your Message" value={form.message} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <button type="submit" disabled={loading} className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/80">
          {loading ? "Sending…" : "Submit"}
        </button>
        {status && <p className="mt-2 text-green-600">{status}</p>}
      </form>
    </div>
  );
}
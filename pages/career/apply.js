import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";

export default function Apply() {
  const router = useRouter();
  const { jobId } = router.query;
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({ name: "", email: "", phone: "", resume: null });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "resume")
      setForm({ ...form, resume: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await axios.post(`${API}/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data.fileUrl;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let resumeUrl = "";
      if (form.resume) {
        resumeUrl = await uploadFile(form.resume);
      }
      await axios.post(`${API}/contacts`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `Applying for job ${jobId}. Resume: ${resumeUrl}`,
        type: "Support"
      });
      setStatus("Application submitted successfully.");
      setForm({ name: "", email: "", phone: "", resume: null });
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Apply for Job</h1>
        <form onSubmit={submit} className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white w-full py-2 rounded hover:bg-primary/80"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
          {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        </form>
      </div>
    </section>
  );
}
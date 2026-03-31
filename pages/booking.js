import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Booking() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [form, setForm] = useState({
    bookingType: "Demo",
    name: "",
    email: "",
    phone: "",
    dateTime: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/bookings`, form);
      setStatus("Your booking request has been received.");
      setForm({
        bookingType: "Demo",
        name: "",
        email: "",
        phone: "",
        dateTime: "",
        notes: ""
      });
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Book a Demo / Factory Visit
        </h1>
        <form onSubmit={submit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <label>Booking Type</label>
          <select
            name="bookingType"
            value={form.bookingType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Demo">Demo Ride</option>
            <option value="FactoryVisit">Factory Visit</option>
          </select>

          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
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
          <label>Preferred Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white w-full py-2 rounded hover:bg-primary/80"
          >
            {loading ? "Submitting…" : "Submit Booking"}
          </button>

          {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        </form>
      </div>
    </section>
  );
}
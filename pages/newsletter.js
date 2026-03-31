import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Newsletter() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletters/subscribe`, { email });
      setStatus("Successfully subscribed!");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Subscribe to Newsletter</h1>
        <form onSubmit={subscribe} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded hover:bg-primary/80"
          >
            {loading ? "Submitting…" : "Subscribe"}
          </button>
        </form>
        {status && <p className="mt-4 text-green-600">{status}</p>}
      </div>
    </section>
  );
}
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mk-brothers.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="admin@mk-brothers.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Checkout() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/payments`, {
        amount,
        description: "MK Brothers Order"
      });
      setPaymentUrl(data.paymentUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      setTimeout(() => router.push("/payment-success"), 2000);
    }
  }, [paymentUrl]);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <label className="block mb-2">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={startPayment}
            disabled={loading || amount <= 0}
            className="bg-primary text-white w-full py-2 rounded hover:bg-primary/80"
          >
            {loading ? "Processing…" : "Pay Now"}
          </button>
        </div>
      </div>
    </section>
  );
}
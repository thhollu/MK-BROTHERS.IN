import { useState } from "react";

export default function CalculatorInvestor() {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState(5);
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const inv = parseFloat(amount);
    const yr = parseInt(years);
    if (inv > 0 && yr > 0) {
      const yearly = inv * 0.08;
      const depreciation = inv * 0.03 * yr; // mock 3 % per year
      const total = yearly * yr + depreciation;
      setResult({ yearly, total });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Investor Scheme Calculator</h2>
      <form onSubmit={calculate} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Investment (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Investment term (years)</label>
          <input type="number" min="1" max="10" value={years} onChange={(e) => setYears(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded col-span-2 hover:bg-primary/80">
          Calculate Earnings
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <p>Yearly 8 % Return: <strong>₹{result.yearly.toFixed(2)}</strong></p>
          <p>Total after {years} years (incl. depreciation): <strong>₹{result.total.toFixed(2)}</strong></p>
        </div>
      )}
    </div>
  );
}
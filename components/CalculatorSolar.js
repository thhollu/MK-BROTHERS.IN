import { useState } from "react";

export default function CalculatorSolar() {
  const [cost, setCost] = useState("");
  const [annualSaving, setAnnualSaving] = useState("");
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const c = parseFloat(cost);
    const s = parseFloat(annualSaving);
    if (c > 0 && s > 0) {
      setResult({
        payback: (c / s).toFixed(2),
        roi: ((s / c) * 100).toFixed(2)
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Solar ROI Calculator</h2>
      <form onSubmit={calculate} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">System Cost (₹)</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Annual Savings (₹)</label>
          <input type="number" value={annualSaving} onChange={(e) => setAnnualSaving(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded col-span-2 hover:bg-primary/80">
          Calculate
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <p>Payback Period: <strong>{result.payback} years</strong></p>
          <p>ROI: <strong>{result.roi}% per year</strong></p>
        </div>
      )}
    </div>
  );
}
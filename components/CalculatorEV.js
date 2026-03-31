import { useState } from "react";

export default function CalculatorEV() {
  const [fuelCost, setFuelCost] = useState("");
  const [electricCost, setElectricCost] = useState("");
  const [kmPerYear, setKmPerYear] = useState("");
  const [savings, setSavings] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const f = parseFloat(fuelCost);
    const eCost = parseFloat(electricCost);
    const km = parseFloat(kmPerYear);
    if (f > 0 && eCost > 0 && km > 0) {
      const annualFuel = f * km;
      const annualElec = eCost * km;
      setSavings((annualFuel - annualElec).toFixed(2));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">EV vs Petrol/Diesel Savings</h2>
      <form onSubmit={calculate} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Fuel Cost per km (₹)</label>
          <input type="number" value={fuelCost} onChange={(e) => setFuelCost(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Electricity Cost per km (₹)</label>
          <input type="number" value={electricCost} onChange={(e) => setElectricCost(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">Average km per year</label>
          <input type="number" value={kmPerYear} onChange={(e) => setKmPerYear(e.target.value)} required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded col-span-2 hover:bg-primary/80">
          Calculate Savings
        </button>
      </form>
      {savings !== null && (
        <div className="mt-4">
          <p>Estimated Annual Savings: <strong>₹{savings}</strong></p>
        </div>
      )}
    </div>
  );
}
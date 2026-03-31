import CalculatorSolar from "../components/CalculatorSolar";
import CalculatorEV from "../components/CalculatorEV";
import CalculatorRetrofit from "../components/CalculatorRetrofit";
import CalculatorInvestor from "../components/CalculatorInvestor";

export default function Calculators() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 space-y-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          ROI Calculators
        </h1>
        <CalculatorSolar />
        <CalculatorEV />
        <CalculatorRetrofit />
        <CalculatorInvestor />
      </div>
    </section>
  );
}
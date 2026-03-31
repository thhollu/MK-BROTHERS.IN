import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = {
  EV: [
    { q: "How long does an EV battery last?", a: "Typical EV batteries retain ~80% capacity after 5‑7 years." },
    { q: "What is the warranty on retrofit kits?", a: "We provide a 2‑year warranty on all retrofit components." }
  ],
  Solar: [
    { q: "How much solar can I install on a 500 sqm roof?", a: "Approximately 150 kW (depends on orientation)." },
    { q: "Do you offer post‑installation monitoring?", a: "Yes, real‑time monitoring via our dashboard." }
  ],
  Automation: [
    { q: "Can you integrate with existing PLCs?", a: "Absolutely – we work with Siemens, Allen‑Bradley, & others." }
  ]
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [question, setQuestion] = useState(null);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80"
      >
        <FaRobot />
      </button>

      <AnimatePresence>{open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg mt-2 w-80 max-h-[70vh] overflow-y-auto"
        >
          <h3 className="font-semibold mb-2">FAQ Bot</h3>
          {!category && (
            <>
              <p className="mb-2">Select a domain:</p>
              <ul className="space-y-2">
                {Object.keys(FAQ).map((cat) => (
                  <li key={cat} className="cursor-pointer text-primary hover:underline" onClick={() => setCategory(cat)}>
                    {cat}
                  </li>
                ))}
              </ul>
            </>
          )}

          {category && !question && (
            <>
              <button onClick={() => setCategory(null)} className="text-sm underline mb-2">← Back to domains</button>
              <ul className="space-y-2">
                {FAQ[category].map((item, i) => (
                  <li key={i} className="cursor-pointer hover:text-primary" onClick={() => setQuestion(item)}>{item.q}</li>
                ))}
              </ul>
            </>
          )}

          {question && (
            <>
              <button onClick={() => setQuestion(null)} className="text-sm underline mb-2">← Back to questions</button>
              <p className="font-medium">{question.q}</p>
              <p className="mt-2">{question.a}</p>
            </>
          )}
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}
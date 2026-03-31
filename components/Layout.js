import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AnimatePresence mode='wait'>
        <motion.main
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <Chatbot />
    </>
  );
}
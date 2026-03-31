import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function ServiceCard({ service }) {
  const { title, description, imageUrl } = service;
  return (
    <motion.div
      className="bg-white dark:bg-gray-700 rounded-lg shadow hover:shadow-xl transition"
      whileHover={{ scale: 1.02 }}
    >
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        <a href="#" className="text-primary inline-flex items-center">
          Learn More <FaArrowRight className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
}
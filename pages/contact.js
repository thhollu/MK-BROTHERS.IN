import ContactForm from "../components/ContactForm";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import GoogleMap from "../components/GoogleMap";

export default function Contact() {
  const types = ["Dealer", "Customer", "Solar", "Support", "Investor"];
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((t) => (
            <ContactForm key={t} type={t} />
          ))}
        </div>

        {/* Map & quick contact */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
          <GoogleMap />
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="tel:9988977549"
              className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
            >
              <FaPhoneAlt className="mr-2" /> Call Us
            </a>
            <a
              href="https://wa.me/919988977549"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
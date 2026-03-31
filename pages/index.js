import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API}/services`);
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
            MK Brothers
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            18+ years of Engineering Excellence (Since 2008)
          </p>
          <a
            href="#services"
            className="inline-block bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/80 transition"
          >
            Explore Services
          </a>
        </div>

        <DarkModeToggle className="absolute top-4 right-4 z-20" />
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Services
          </h2>
          {loading ? <Loader /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-white text-center">
        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
        <div className="flex justify-center gap-4">
          <a
            href="tel:9988977549"
            className="flex items-center bg-white text-primary px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            <FaPhoneAlt className="mr-2" /> Call Us
          </a>
          <a
            href="https://wa.me/919988977549"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
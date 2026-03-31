import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";

export default function ServicesPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await axios.get(`${API}/services`);
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Our Services
        </h1>
        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
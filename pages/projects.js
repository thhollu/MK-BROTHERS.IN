import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";

export default function ProjectsPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await axios.get(`${API}/projects`);
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Portfolio
        </h1>
        {loading ? <Loader /> : (
          <div className="space-y-8">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
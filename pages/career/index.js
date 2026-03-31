import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Link from "next/link";

export default function Career() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await axios.get(`${API}/careers`);
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Career Opportunities
        </h1>
        {loading ? <Loader /> : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
              >
                <h2 className="text-2xl font-semibold mb-2">{job.jobTitle}</h2>
                <p className="mb-2">{job.location}</p>
                <p className="mb-4">{job.description}</p>
                <Link href={`/career/apply?jobId=${job._id}`}>
                  <a className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
                    Apply Now
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/BlogCard";
import Loader from "../../components/Loader";

export default function Blog() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      try {
        const { data } = await axios.get(`${API}/blogs`);
        setPosts(data);
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
          Blog & News
        </h1>
        {loading ? <Loader /> : (
          <div className="space-y-6">
            {posts.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
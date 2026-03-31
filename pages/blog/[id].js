import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import Image from "next/image";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const get = async () => {
      try {
        const { data } = await axios.get(`${API}/blogs/${id}`);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [id]);

  if (loading) return <Loader />;
  if (!post) return <p className="text-center py-8">Post not found.</p>;

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded mb-6"
          />
        )}
        <div
          className="prose dark:prose-dark max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
}
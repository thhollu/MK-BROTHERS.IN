import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  const { title, imageUrl, author, _id } = post;
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {imageUrl && (
        <Image src={imageUrl} alt={title} width={800} height={400} className="rounded mb-4" />
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">By {author}</p>
      <Link href={`/blog/${_id}`}>
        <a className="text-primary font-semibold">Read more →</a>
      </Link>
    </div>
  );
}
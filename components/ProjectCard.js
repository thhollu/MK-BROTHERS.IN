import Image from "next/image";
import { FaDownload } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const { title, description, images, resumeUrl } = project;
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      {images?.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {images.map((src, i) => (
            <Image key={i} src={src} alt={`${title} ${i}`} width={300} height={200} objectFit="cover" className="rounded" />
          ))}
        </div>
      )}
      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary text-white px-3 py-1 rounded hover:bg-primary/80"
        >
          <FaDownload className="mr-1" />
          Owner Resume
        </a>
      )}
    </div>
  );
}
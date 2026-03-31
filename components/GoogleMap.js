export default function GoogleMap() {
  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=MK+Brothers,Samana,Punjab`;
  return (
    <div className="relative w-full aspect-w-16 aspect-h-9 rounded overflow-hidden">
      <iframe
        src={src}
        loading="lazy"
        allowFullScreen
        className="w-full h-full border-0"
      />
    </div>
  );
}
export function Card2({ alt, image }: { alt: string; image: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:w-sm md:h-56">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4"></div>
    </div>
  );
}

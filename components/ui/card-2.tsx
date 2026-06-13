import Image from "next/image";

export function Card2({ alt, image }: { alt: string; image: string }) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#ece7e4] bg-[#f4f1ef] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 60vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}

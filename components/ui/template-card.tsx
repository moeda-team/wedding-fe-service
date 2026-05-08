export function TemplateCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border  shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {" "}
      <div className="aspect-[4/3] overflow-hidden">
        {" "}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />{" "}
      </div>{" "}
      <div className="p-4">
        {" "}
        <h3 className="font-medium text-[#2f2623]"> {title} </h3>{" "}
        <p className="mt-1 text-sm text-muted-foreground"> {description} </p>{" "}
        <button className="mt-4 w-full rounded-xl bg-[#d9a18f] py-2 text-sm font-medium text-white transition hover:bg-[#c88f7b]">
          {" "}
          Gunakan Template{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}

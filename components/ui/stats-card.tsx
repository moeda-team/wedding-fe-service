export function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-linear-to-br/decreasing from-white via-white to-pink-linear p-6 shadow-sm">
      <div className="flex items-center gap-2 text-font-black-primary">
        <div className="bg-gray-50 p-4 rounded-full">{icon}</div>
        <p className="text-2xl ">{title}</p>
      </div>

      <h3 className="mt-4 ml-2 text-4xl font-bold text-[#2f2623] font-geist ">
        {value}
      </h3>
    </div>
  );
}

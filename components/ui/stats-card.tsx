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
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <p className="text-sm">{title}</p>
      </div>

      <h3 className="mt-4 text-4xl font-bold text-[#2f2623]">{value}</h3>
    </div>
  );
}

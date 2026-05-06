type Props = {
  title: string;
  children: React.ReactNode;
};

export function PageWrapper({
  title,
  children,
}: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {title}
      </h1>

      {children}
    </div>
  );
}
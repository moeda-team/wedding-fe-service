type Props = {
  title?: string;
  children: React.ReactNode;
};

export function PageWrapper({ title, children }: Props) {
  return (
    <div className="px-1 grid grid-cols-1 space-y-8">
      {title && (
        <h1 className="text-2xl font-semibold text-[#2f2623]">{title}</h1>
      )}
      <div>{children}</div>
    </div>
  );
}

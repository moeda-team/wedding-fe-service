export function FeatureBadge({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-full border border-[#ead4cc] bg-white/70 px-4 py-2 text-sm text-[#6b5f5b] backdrop-blur">
      {text}
    </div>
  );
}

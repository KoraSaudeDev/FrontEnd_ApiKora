export function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className } = props;
  return <div className={`animate-pulse rounded bg-[#D9D9D9] ${className}`} />;
}

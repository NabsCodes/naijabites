import { Stat } from "@/lib/mock-data/stats";

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="mb-4 text-4xl">
        {typeof stat.icon === "string" ? (
          stat.icon
        ) : (
          <stat.icon className="mx-auto h-12 w-12 text-green-dark" />
        )}
      </div>
      <div className="stat-number">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

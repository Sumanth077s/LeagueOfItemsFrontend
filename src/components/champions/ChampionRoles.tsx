import RoleCard from "../roles/RoleCard";

export default function ChampionRoles({ roleStats }) {
  return (
    <div className="flex flex-row space-x-3">
      {roleStats.map((stats) => (
        <RoleCard key={stats.role} {...stats} />
      ))}
    </div>
  );
}

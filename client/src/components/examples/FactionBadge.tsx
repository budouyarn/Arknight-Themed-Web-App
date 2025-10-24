import FactionBadge from '../FactionBadge';

export default function FactionBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <FactionBadge faction="Rhodes Island" />
      <FactionBadge faction="Lungmen" />
      <FactionBadge faction="Ursus" />
      <FactionBadge faction="Victoria" />
    </div>
  );
}

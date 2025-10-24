import GuestCard from '../GuestCard';

export default function GuestCardExample() {
  const guest = {
    id: "1",
    name: "Amiya",
    faction: "Rhodes Island",
    tableId: "rhodes-island"
  };
  
  const table = {
    id: "rhodes-island",
    name: "Rhodes Island",
    gridX: 0,
    gridY: 0
  };

  return <GuestCard guest={guest} table={table} />;
}

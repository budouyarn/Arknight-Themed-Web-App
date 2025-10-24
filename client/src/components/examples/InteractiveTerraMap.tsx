import InteractiveTerraMap from '../InteractiveTerraMap';
import { useState } from 'react';
import type { Faction } from '@shared/schema';

export default function InteractiveTerraMapExample() {
  const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);

  const tables = [
    { id: "rhodes-island", name: "Rhodes Island", gridX: 2, gridY: 1 },
    { id: "lungmen", name: "Lungmen", gridX: 3, gridY: 1 },
    { id: "ursus", name: "Ursus", gridX: 0, gridY: 2 },
  ];

  const guestCounts = {
    "rhodes-island": 5,
    "lungmen": 5,
    "ursus": 5,
  };

  return (
    <InteractiveTerraMap
      tables={tables}
      guestCounts={guestCounts}
      selectedFaction={selectedFaction}
      onFactionSelect={setSelectedFaction}
    />
  );
}

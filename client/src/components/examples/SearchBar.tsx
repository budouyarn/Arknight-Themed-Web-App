import SearchBar from '../SearchBar';
import { useState } from 'react';
import type { Faction } from '@shared/schema';

export default function SearchBarExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFactions, setSelectedFactions] = useState<Faction[]>([]);

  const handleFactionToggle = (faction: Faction) => {
    setSelectedFactions(prev =>
      prev.includes(faction)
        ? prev.filter(f => f !== faction)
        : [...prev, faction]
    );
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedFactions([]);
  };

  return (
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedFactions={selectedFactions}
      onFactionToggle={handleFactionToggle}
      onClearAll={handleClearAll}
    />
  );
}

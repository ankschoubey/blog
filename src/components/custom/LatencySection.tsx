import { useState, useMemo, useCallback } from 'react';
import { entries, Unit } from '../../data/latency-entries';
import { getGridFilterState, type LocationVisibility } from '../../utils/gridFilter';
import { LatencyGrid } from './LatencyGrid';
import { LatencyGridFilter } from './LatencyGridFilter';
import { FlashCardQuiz } from './FlashCardQuiz';

export const LatencySection = () => {
  const [visibility, setVisibility] = useState<LocationVisibility>(() => getGridFilterState());

  const handleFilterChange = useCallback((next: LocationVisibility) => {
    setVisibility(next);
  }, []);

  const filteredEntries = useMemo(
    () => entries.filter((e) => visibility[e.location]),
    [visibility],
  );

  return (
    <>
      <LatencyGridFilter onChange={handleFilterChange} />

      <LatencyGrid entries={filteredEntries} currentUnit={Unit.ns} label="ns" id="grid-ns" />
      <LatencyGrid entries={filteredEntries} currentUnit={Unit.microS} label="μs" id="grid-us" />
      <LatencyGrid entries={filteredEntries} currentUnit={Unit.mS} label="ms" id="grid-ms" />

      <h1 id="LatencyQuiz" className="text-3xl font-bold mt-16 mb-2">Latency Quiz</h1>
      <p className="text-gray-500 mb-8">Test your knowledge</p>

      <FlashCardQuiz entries={filteredEntries} totalQuestions={10} />
    </>
  );
};

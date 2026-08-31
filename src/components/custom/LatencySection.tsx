import { useState, useMemo, useCallback } from 'react';
import { entries, Unit } from '../../data/latency-entries';
import { getGridFilterState, saveGridFilterState, type LocationVisibility } from '../../utils/gridFilter';
import { LatencyGrid } from './LatencyGrid';
import { LatencyGridFilter } from './LatencyGridFilter';
import { FlashCardQuiz } from './FlashCardQuiz';

export const LatencySection = () => {
  const [visibility, setVisibility] = useState<LocationVisibility>(() => getGridFilterState());

  const handleFilterChange = useCallback((next: LocationVisibility) => {
    setVisibility(next);
    saveGridFilterState(next);
  }, []);

  const filteredEntries = useMemo(
    () => entries.filter((e) => visibility[e.location]),
    [visibility],
  );

  return (
    <>
      <LatencyGridFilter visibility={visibility} onChange={handleFilterChange} />

      <p className="text-sm text-gray-400 mb-4 border-[2px] border-white/15 p-3">
        Each grid is arranged by <strong className="text-gray-300">multiples of 1, 2, 5</strong> across the
        columns and <strong className="text-gray-300">multipliers 1, 10, 100</strong> down the rows. One grid per
        unit — <strong className="text-gray-300">ns, μs, ms, s</strong> — from fastest to slowest. Colors track the
        entry category, and overall hotter shades (reds) mark the fastest hardware, cooling toward blues and
        purples as latency climbs.
      </p>

      <p className="text-sm text-gray-400 mb-6 border-[2px] border-white/15 p-3">
        <strong className="text-gray-300">Warehouse queries (very high level).</strong>
        Snowflake query times depend on warehouse size, data volume, caching, and query plan.
        Entries in the ms and s grids are napkin anchors, not benchmarks.
      </p>

      <LatencyGrid entries={filteredEntries} currentUnit={Unit.ns} label="ns" id="grid-ns" />
      <LatencyGrid entries={filteredEntries} currentUnit={Unit.microS} label="μs" id="grid-us" />
      <LatencyGrid entries={filteredEntries} currentUnit={Unit.mS} label="ms" id="grid-ms" />
      <LatencyGrid entries={filteredEntries} currentUnit={Unit.s} label="s" id="grid-s" />

      <h1 id="LatencyQuiz" className="text-3xl font-bold mt-16 mb-2">Latency Quiz</h1>
      <p className="text-gray-500 mb-8">Test your knowledge</p>

      <FlashCardQuiz entries={filteredEntries} totalQuestions={10} />
    </>
  );
};

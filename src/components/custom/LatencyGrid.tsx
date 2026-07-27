import { type LatencyEntry, type Unit, LocationColors, type Location } from '../../data/latency-entries';

interface LatencyGridProps {
  entries: LatencyEntry[];
  currentUnit: Unit;
  label: string;
}

const buckets = [1, 2, 5] as const;
const multipliers = [1, 10, 100] as const;

export const LatencyGrid = ({ entries, currentUnit, label }: LatencyGridProps) => {
  const filtered = entries.filter((e) => e.unit === currentUnit);

  const grid = new Map<string, LatencyEntry[]>();
  for (const b of buckets) {
    for (const m of multipliers) {
      grid.set(`${b}-${m}`, []);
    }
  }

  for (const entry of filtered) {
    const key = `${entry.bucket}-${entry.multiplier}`;
    grid.get(key)?.push(entry);
  }

  const presentLocations = [...new Set(filtered.map((e) => e.location))];

  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold mb-4">{label}</h2>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-[480px]">
          {/* x-axis labels */}
          <div className="grid grid-cols-[60px_1fr_1fr_1fr] mb-2">
            <div />
            {buckets.map((b) => (
              <div key={b} className="text-center text-sm font-medium text-gray-500">
                {b}
              </div>
            ))}
          </div>

          {/* grid rows */}
          {multipliers.map((m) => (
            <div key={m} className="grid grid-cols-[60px_1fr_1fr_1fr] gap-2 mb-2">
              {/* y-axis label */}
              <div className="flex items-center justify-end pr-2 text-sm font-medium text-gray-500">
                {m}
              </div>

              {/* cells */}
              {buckets.map((b) => {
                const items = grid.get(`${b}-${m}`) ?? [];
                return (
                  <div
                    key={`${b}-${m}`}
                    className="border border-gray-200 rounded p-2 min-h-[80px] hover:bg-gray-50 transition-colors"
                  >
                    {items.map((item) => (
                      <div key={item.name} className={`${LocationColors[item.location]} text-sm leading-tight py-0.5`}>
                        <span>{item.name}</span>
                        <span className="ml-1 text-xs opacity-70">{item.actualLatency}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {presentLocations.map((loc) => (
          <span key={loc} className={`${LocationColors[loc]} text-sm font-medium`}>
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
};

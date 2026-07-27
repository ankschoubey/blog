import { type LatencyEntry, type Unit, LocationColors, LocationOrder } from '../../data/latency-entries';

interface LatencyGridProps {
  entries: LatencyEntry[];
  currentUnit: Unit;
  label: string;
  id?: string;
}

const buckets = [1, 2, 5] as const;
const multipliers = [1, 10, 100] as const;

export const LatencyGrid = ({ entries, currentUnit, label, id }: LatencyGridProps) => {
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

  for (const [, items] of grid) {
    items.sort((a, b) => parseFloat(a.actualLatency) - parseFloat(b.actualLatency));
  }

  const presentLocations = LocationOrder.filter((loc) => filtered.some((e) => e.location === loc));

  return (
    <div id={id} className="mb-12">
      <h2 className="text-xl font-bold mb-4">{label}</h2>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-[480px] border-[2px] border-white/25">
          {/* x-axis labels */}
          <div className="grid grid-cols-[60px_1fr_1fr_1fr]">
            <div className="border-b-[2px] border-r-[2px] border-white/25" />
            {buckets.map((b) => (
              <div key={b} className="text-center text-sm font-bold border-b-[2px] border-white/25 py-1">
                {b}
              </div>
            ))}
          </div>

          {/* grid rows */}
          {multipliers.map((m) => (
            <div key={m} className="grid grid-cols-[60px_1fr_1fr_1fr]">
              {/* y-axis label */}
              <div className="flex items-center justify-end pr-2 text-sm font-bold border-r-[2px] border-white/25 py-2">
                {m}
              </div>

              {/* cells */}
              {buckets.map((b) => {
                const items = grid.get(`${b}-${m}`) ?? [];
                return (
                  <div
                    key={`${b}-${m}`}
                    className="p-2 min-h-[80px] border-r-[2px] border-b-[2px] border-white/25 last:border-r-0"
                  >
                    {items.map((item) => {
                      const colors = LocationColors[item.location];
                      return (
                        <div
                          key={item.name}
                          className={`${colors.bg} ${colors.text} px-2 py-1 text-xs leading-tight mb-1 last:mb-0`}
                        >
                          <span>{item.name}</span>
                          <span className="ml-1 opacity-70">{item.actualLatency}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-2 mt-4">
        {presentLocations.map((loc) => {
          const colors = LocationColors[loc];
          return (
            <span
              key={loc}
              className={`${colors.bg} ${colors.text} border-[2px] border-white/25 px-2 py-1 text-xs font-medium`}
            >
              {loc}
            </span>
          );
        })}
      </div>
    </div>
  );
};

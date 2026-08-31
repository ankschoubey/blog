import { type LatencyEntry, type Unit, LocationColors, LocationOrder } from '../../data/latency-entries';

interface LatencyGridProps {
  entries: LatencyEntry[];
  currentUnit: Unit;
  label: string;
  id?: string;
}

const buckets = [1, 2, 5] as const;
const multipliers = [1, 10, 100] as const;

const border = 'border-gray-300 dark:border-white/25';

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
        <table className={`min-w-[300px] border-[2px] ${border} text-sm table-fixed`}>
          <thead>
            <tr>
              <th className={`border-b-[2px] border-r-[2px] ${border} px-2 py-1 w-[60px]`} />
              {buckets.map((b) => (
                <th key={b} className={`border-b-[2px] border-r-[2px] ${border} px-2 py-1 font-bold text-center last:border-r-0 min-w-[120px]`}>
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {multipliers.map((m) => (
              <tr key={m}>
                <td className={`border-r-[2px] border-b-[2px] ${border} px-2 py-2 text-right font-bold align-top whitespace-nowrap`}>
                  {m}
                </td>
                {buckets.map((b) => {
                  const items = grid.get(`${b}-${m}`) ?? [];
                  return (
                    <td
                      key={`${b}-${m}`}
                      className={`border-b-[2px] border-r-[2px] ${border} p-2 align-top last:border-r-0`}
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
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-2 mt-4">
        {presentLocations.map((loc) => {
          const colors = LocationColors[loc];
          return (
            <span
              key={loc}
              className={`${colors.bg} ${colors.text} border-[2px] ${border} px-2 py-1 text-xs font-medium`}
            >
              {loc}
            </span>
          );
        })}
      </div>
    </div>
  );
};

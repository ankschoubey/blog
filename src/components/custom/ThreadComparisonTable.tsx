import { type ThreadComparisonEntry } from '../../data/latency-entries';

interface ThreadComparisonTableProps {
  entries: ThreadComparisonEntry[];
}

const border = 'border-gray-300 dark:border-white/25';

export const ThreadComparisonTable = ({ entries }: ThreadComparisonTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-[2px] ${border} border-collapse`}>
        <thead>
          <tr className={`border-b-[2px] ${border}`}>
            <th className={`text-left text-sm font-bold px-3 py-2 border-r-[2px] ${border}`}>Metric</th>
            <th className={`text-left text-sm font-bold px-3 py-2 border-r-[2px] ${border}`}>🧵 Platform Threads (OS-level)</th>
            <th className="text-left text-sm font-bold px-3 py-2">🍃 Virtual Threads (Java 21+)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.metric} className={`${i % 2 === 0 ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} border-b-[2px] ${border} last:border-b-0`}>
              <td className={`px-3 py-1.5 text-sm font-bold border-r-[2px] ${border}`}>{entry.metric}</td>
              <td className={`px-3 py-1.5 text-sm border-r-[2px] ${border}`}>{entry.platform}</td>
              <td className="px-3 py-1.5 text-sm">{entry.virtual}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-3">
        Platform threads map 1:1 to OS threads — heavy and scarce. Virtual threads (Java 21+) are cheap JVM-managed tasks,
        so you can run millions concurrently instead of a few thousand.
      </p>
    </div>
  );
};

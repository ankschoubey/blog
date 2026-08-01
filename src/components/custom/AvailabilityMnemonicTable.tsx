import { type AvailabilityMnemonicEntry } from '../../data/latency-entries';

interface AvailabilityMnemonicTableProps {
  entries: AvailabilityMnemonicEntry[];
}

export const AvailabilityMnemonicTable = ({ entries }: AvailabilityMnemonicTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-[2px] border-white/25 border-collapse">
        <thead>
          <tr className="border-b-[2px] border-white/25">
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Availability</th>
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Downtime per year (approx.)</th>
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Mnemonic</th>
            <th className="text-left text-sm font-bold px-3 py-2">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.level} className={`${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} border-b-[2px] border-white/25 last:border-b-0`}>
              <td className="px-3 py-1.5 text-sm font-bold border-r-[2px] border-white/25">{entry.level}</td>
              <td className="px-3 py-1.5 text-sm border-r-[2px] border-white/25">{entry.downtimePerYear}</td>
              <td className="px-3 py-1.5 text-sm font-bold border-r-[2px] border-white/25">{entry.mnemonic}</td>
              <td className="px-3 py-1.5 text-sm opacity-80">{entry.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

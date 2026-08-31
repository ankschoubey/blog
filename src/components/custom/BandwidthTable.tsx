import { type BandwidthEntry } from '../../data/latency-entries';

interface BandwidthTableProps {
  entries: BandwidthEntry[];
}

const border = 'border-gray-300 dark:border-white/25';

export const BandwidthTable = ({ entries }: BandwidthTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-[2px] ${border} border-collapse`}>
        <thead>
          <tr className={`border-b-[2px] ${border}`}>
            <th className={`text-left text-sm font-bold px-3 py-2 border-r-[2px] ${border}`}>Link speed</th>
            <th className={`text-left text-sm font-bold px-3 py-2 border-r-[2px] ${border}`}>Throughput (÷8)</th>
            <th className={`text-left text-sm font-bold px-3 py-2 border-r-[2px] ${border}`}>1 GB transfer time</th>
            <th className="text-left text-sm font-bold px-3 py-2">Mnemonic</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.linkSpeed} className={`${i % 2 === 0 ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} border-b-[2px] ${border} last:border-b-0`}>
              <td className={`px-3 py-1.5 text-sm font-bold border-r-[2px] ${border}`}>{entry.linkSpeed}</td>
              <td className={`px-3 py-1.5 text-sm border-r-[2px] ${border}`}>{entry.throughput}</td>
              <td className={`px-3 py-1.5 text-sm border-r-[2px] ${border}`}>{entry.transferTime}</td>
              <td className="px-3 py-1.5 text-sm font-bold">{entry.mnemonic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-600 dark:text-gray-500 mt-3">
        Bits to bytes: divide link speed by 8. 1 Gbps ≈ 125 MB/s. 1 GB over 1 Gbps = 8 seconds.
      </p>
    </div>
  );
};

import { type PowerOfNEntry } from '../../data/latency-entries';

interface PowerTableProps {
  entries: PowerOfNEntry[];
}

const superscripts: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };

function toSuperscript(n: number): string {
  return n.toString().split('').map((c) => superscripts[c] ?? c).join('');
}

export const PowerTable = ({ entries }: PowerTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-[2px] border-white/25 border-collapse">
        <thead>
          <tr className="border-b-[2px] border-white/25">
            <th className="text-center text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Power (2ⁿ)</th>
            <th className="text-center text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Power (10ⁿ)</th>
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Approximate value</th>
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Full name</th>
            <th className="text-center text-sm font-bold px-3 py-2">Short name</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.shortName} className={`${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} border-b-[2px] border-white/25 last:border-b-0`}>
              <td className="text-center text-sm px-3 py-1.5 font-bold border-r-[2px] border-white/25">2{toSuperscript(entry.power2)}</td>
              <td className="text-center text-sm px-3 py-1.5 font-bold border-r-[2px] border-white/25">10{toSuperscript(entry.power10)}</td>
              <td className="px-3 py-1.5 text-sm border-r-[2px] border-white/25">{entry.approximate}</td>
              <td className="px-3 py-1.5 text-sm border-r-[2px] border-white/25">{entry.fullName}</td>
              <td className="text-center text-sm px-3 py-1.5 font-bold">{entry.shortName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

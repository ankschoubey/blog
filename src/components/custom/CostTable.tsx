import { type CostEntry } from '../../data/latency-entries';

interface CostTableProps {
  entries: CostEntry[];
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  CPU: { bg: 'bg-[#4c0519]', text: 'text-red-200' },
  GPU: { bg: 'bg-violet-800', text: 'text-violet-100' },
  Memory: { bg: 'bg-red-900', text: 'text-red-100' },
  Storage: { bg: 'bg-teal-800', text: 'text-teal-100' },
  Networking: { bg: 'bg-blue-800', text: 'text-blue-100' },
  CDN: { bg: 'bg-indigo-800', text: 'text-indigo-100' },
  Query: { bg: 'bg-green-800', text: 'text-green-100' },
  Observability: { bg: 'bg-amber-800', text: 'text-amber-100' },
  Security: { bg: 'bg-violet-800', text: 'text-violet-100' },
};

const categoryOrder = ['CPU', 'GPU', 'Memory', 'Storage', 'Networking', 'CDN', 'Query', 'Observability', 'Security'];

export const CostTable = ({ entries }: CostTableProps) => {
  const grouped = categoryOrder
    .filter((cat) => entries.some((e) => e.category === cat))
    .map((cat) => ({
      category: cat,
      items: entries.filter((e) => e.category === cat),
    }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-[2px] border-white/25 border-collapse">
        <thead>
          <tr className="border-b-[2px] border-white/25">
            <th className="text-left text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">What</th>
            <th className="text-center text-sm font-bold px-3 py-2 border-r-[2px] border-white/25">Amount</th>
            <th className="text-center text-sm font-bold px-3 py-2">$ / Month</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map(({ category, items }) => {
            const catColors = categoryColors[category] ?? { bg: 'bg-gray-800', text: 'text-gray-100' };
            return items.map((item) => {
              const isHeader = !item.indent;
              const colors = isHeader ? catColors : (item.color ?? catColors);
              return (
                <tr
                  key={item.name}
                  className={`${colors.bg} ${colors.text} border-b-[2px] border-white/25 last:border-b-0`}
                >
                  <td className={`px-3 py-1.5 text-sm border-r-[2px] border-white/25${item.indent ? ' pl-8' : ' font-bold'}`}>
                    {item.indent && <span className="opacity-50 mr-1">{'├'}</span>}
                    {item.name}
                  </td>
                  <td className="text-center text-sm px-3 py-1.5 border-r-[2px] border-white/25">{item.amount}</td>
                  <td className="text-center text-sm px-3 py-1.5">{item.pricePerMonth}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

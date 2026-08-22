import { useState, useEffect } from 'react';
import {
  type Location,
  LocationColors,
  LocationOrder,
  GridGroup,
} from '../../data/latency-entries';
import {
  getGridFilterState,
  saveGridFilterState,
  locationsForGroup,
  isGroupVisible,
  setGroupVisibility,
  GridGroupOrder,
  type LocationVisibility,
} from '../../utils/gridFilter';

interface LatencyGridFilterProps {
  onChange: (visibility: LocationVisibility) => void;
}

export const LatencyGridFilter = ({ onChange }: LatencyGridFilterProps) => {
  const [visibility, setVisibility] = useState<LocationVisibility>(() => getGridFilterState());

  useEffect(() => {
    onChange(visibility);
  }, [visibility, onChange]);

  const update = (next: LocationVisibility) => {
    setVisibility(next);
    saveGridFilterState(next);
  };

  const toggleLocation = (loc: Location) => {
    update({ ...visibility, [loc]: !visibility[loc] });
  };

  const toggleGroup = (group: GridGroup) => {
    const visible = !isGroupVisible(visibility, group);
    update(setGroupVisibility(visibility, group, visible));
  };

  return (
    <div className="mb-8 border-[2px] border-white/25 p-4">
      <p className="text-sm font-bold mb-3">Filter grid</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {GridGroupOrder.map((group) => {
          const active = isGroupVisible(visibility, group);
          return (
            <button
              key={group}
              onClick={() => toggleGroup(group)}
              className={`border-[2px] px-3 py-1 text-xs font-bold transition-colors ${
                active ? 'border-white/50 bg-white/10' : 'border-white/15 opacity-50'
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {LocationOrder.map((loc) => {
          const colors = LocationColors[loc];
          const visible = visibility[loc];
          return (
            <label
              key={loc}
              className={`flex items-center gap-1.5 cursor-pointer border-[2px] px-2 py-1 text-xs transition-opacity ${
                visible ? 'border-white/25 opacity-100' : 'border-white/10 opacity-40'
              }`}
            >
              <input
                type="checkbox"
                checked={visible}
                onChange={() => toggleLocation(loc)}
                className="accent-white"
              />
              <span className={`${colors.bg} ${colors.text} px-1.5 py-0.5`}>{loc}</span>
            </label>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Group: {LocationOrder.filter((loc) => visibility[loc]).length} / {LocationOrder.length} categories visible
        ({locationsForGroup(GridGroup.Hardware).filter((l) => visibility[l]).length} hardware,
        {locationsForGroup(GridGroup.Network).filter((l) => visibility[l]).length} network,
        {locationsForGroup(GridGroup.Java).filter((l) => visibility[l]).length} java,
        {locationsForGroup(GridGroup.StorageIO).filter((l) => visibility[l]).length} storage,
        {locationsForGroup(GridGroup.Warehouse).filter((l) => visibility[l]).length} warehouse)
      </p>
    </div>
  );
};

import { type Location, LocationOrder, LocationGridGroup, GridGroup, GridGroupOrder } from '../data/latency-entries';

const STORAGE_KEY = 'numbers-grid-filter';

export type LocationVisibility = Record<Location, boolean>;

function defaultVisibility(): LocationVisibility {
  return Object.fromEntries(LocationOrder.map((loc) => [loc, true])) as LocationVisibility;
}

export function getGridFilterState(): LocationVisibility {
  if (typeof localStorage === 'undefined') return defaultVisibility();
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultVisibility();
  try {
    const parsed = JSON.parse(saved) as Partial<LocationVisibility>;
    const defaults = defaultVisibility();
    return Object.fromEntries(
      LocationOrder.map((loc) => [loc, parsed[loc] ?? defaults[loc]]),
    ) as LocationVisibility;
  } catch {
    return defaultVisibility();
  }
}

export function saveGridFilterState(state: LocationVisibility): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function locationsForGroup(group: GridGroup): Location[] {
  return LocationOrder.filter((loc) => LocationGridGroup[loc] === group);
}

export function isGroupVisible(state: LocationVisibility, group: GridGroup): boolean {
  const locs = locationsForGroup(group);
  return locs.some((loc) => state[loc]);
}

export function setGroupVisibility(state: LocationVisibility, group: GridGroup, visible: boolean): LocationVisibility {
  const next = { ...state };
  for (const loc of locationsForGroup(group)) {
    next[loc] = visible;
  }
  return next;
}

export { GridGroupOrder };
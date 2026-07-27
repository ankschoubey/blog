export enum Unit {
  ns = 'ns',
  microS = 'μs',
  mS = 'ms',
}

export type Bucket = 1 | 2 | 5;

export enum Multiplier {
  one = 1,
  ten = 10,
  hundred = 100,
}

export enum Location {
  CPU = 'CPU',
  Memory = 'Memory',
  CPUKernel = 'CPU / Kernel',
  SSD = 'SSD',
  HDD = 'HDD',
  DatabaseCache = 'Database / Cache',
  ObjectStorage = 'Object Storage',
  NearbyNetwork = 'Nearby Network',
  Network = 'Network',
  LongDistanceNetwork = 'Long-distance Network',
  IntercontinentalNetwork = 'Intercontinental Network',
}

export const LocationColors: Record<Location, string> = {
  [Location.CPU]: 'text-red-600',
  [Location.Memory]: 'text-red-400',
  [Location.CPUKernel]: 'text-red-500',
  [Location.SSD]: 'text-orange-500',
  [Location.HDD]: 'text-amber-500',
  [Location.DatabaseCache]: 'text-green-500',
  [Location.ObjectStorage]: 'text-teal-500',
  [Location.NearbyNetwork]: 'text-blue-400',
  [Location.Network]: 'text-blue-500',
  [Location.LongDistanceNetwork]: 'text-indigo-500',
  [Location.IntercontinentalNetwork]: 'text-violet-500',
};

export interface LatencyEntry {
  location: Location;
  name: string;
  bucket: Bucket;
  multiplier: Multiplier;
  unit: Unit;
  actualLatency: string;
}

export const entries: LatencyEntry[] = [
  { location: Location.Memory, name: 'Sequential Memory R/W (64 bytes)', bucket: 1, multiplier: Multiplier.one, unit: Unit.ns, actualLatency: '0.5 ns' },
  { location: Location.CPU, name: 'Hashing, not crypto-safe (64 bytes)', bucket: 1, multiplier: Multiplier.ten, unit: Unit.ns, actualLatency: '10 ns' },
  { location: Location.Memory, name: 'Random Memory R/W (64 bytes)', bucket: 2, multiplier: Multiplier.ten, unit: Unit.ns, actualLatency: '20 ns' },
  { location: Location.CPUKernel, name: 'System Call', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.ns, actualLatency: '300 ns' },
  { location: Location.CPU, name: 'Hashing, crypto-safe (64 bytes)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.ns, actualLatency: '100 ns' },
  { location: Location.CPU, name: 'Branch misprediction', bucket: 2, multiplier: Multiplier.one, unit: Unit.ns, actualLatency: '3 ns' },

  { location: Location.SSD, name: 'Sequential SSD read (8 KiB)', bucket: 1, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '1 μs' },
  { location: Location.CPUKernel, name: 'Context Switch', bucket: 1, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '10 μs' },
  { location: Location.SSD, name: 'Sequential SSD write, -fsync (8 KiB)', bucket: 2, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '2 μs' },
  { location: Location.NearbyNetwork, name: 'TCP Echo Server (32 KiB)', bucket: 5, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '50 μs' },
  { location: Location.SSD, name: 'Random SSD Read (8 KiB)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '100 μs' },
  { location: Location.NearbyNetwork, name: 'Proxy: Envoy/ProxySQL/Nginx/HAProxy', bucket: 5, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '50 μs' },
  { location: Location.Network, name: 'Network within same region', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '250 μs' },
  { location: Location.NearbyNetwork, name: 'Premium network within zone/VPC', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '250 μs' },
  { location: Location.SSD, name: 'Sequential SSD write, +fsync (8 KiB)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '300 μs' },
  { location: Location.DatabaseCache, name: '{MySQL, Memcached, Redis, ...} Query', bucket: 5, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '500 μs' },

  { location: Location.HDD, name: 'Sequential HDD Read (8 KiB)', bucket: 1, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '10 ms' },
  { location: Location.HDD, name: 'Random HDD Read (8 KiB)', bucket: 1, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '10 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, if-not-match 304', bucket: 2, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '30 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, 1 conn (128 KiB)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, n conn (offsets)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage LIST', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '100 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage PUT, 1 conn (128 KiB)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '200 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage PUT, n conn (multipart)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '200 ms' },
  { location: Location.LongDistanceNetwork, name: 'Network NA Central ↔ East', bucket: 2, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '25 ms' },
  { location: Location.LongDistanceNetwork, name: 'Network NA Central ↔ West', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '40 ms' },
  { location: Location.LongDistanceNetwork, name: 'Network NA East ↔ West', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '60 ms' },
  { location: Location.IntercontinentalNetwork, name: 'Network EU West ↔ NA East', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.IntercontinentalNetwork, name: 'Network EU West ↔ NA Central', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '100 ms' },
  { location: Location.IntercontinentalNetwork, name: 'Network NA West ↔ Singapore', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '180 ms' },
  { location: Location.IntercontinentalNetwork, name: 'Network EU West ↔ Singapore', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '160 ms' },
];

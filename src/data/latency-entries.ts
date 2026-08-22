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

export enum GridGroup {
  Hardware = 'Hardware',
  Network = 'Network',
  Java = 'Java',
  StorageIO = 'Storage/I/O',
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
  WithinCountry = 'Within country',
  NearbyRegion = 'Nearby region',
  NeighboringRegion = 'Neighboring region',
  FarRegion = 'Far region',
  VeryFar = 'Very far',
  JavaInProcess = 'Java in-process',
  JavaFramework = 'Java framework',
  JavaJVM = 'Java JVM',
}

export const LocationGridGroup: Record<Location, GridGroup> = {
  [Location.CPU]: GridGroup.Hardware,
  [Location.Memory]: GridGroup.Hardware,
  [Location.CPUKernel]: GridGroup.Hardware,
  [Location.SSD]: GridGroup.StorageIO,
  [Location.HDD]: GridGroup.StorageIO,
  [Location.DatabaseCache]: GridGroup.StorageIO,
  [Location.ObjectStorage]: GridGroup.StorageIO,
  [Location.NearbyNetwork]: GridGroup.Network,
  [Location.Network]: GridGroup.Network,
  [Location.WithinCountry]: GridGroup.Network,
  [Location.NearbyRegion]: GridGroup.Network,
  [Location.NeighboringRegion]: GridGroup.Network,
  [Location.FarRegion]: GridGroup.Network,
  [Location.VeryFar]: GridGroup.Network,
  [Location.JavaInProcess]: GridGroup.Java,
  [Location.JavaFramework]: GridGroup.Java,
  [Location.JavaJVM]: GridGroup.Java,
};

export const LocationColors: Record<Location, { bg: string; text: string }> = {
  [Location.CPU]: { bg: 'bg-[#4c0519]', text: 'text-red-200' },
  [Location.Memory]: { bg: 'bg-red-900', text: 'text-red-100' },
  [Location.CPUKernel]: { bg: 'bg-[#4c0519]', text: 'text-red-200' },
  [Location.SSD]: { bg: 'bg-orange-800', text: 'text-orange-100' },
  [Location.HDD]: { bg: 'bg-amber-800', text: 'text-amber-100' },
  [Location.DatabaseCache]: { bg: 'bg-green-800', text: 'text-green-100' },
  [Location.ObjectStorage]: { bg: 'bg-teal-800', text: 'text-teal-100' },
  [Location.NearbyNetwork]: { bg: 'bg-blue-800', text: 'text-blue-100' },
  [Location.Network]: { bg: 'bg-blue-900', text: 'text-blue-100' },
  [Location.WithinCountry]: { bg: 'bg-sky-800', text: 'text-sky-100' },
  [Location.NearbyRegion]: { bg: 'bg-cyan-800', text: 'text-cyan-100' },
  [Location.NeighboringRegion]: { bg: 'bg-teal-800', text: 'text-teal-100' },
  [Location.FarRegion]: { bg: 'bg-indigo-800', text: 'text-indigo-100' },
  [Location.VeryFar]: { bg: 'bg-violet-800', text: 'text-violet-100' },
  [Location.JavaInProcess]: { bg: 'bg-rose-800', text: 'text-rose-100' },
  [Location.JavaFramework]: { bg: 'bg-pink-800', text: 'text-pink-100' },
  [Location.JavaJVM]: { bg: 'bg-fuchsia-800', text: 'text-fuchsia-100' },
};

export const LocationOrder: Location[] = [
  Location.CPU,
  Location.Memory,
  Location.CPUKernel,
  Location.SSD,
  Location.HDD,
  Location.DatabaseCache,
  Location.ObjectStorage,
  Location.NearbyNetwork,
  Location.Network,
  Location.WithinCountry,
  Location.NearbyRegion,
  Location.NeighboringRegion,
  Location.FarRegion,
  Location.VeryFar,
  Location.JavaInProcess,
  Location.JavaFramework,
  Location.JavaJVM,
];

export const GridGroupOrder: GridGroup[] = [
  GridGroup.Hardware,
  GridGroup.Network,
  GridGroup.Java,
  GridGroup.StorageIO,
];

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
  { location: Location.JavaInProcess, name: 'HashMap get', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.ns, actualLatency: '100 ns' },
  { location: Location.Memory, name: 'Random Memory R/W (64 bytes)', bucket: 2, multiplier: Multiplier.ten, unit: Unit.ns, actualLatency: '20 ns' },
  { location: Location.CPUKernel, name: 'System Call', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.ns, actualLatency: '300 ns' },
  { location: Location.CPU, name: 'Hashing, crypto-safe (64 bytes)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.ns, actualLatency: '100 ns' },
  { location: Location.CPU, name: 'Branch misprediction', bucket: 2, multiplier: Multiplier.one, unit: Unit.ns, actualLatency: '3 ns' },

  { location: Location.SSD, name: 'Sequential SSD read (8 KiB)', bucket: 1, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '1 μs' },
  { location: Location.JavaInProcess, name: 'JSON serialize 1 KB', bucket: 1, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '1 μs' },
  { location: Location.JavaInProcess, name: 'Log line (sync)', bucket: 1, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '1 μs' },
  { location: Location.CPUKernel, name: 'Context Switch', bucket: 1, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '10 μs' },
  { location: Location.SSD, name: 'Sequential SSD write, -fsync (8 KiB)', bucket: 2, multiplier: Multiplier.one, unit: Unit.microS, actualLatency: '2 μs' },
  { location: Location.NearbyNetwork, name: 'TCP Echo Server (32 KiB)', bucket: 5, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '50 μs' },
  { location: Location.SSD, name: 'Random SSD Read (8 KiB)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '100 μs' },
  { location: Location.JavaFramework, name: 'Spring MVC dispatch', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '100 μs' },
  { location: Location.NearbyNetwork, name: 'Proxy: Envoy/ProxySQL/Nginx/HAProxy', bucket: 5, multiplier: Multiplier.ten, unit: Unit.microS, actualLatency: '50 μs' },
  { location: Location.Network, name: 'Network within same region', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '250 μs' },
  { location: Location.NearbyNetwork, name: 'Premium network within zone/VPC', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '250 μs' },
  { location: Location.SSD, name: 'Sequential SSD write, +fsync (8 KiB)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '300 μs' },
  { location: Location.DatabaseCache, name: '{MySQL, Memcached, Redis, ...} Query', bucket: 5, multiplier: Multiplier.hundred, unit: Unit.microS, actualLatency: '500 μs' },

  { location: Location.JavaFramework, name: 'JDBC pool checkout', bucket: 1, multiplier: Multiplier.one, unit: Unit.mS, actualLatency: '1 ms' },
  { location: Location.JavaFramework, name: 'JDBC round-trip (no pool)', bucket: 2, multiplier: Multiplier.one, unit: Unit.mS, actualLatency: '2 ms' },
  { location: Location.HDD, name: 'Sequential HDD Read (8 KiB)', bucket: 1, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '10 ms' },
  { location: Location.JavaJVM, name: 'Young GC pause', bucket: 1, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '10 ms' },
  { location: Location.HDD, name: 'Random HDD Read (8 KiB)', bucket: 1, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '10 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, if-not-match 304', bucket: 2, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '30 ms' },
  { location: Location.WithinCountry, name: 'Network within India', bucket: 2, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '20 ms' },
  { location: Location.WithinCountry, name: 'NA Central ↔ East', bucket: 2, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '25 ms' },
  { location: Location.NearbyRegion, name: 'India ↔ Singapore', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '40 ms' },
  { location: Location.NearbyRegion, name: 'NA Central ↔ West', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '40 ms' },
  { location: Location.NeighboringRegion, name: 'India ↔ Dubai', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '60 ms' },
  { location: Location.NeighboringRegion, name: 'NA East ↔ West', bucket: 5, multiplier: Multiplier.ten, unit: Unit.mS, actualLatency: '60 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, 1 conn (128 KiB)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage GET, n conn (offsets)', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.FarRegion, name: 'EU West ↔ NA East', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '80 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage LIST', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '100 ms' },
  { location: Location.FarRegion, name: 'India ↔ Europe', bucket: 1, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '120 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage PUT, 1 conn (128 KiB)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '200 ms' },
  { location: Location.ObjectStorage, name: 'Blob Storage PUT, n conn (multipart)', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '200 ms' },
  { location: Location.VeryFar, name: 'NA West ↔ Singapore', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '180 ms' },
  { location: Location.VeryFar, name: 'India ↔ US', bucket: 2, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '240 ms' },
  { location: Location.JavaJVM, name: 'Full GC pause', bucket: 5, multiplier: Multiplier.hundred, unit: Unit.mS, actualLatency: '500 ms' },
];

export interface CostEntry {
  category: string;
  name: string;
  amount: string;
  pricePerMonth: string;
  indent?: boolean;
  color?: { bg: string; text: string };
}

export interface PowerOfNEntry {
  power2: number;
  power10: number;
  approximate: string;
  fullName: string;
  shortName: string;
}

export const powerEntries: PowerOfNEntry[] = [
  { power2: 10, power10: 3, approximate: '1 Thousand', fullName: 'Kilobyte', shortName: 'KB' },
  { power2: 20, power10: 6, approximate: '1 Million', fullName: 'Megabyte', shortName: 'MB' },
  { power2: 30, power10: 9, approximate: '1 Billion', fullName: 'Gigabyte', shortName: 'GB' },
  { power2: 40, power10: 12, approximate: '1 Trillion', fullName: 'Terabyte', shortName: 'TB' },
  { power2: 50, power10: 15, approximate: '1 Quadrillion', fullName: 'Petabyte', shortName: 'PB' },
  { power2: 60, power10: 18, approximate: '1 Quintillion', fullName: 'Exabyte', shortName: 'EB' },
  { power2: 70, power10: 21, approximate: '1 Sextillion', fullName: 'Zettabyte', shortName: 'ZB' },
  { power2: 80, power10: 24, approximate: '1 Septillion', fullName: 'Yottabyte', shortName: 'YB' },
];

export interface AvailabilityMnemonicEntry {
  level: string;
  downtimePerYear: string;
  mnemonic: string;
  meaning: string;
}

export const availabilityMnemonicEntries: AvailabilityMnemonicEntry[] = [
  { level: '90% (1 nine)', downtimePerYear: '36.5 days', mnemonic: '1 month', meaning: 'The service is down for a month.' },
  { level: '99% (2 nines)', downtimePerYear: '3.65 days', mnemonic: 'Long weekend', meaning: 'Down for a long weekend.' },
  { level: '99.9% (3 nines)', downtimePerYear: '8.76 hours ≈ 500 min', mnemonic: '500', meaning: 'Down for a workday (~9 hours).' },
  { level: '99.99% (4 nines)', downtimePerYear: '52.6 minutes ≈ 50 min', mnemonic: '50', meaning: 'Down for a lunch break (~50 minutes).' },
  { level: '99.999% (5 nines)', downtimePerYear: '5.26 minutes ≈ 5 min', mnemonic: '5', meaning: 'Down for a coffee break (~5 minutes).' },
  { level: '99.9999% (6 nines)', downtimePerYear: '31.5 seconds ≈ 0.5 min', mnemonic: '0.5', meaning: 'Down for half a minute.' },
  { level: '99.99999% (7 nines)', downtimePerYear: '3.15 seconds', mnemonic: '3 sec', meaning: 'Down for a blink (~3 seconds).' },
];

export interface BandwidthEntry {
  linkSpeed: string;
  throughput: string;
  transferTime: string;
  mnemonic: string;
}

export const bandwidthEntries: BandwidthEntry[] = [
  { linkSpeed: '1 Mbps', throughput: '125 KB/s', transferTime: '8000 s', mnemonic: '÷8' },
  { linkSpeed: '10 Mbps', throughput: '1.25 MB/s', transferTime: '800 s', mnemonic: '÷8' },
  { linkSpeed: '100 Mbps', throughput: '12.5 MB/s', transferTime: '80 s', mnemonic: '÷8' },
  { linkSpeed: '1 Gbps', throughput: '125 MB/s', transferTime: '8 s', mnemonic: '÷8' },
  { linkSpeed: '10 Gbps', throughput: '1.25 GB/s', transferTime: '0.8 s', mnemonic: '÷8' },
];

export const costEntries: CostEntry[] = [
  { category: 'CPU', name: 'CPU', amount: '1', pricePerMonth: '$15' },
  { category: 'GPU', name: 'GPU', amount: '1', pricePerMonth: '$5000' },
  { category: 'Memory', name: 'Memory', amount: '1 GB', pricePerMonth: '$2' },
  { category: 'Storage', name: 'Storage', amount: '', pricePerMonth: '' },
  { category: 'Storage', name: 'Warehouse Storage', amount: '1 GB', pricePerMonth: '$0.02', indent: true, color: { bg: 'bg-teal-800', text: 'text-teal-100' } },
  { category: 'Storage', name: 'Blob (S3, GCS)', amount: '1 GB', pricePerMonth: '$0.02', indent: true, color: { bg: 'bg-teal-800', text: 'text-teal-100' } },
  { category: 'Storage', name: 'Zonal HDD', amount: '1 GB', pricePerMonth: '$0.05', indent: true, color: { bg: 'bg-amber-800', text: 'text-amber-100' } },
  { category: 'Storage', name: 'Ephemeral SSD', amount: '1 GB', pricePerMonth: '$0.08', indent: true, color: { bg: 'bg-orange-800', text: 'text-orange-100' } },
  { category: 'Storage', name: 'Regional HDD', amount: '1 GB', pricePerMonth: '$0.10', indent: true, color: { bg: 'bg-amber-800', text: 'text-amber-100' } },
  { category: 'Storage', name: 'Zonal SSD', amount: '1 GB', pricePerMonth: '$0.20', indent: true, color: { bg: 'bg-orange-800', text: 'text-orange-100' } },
  { category: 'Storage', name: 'Regional SSD', amount: '1 GB', pricePerMonth: '$0.35', indent: true, color: { bg: 'bg-orange-800', text: 'text-orange-100' } },
  { category: 'Networking', name: 'Networking', amount: '', pricePerMonth: '' },
  { category: 'Networking', name: 'Same Zone', amount: '1 GB', pricePerMonth: '$0', indent: true },
  { category: 'Networking', name: 'Blob', amount: '1 GB', pricePerMonth: '$0', indent: true },
  { category: 'Networking', name: 'Ingress', amount: '1 GB', pricePerMonth: '$0', indent: true },
  { category: 'Networking', name: 'L4 LB', amount: '1 GB', pricePerMonth: '$0.008', indent: true },
  { category: 'Networking', name: 'Inter-Zone', amount: '1 GB', pricePerMonth: '$0.01', indent: true },
  { category: 'Networking', name: 'Inter-Region', amount: '1 GB', pricePerMonth: '$0.02', indent: true },
  { category: 'Networking', name: 'Internet Egress †', amount: '1 GB', pricePerMonth: '$0.10', indent: true },
  { category: 'CDN', name: 'CDN Egress', amount: '1 GB', pricePerMonth: '$0.05' },
  { category: 'CDN', name: 'CDN Fill ‡', amount: '1 GB', pricePerMonth: '$0.01' },
  { category: 'Query', name: 'Warehouse Query', amount: '1 GB', pricePerMonth: '$0.005' },
  { category: 'Observability', name: 'Logs/Traces ♣', amount: '1 GB', pricePerMonth: '$0.50' },
  { category: 'Observability', name: 'Metrics', amount: '1000', pricePerMonth: '$20' },
  { category: 'Security', name: 'EKM Keys', amount: '1', pricePerMonth: '$1' },
];

// Minimal deep-merge replacement (replaces lodash.merge for plain config objects).
// Arrays are replaced, plain objects merged recursively. Mutates nothing.
type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date) && !(v instanceof URL);

export function deepMerge<T>(...sources: Array<Partial<T> | undefined>): T {
  const out: Plain = {};
  for (const src of sources) {
    if (!src) continue;
    for (const [k, v] of Object.entries(src as Plain)) {
      const cur = out[k];
      out[k] = isPlain(cur) && isPlain(v) ? deepMerge(cur, v) : v;
    }
  }
  return out as T;
}

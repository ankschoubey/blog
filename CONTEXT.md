# Numbers Page

A memorization reference for napkin-math constants programmers use when sizing systems, estimating latency, and making architectural trade-offs.

## Language

**RTT tier**:
A round-number latency bucket for network round-trip time, grouped by geographic distance. The canonical tiers are 20 / 40 / 60 / 120 / 200 ms — universal, anchor-independent.
_Avoid_: latency bucket, ping tier, distance class

**Within country** (20 ms):
RTT tier for traffic staying inside one country or cloud region (e.g. Mumbai ↔ Delhi, US East ↔ US East same region).
_Avoid_: local, domestic, intra-country

**Nearby region** (40 ms):
RTT tier for geographically close cross-border or cross-coast routes (e.g. India ↔ Singapore, US East ↔ US Central).
_Avoid_: adjacent, close neighbor

**Neighboring region** (60 ms):
RTT tier for a second ring out — still same continent or subcontinent adjacency (e.g. India ↔ Dubai, US East ↔ US West).
_Avoid_: adjacent continent, near intercontinental

**Far region** (120 ms):
RTT tier for cross-continental routes that are not the longest path (e.g. India ↔ Europe, US East ↔ EU West).
_Avoid_: transatlantic, mid-range intercontinental

**Very far** (200 ms):
RTT tier for the longest typical intercontinental paths (e.g. India ↔ US, US West ↔ Singapore). Napkin number is 200 ms; actual routes may be 180–240 ms.
_Avoid_: ultra intercontinental, antipodal

## Canonical routes

Each RTT tier cell in the latency grid carries one India-anchor and one US-anchor example route. `actualLatency` shows the measured value; grid position teaches the tier round number.

| Tier | India example | US example |
|------|---------------|------------|
| Within country (20 ms) | Network within India | NA Central ↔ East |
| Nearby region (40 ms) | India ↔ Singapore | NA Central ↔ West |
| Neighboring region (60 ms) | India ↔ Dubai | NA East ↔ West |
| Far region (120 ms) | India ↔ Europe | EU West ↔ NA East |
| Very far (200 ms) | India ↔ US | NA West ↔ Singapore |

## Bandwidth

**Throughput identity**:
Bits-to-bytes conversion for link speed: 1 Gbps ≈ 125 MB/s (divide by 8). Used to answer "how fast can this link move data?"
_Avoid_: bandwidth formula, speed conversion

**Transfer time**:
Time to move a payload over a link: 1 GB over 1 Gbps = 8 seconds. Same ÷8 fact as throughput identity, applied to a concrete payload size.
_Avoid_: download time, transfer duration

**Bandwidth ladder**:
A mnemonic table on `/numbers` listing common link speeds (e.g. 1 Mbps → 10 Gbps) with MB/s throughput and 1 GB transfer time per row, plus a quiz.
_Avoid_: bandwidth table, throughput chart

**Grid filter**:
Interactive visibility toggles on the latency grid. Top-level group toggles (`Hardware`, `Network`, `Java`, `Storage/I/O`) for bulk show/hide, plus per-category legend checkboxes for fine control. Default: all groups visible on first visit; state persists in `localStorage` so return visits restore the last filter. Quiz respects the same filter.
_Avoid_: filter, collapse, hide show

**Grid group**:
A top-level bucket for bulk grid filtering: `Hardware`, `Network`, `Java`, or `Storage/I/O`. Each maps to one or more legend categories.
_Avoid_: section, layer, domain

## Java entries

Eight entries in the `Java` grid group, slotted into existing bucket × multiplier cells:

| Layer | Entry | Actual |
|-------|-------|--------|
| In-process | HashMap get | 100 ns |
| In-process | JSON serialize 1 KB | 1 μs |
| In-process | Log line (sync) | 1 μs |
| Framework | Spring MVC dispatch | 100 μs |
| Framework | JDBC pool checkout | 1 ms |
| Framework | JDBC round-trip (no pool) | 1–2 ms |
| JVM runtime | Young GC pause | 10 ms |
| JVM runtime | Full GC pause | 500 ms (pessimistic napkin anchor) |

**Anchor**:
The geography you mentally place yourself in when picking example routes for a tier (e.g. India, US East). Tier numbers are universal; example routes vary by anchor.
_Avoid_: origin, home region, baseline

**Latency grid**:
The napkin-math table on `/numbers` that maps operations and network routes into bucket × multiplier cells (1/2/5 × 1/10/100) across ns, μs, and ms units. μs cells use datacenter location labels (`Nearby Network`, `Network`); ms network cells use RTT tier labels.
_Avoid_: numbers table, napkin grid

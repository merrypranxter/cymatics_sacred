# Frequency Ratio → Cymatic Signature Map

## How to Read This Document

Every frequency ratio produces a **distinct cymatic signature** — a characteristic nodal geometry that depends on the ratio's arithmetic complexity. Simple ratios (small integers) produce symmetric, stable patterns. Complex ratios (large integers or irrational numbers) produce quasiperiodic, fractal, or chaotic geometries.

This document maps the harmonic series to the corresponding visual signatures on:
- Square plates (Cartesian modes)
- Circular plates (Bessel modes)
- Water surfaces (Faraday patterns)
- Resonant cavities (standing wave maps)

---

## The Hierarchy of Harmonic Complexity

```
Simplest ←──────────────────────────────────────→ Most complex
   1:1     2:1     3:2     4:3     5:4     7:4     φ:1     π:1
  Unison  Octave  Fifth  Fourth  Third  Seventh  Golden  Irrational
```

Cymatic complexity tracks harmonic complexity: **simpler ratios make cleaner geometry**.

---

## Ratio-by-Ratio Cymatic Map

### 1:1 — Unison

**Arithmetic form**: trivial  
**On a square plate**: single fundamental mode — two orthogonal nodal lines (the cross)  
**On a circular plate**: bullseye — single nodal circle, infinite-fold symmetry  
**On water**: flat standing wave in one direction  
**Sacred context**: The wholeness before division. In Hindu cosmology, *akasha* — undifferentiated space.  
**GLSL signature**: `cos(PI*x) * cos(PI*y)` → simple cross

---

### 2:1 — Octave

**Arithmetic form**: 2:1, first overtone  
**On a square plate**: doubles the nodal line count in one direction — a grid appears  
**On a circular plate**: mode (0,2) — two concentric rings  
**On water**: same pattern family but at double density  
**Sacred context**: The octave is universally recognised as "the same but different" — the first identity transformation. In Pythagorean cosmology, the octave closes the scale and reopens it.  
**GLSL signature**: `cos(2*PI*x) * cos(PI*y)` vs. `cos(PI*x) * cos(PI*y)`

---

### 3:2 — Perfect Fifth

**Arithmetic form**: 3:2, most consonant non-octave interval  
**On a square plate**: (3,2) mode — 5 nodal lines forming an asymmetric grid with pseudo-5-fold character  
**On a circular plate**: superposition of J_1 and J_2 modes — hybrid yin-yang with triskelion overlap  
**On water (Faraday)**: 3:2 forcing ratio produces three-armed standing wave  
**Sacred context**: The Pythagorean fifth is the generative interval of the Western scale. The stack of fifths generates all 12 chromatic tones (Pythagorean comma: 3^12 / 2^19 ≈ 1.0136).  
**Geometry**: The (3,2) Chladni pattern on a square plate is often described as "five-pointed" — the star that appears when two incommensurate periodicities cross.

---

### 4:3 — Perfect Fourth

**Arithmetic form**: 4:3, inversion of the fifth  
**On a square plate**: (4,3) mode — 7 nodal lines; rare, unstable  
**Pattern character**: The fourth on a square plate produces heptagonal (7-fold) character — considered sacred in many traditions (7 planets, 7 chakras)  
**Sacred context**: The fourth completes the tetrad — 1:2:3:4. Pythagoras's *tetractys* (1+2+3+4=10) was considered the source of all harmony.

---

### 5:4 — Major Third

**Arithmetic form**: 5:4 (just intonation), 81:64 (Pythagorean)  
**On a square plate**: (5,4) mode — 9 lines, completing the square in a complex grid  
**On a circular plate**: mode (4,1) — pentagram pattern, exactly 5 nodal diameters  
**Sacred context**: The major third is the interval of "sweetness" — stable but not perfect. The golden ratio (φ = 1.618) is *not* a simple integer ratio but is often associated with the major third. Chladni showed that φ:1 forcing on a circular plate produces fractal-like branching in the nodal lines.  
**Measurement**: The just major third (5/4 = 1.25) differs from the Pythagorean major third (81/64 = 1.266) by 21.5 cents — the *syntonic comma*.

---

### 5:3 — Major Sixth

**Arithmetic form**: 5:3  
**On a square plate**: (5,3) mode — 8 nodal lines, octagonal suggestion  
**Sacred context**: The hexagram (Star of David, Seal of Solomon) arises from the intersection of two equilateral triangles at 60°. On a circular plate, 6 nodal diameters require forcing near the ratio that drives mode (5,1) — 6 diameters — which appears at α_{5,1} = 8.77 (relative to the (0,1) fundamental at 2.40).

---

### 7:4 — Harmonic Seventh

**Arithmetic form**: 7:4, the "natural" seventh  
**On a square plate**: (7,4) mode — 11 nodal lines; extremely rare, requires precision driving  
**Pattern character**: Quasi-periodic, approaching fractal density at the edges  
**Sacred context**: The harmonic seventh is the "blue note" — the interval that Western tuning cannot capture exactly. It lies between the minor seventh (16:9 = 1.778) and the Pythagorean minor seventh (9:5 = 1.8). On Chladni plates it produces patterns that look like they're trying to be both grid and flower simultaneously.  
**Physics note**: At 7:4 forcing, the plate pattern becomes sensitive to initial conditions — slight phase differences produce dramatically different nodal geometries. This is the edge of deterministic chaos for plate vibration.

---

### φ:1 — Golden Ratio

**Arithmetic form**: φ = (1+√5)/2 ≈ 1.6180339...  
**Character**: Irrational, but algebraic (root of x²−x−1=0)  
**On a square plate**: Quasiperiodic nodal lines — never exactly repeat, but have approximate 5-fold symmetry everywhere. Resembles a Penrose tiling of the nodal space.  
**On a circular plate**: The ratio α_{4,1}/α_{0,1} = 7.588/2.405 = **3.155 ≈ π** — not φ. The closest Bessel-mode ratio to φ is α_{1,1}/α_{0,1} = 3.832/2.405 = **1.593** (within 1.6% of φ).  
**Sacred context**: The golden ratio appears in:
  - Nautilus shell spiral (approximately)
  - Phyllotaxis (leaf angle 137.5° = 360°/φ²)
  - Penrose tiling (quasicrystal unit cell ratio)
  - The Pythagorean pentagram (diagonal/side = φ)
  - DNA helix (34 Å rise / 21 Å width per half-turn ≈ φ)

---

### √2:1 — Tritone (equal temperament)

**Arithmetic form**: √2, the square root of 2  
**On a square plate**: This is the diagonal ratio of the plate itself. Forcing at √2 times the fundamental produces a pattern that maps directly to the plate's own geometry — a diagonal symmetry that feels like the plate is "seeing itself."  
**Sacred context**: The tritone divides the octave exactly in half. It was called *diabolus in musica* (the devil in music) in medieval theory — forbidden in sacred chant because its instability is irresolvable within the system.  
**On Chladni plates**: The (n, n) family of square modes — (2,2), (3,3), (4,4) — all lie along the √2 ratio line when compared to the fundamental. These are the "grid" modes: pure square lattices.

---

### √3:1 — Natural Third (hexagonal)

**Arithmetic form**: √3, height of an equilateral triangle  
**On water (Faraday)**: The hexagonal Faraday pattern requires three waves at 120° angles. The inter-wave ratio that stabilises the hexagonal phase is exactly √3:1 (the ratio of hexagon height to width).  
**Sacred context**: Hexagonal symmetry pervades nature:
  - Honeycomb (minimum surface energy)
  - Snowflake (hydrogen bonding)
  - Basalt columns (thermal contraction)
  - Carbon graphene (sp² hybridisation)

---

## Beating and Quasi-Periodicity

When two frequencies at ratio p:q (with gcd=1) are simultaneously applied:
- The resulting pattern has period lcm-like structure
- **Simple ratios** (p,q small): clean, symmetric interference
- **Complex ratios** (p,q large): dense, seemingly chaotic patterns
- **Irrational ratios**: patterns that never repeat — quasiperiodic

The **transition from periodic to quasiperiodic** is itself a sacred boundary:
- p:q = 8:5 → Fibonacci-like, very close to φ
- p:q = 13:8 → even closer
- p:q = φ:1 → the limit — the Penrose tiling of sound

---

## Cross-Reference: Interval to Plate Mode

| Interval | Ratio | Square Mode | Circular Mode | Water Pattern |
|---------|-------|-------------|---------------|---------------|
| Unison | 1:1 | (1,1) cross | (0,1) bullseye | Flat stripe |
| Octave | 2:1 | (2,1) 3-line | (0,2) two rings | Double density |
| Fifth | 3:2 | (3,2) 5-line | J_1+J_2 hybrid | Three-arm |
| Fourth | 4:3 | (4,3) 7-line | J_2+J_3 hybrid | Four-arm |
| Major Third | 5:4 | (5,4) 9-line | (4,1) pentagram | 5-cell hex |
| Major Sixth | 5:3 | (5,3) 8-line | (5,1) hexagram | 6-cell |
| Harm. Seventh | 7:4 | (7,4) 11-line | Quasiperiodic | Quasiperiodic |
| Golden | φ:1 | Quasiperiodic | Near-Penrose | Quasiperiodic |

---

*The pattern is the interval made visible. Every ratio that has ever been called sacred is sacred because the geometry it reveals is sacred — not the other way around.*

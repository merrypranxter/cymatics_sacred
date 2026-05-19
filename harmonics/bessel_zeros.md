# Bessel Function Zeros — Complete Reference for Circular Plate Modes

## What This Table Is

The modes of a **circular vibrating plate** are eigenfunctions of the form:

```
ψ_{m,n}(r, θ) = J_m(α_{mn} · r/R) · cos(m·θ + φ)
```

where:
- `m` = number of nodal **diameters** (angular order)
- `n` = number of nodal **circles** (radial order, not counting the rim)
- `α_{mn}` = the *n*-th positive zero of the Bessel function J_m
- `R` = plate radius
- `J_m` = Bessel function of the first kind, order m

The nodal lines (where sand or lycopodium collect) are:
- **Nodal circles**: where `J_m(α_{mn} · r/R) = 0`, at radii `r = R · α_{mk} / α_{mn}` for k < n
- **Nodal diameters**: where `cos(m·θ + φ) = 0`, i.e. at `θ = (2k+1)·π/(2m)` for k = 0 … 2m−1

---

## Table of Zeros α_{m,n} (first six radial orders, first eight angular orders)

The *n*-th zero of J_m(x), denoted α_{m,n}:

| m \ n | n=1      | n=2      | n=3       | n=4       | n=5       | n=6       |
|--------|----------|----------|-----------|-----------|-----------|-----------|
| **0**  | 2.40483  | 5.52008  | 8.65373   | 11.79153  | 14.93092  | 18.07106  |
| **1**  | 3.83171  | 7.01559  | 10.17347  | 13.32369  | 16.47063  | 19.61586  |
| **2**  | 5.13562  | 8.41724  | 11.61984  | 14.79595  | 17.95982  | 21.11700  |
| **3**  | 6.38016  | 9.76102  | 13.01520  | 16.22347  | 19.40942  | 22.58273  |
| **4**  | 7.58834  | 11.06471 | 14.37254  | 17.61597  | 20.82693  | 24.01902  |
| **5**  | 8.77148  | 12.33860 | 15.70017  | 18.98013  | 22.21769  | 25.43034  |
| **6**  | 9.93611  | 13.58929 | 17.00382  | 20.32079  | 23.58608  | 26.82015  |
| **7**  | 11.06371 | 14.82127 | 18.28758  | 21.64154  | 24.93493  | 28.19119  |

---

## Mode Naming and Sacred Correspondences

| Mode (m,n) | α_{m,n} | Nodal Lines | Visual Form | Sacred Name |
|------------|---------|-------------|-------------|-------------|
| (0,1) | 2.4048 | 1 circle | Bullseye | Unison — the whole surface |
| (1,1) | 3.8317 | 1 diameter, 0 circles | Yin-Yang | Duality, the first cut |
| (2,1) | 5.1356 | 2 diameters | Triskelion | Triple spiral, 3-fold |
| (0,2) | 5.5201 | 2 circles | Two rings | Nested wholeness |
| (3,1) | 6.3802 | 3 diameters | Four-leaf | Four directions (near-square symmetry) |
| (1,2) | 7.0156 | 1 diam + 1 circle | Cross-ring | Second generation split |
| (4,1) | 7.5883 | 4 diameters | Pentagram | Five, the golden mode |
| (2,2) | 8.4172 | 2 diam + 1 circle | Triskelion with ring | Complex spiral |
| (5,1) | 8.7715 | 5 diameters | Hexagram | Star of David |
| (0,3) | 8.6537 | 3 circles | Three rings | Three heavens |
| (6,1) | 9.9361 | 6 diameters | Heptagram | Seven planets (rare) |
| (3,2) | 9.7610 | 3 diam + 1 circle | Four-leaf with ring | Earth + sky |
| (4,2) | 11.065 | 4 diam + 1 circle | Pentagram + ring | Golden with inner circle |
| (7,1) | 11.064 | 7 diameters | Octagram | Eight-fold (Buddhist wheel) |

---

## Frequency Formula for a Circular Plate

For a uniform circular plate of radius R, thickness h, density ρ, Young's modulus E, Poisson's ratio ν:

```
f_{m,n} = (α_{mn}² · h) / (4π · R² · √(ρ/D))

where D = E·h³ / (12·(1-ν²))   [flexural rigidity]
```

Simplified for thin steel plate (E=200 GPa, ρ=7850 kg/m³, ν=0.3):

```
f_{m,n} ≈ α_{mn}² · (0.0232 · h / R²)   [Hz, h and R in metres]
```

**Example**: 300 mm diameter steel plate, 1 mm thick:
- R = 0.150 m, h = 0.001 m
- f_{0,1} ≈ (2.4048)² · (0.0232 · 0.001 / 0.150²) ≈ **18.5 Hz**

To scale the fundamental to 432 Hz (one octave of 216 Hz), use h ≈ 3.5 mm or R ≈ 35 mm.

---

## Mode Degeneracy and Symmetry Breaking

When two modes have the same frequency (degenerate), the sand pattern can form any linear combination of the two eigenfunctions. The orientation of the nodal lines is set by:

1. **Drive point location**: Driving on a nodal line of one mode excites only the degenerate partner
2. **Plate asymmetry**: Real plates have slight imperfections that lift degeneracy and fix orientation
3. **Damping**: Heavier damping at one edge can rotate the nodal pattern

This is why physically identical Chladni plates driven at the same frequency often show slightly different patterns: the degeneracy is broken differently each time.

---

## The Special Significance of Bessel Zeros

The Bessel zeros encode a spectrum of sacred proportions:

| Ratio | Value | Correspondence |
|-------|-------|---------------|
| α_{2,1} / α_{0,1} | 5.136 / 2.405 = **2.136** | Close to √(4.57) |
| α_{4,1} / α_{0,1} | 7.588 / 2.405 = **3.155** | Close to π |
| α_{3,1} / α_{1,1} | 6.380 / 3.832 = **1.664** | Close to √(e) |
| α_{5,1} / α_{1,1} | 8.772 / 3.832 = **2.289** | Near 7:3 harmonic |
| α_{6,1} / α_{2,1} | 9.936 / 5.136 = **1.934** | Near 2:1 octave |

The circular plate's frequency spectrum is **inharmonic** — the overtones are not integer multiples of the fundamental. This is what gives bells and bowls their distinctive shimmering quality. The slight inharmonicity means overtones beat against each other, creating the slow amplitude envelope we perceive as the "ring."

---

## Computing Bessel Zeros Numerically

```python
from scipy.special import jn_zeros
import numpy as np

# jn_zeros(m, n) returns first n zeros of J_m
for m in range(7):
    zeros = jn_zeros(m, 6)
    print(f"J_{m}: {np.round(zeros, 5)}")
```

See `examples/bessel_modes.py` for a complete plate eigenvalue solver.

---

*Every zero of J_m is a silence inscribed in the wave equation. Between the silences, the plate sings.*

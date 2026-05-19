# Bessel Function Zeros: The Eigenfrequency Atlas of the Circular Plate

## What This Is

Every circular Chladni pattern corresponds to a specific **mode (m, n)** where:
- **m** = number of nodal diameters (lines through the centre where the plate does not move)
- **n** = number of nodal circles (concentric rings where the plate does not move)

The frequency of mode (m, n) on a free-rimmed circular plate is:

```
f_mn = (λ_mn² / (2π R²)) · sqrt(D / ρh)
```

where:
- `λ_mn` is the n-th zero of J_m (the Bessel function of the first kind, order m)
- `R` is the plate radius
- `D = E·h³ / (12(1 − ν²))` is the flexural rigidity
- `ρ` is the plate density, `h` is thickness, `ν` is Poisson's ratio

## Table of Bessel Zeros j_{m,n}

These are the zeros of J_m(x): the values of x where J_m(x) = 0.

| n\m | m=0    | m=1    | m=2    | m=3    | m=4    | m=5    | m=6    | m=7    |
|-----|--------|--------|--------|--------|--------|--------|--------|--------|
| 1   | 2.4048 | 3.8317 | 5.1356 | 6.3802 | 7.5883 | 8.7715 | 9.9361 | 11.086 |
| 2   | 5.5201 | 7.0156 | 8.4172 | 9.7610 | 11.065 | 12.339 | 13.589 | 14.821 |
| 3   | 8.6537 | 10.173 | 11.620 | 13.015 | 14.373 | 15.700 | 17.004 | 18.288 |
| 4   | 11.792 | 13.324 | 14.796 | 16.223 | 17.616 | 18.980 | 20.321 | 21.642 |
| 5   | 14.931 | 16.471 | 17.960 | 19.409 | 20.827 | 22.218 | 23.586 | 24.935 |

**Note**: The table above gives zeros of J_m(x). For a **clamped-centre** plate the eigenvalues are the same zeros; for a **free-edge** plate (e.g. a gong) the condition changes and the zeros shift slightly. The values above are the theoretical pure-Bessel zeros, accurate for clamped-centre driving.

## Relative Frequency Ratios for 432 Hz Base

For a steel plate tuned so that mode (0,1) plays at 432 Hz, the other modes fall at:

```
f_mn / f₀₁ = (j_mn / j₀₁)² = (j_mn / 2.4048)²
```

| Mode (m,n) | j_mn   | Ratio to (0,1) | Hz at 432 base | Pattern | Sacred |
|-----------|--------|----------------|----------------|---------|--------|
| (0,1)     | 2.405  | 1.000          | 432            | Bullseye | Unison |
| (1,1)     | 3.832  | 2.537          | 1096           | Yin-yang | Duality |
| (2,1)     | 5.136  | 4.561          | 1970           | Triskelion | Triple spiral |
| (0,2)     | 5.520  | 5.273          | 2278           | Two rings | Nested circles |
| (3,1)     | 6.380  | 7.047          | 3044           | Four-leaf | Four directions |
| (1,2)     | 7.016  | 8.519          | 3680           | Yin-yang + ring | |
| (4,1)     | 7.588  | 9.952          | 4299           | Pentagram | Phi |
| (2,2)     | 8.417  | 12.25          | 5292           | Triskelion + ring | |
| (0,3)     | 8.654  | 12.94          | 5590           | Three rings | Triple world |
| (5,1)     | 8.772  | 13.29          | 5741           | Hexagram | Merkaba |
| (3,2)     | 9.761  | 16.47          | 7115           | Four-leaf + ring | |
| (6,1)     | 9.936  | 17.07          | 7374           | Heptagram | Seven planets |

## The (m,0) Modes — Purely Radial

A special class: modes with no nodal circles (n=0 — note: in some conventions this is n=1 for the first root). These are purely azimuthal:

- (0,0): No nodes — uniform displacement (rigid-body mode, zero frequency)
- (1,0): Single nodal diameter — the "yin-yang"

In general, the mode with m nodal diameters and no nodal circles has the simplest possible pattern.

## Asymptotic Formula for Large j_{m,n}

For large zeros (high modes), the Bessel zeros approach:

```
j_mn ≈ π · (n + m/2 − 1/4)    for large n
```

This means the frequency spacing between adjacent modes *increases* with mode number — the plate's spectrum is not harmonic. This is why Chladni plates do not sing with a harmonic tone. A circular drum tones "dirty" — its overtones are inharmonic.

Compare with a string: f_n = n · f₁ (perfectly harmonic). The drum's inharmonicity is why percussion instruments in most musical traditions are not tuned to harmonic intervals.

## The Bessel Function Itself

J_m(x) is the solution to Bessel's differential equation:

```
x² y'' + x y' + (x² − m²) y = 0
```

This equation appears when solving the wave equation (∇²u = ü) in cylindrical or spherical coordinates. The Bessel function is to cylindrical geometry what sine/cosine is to Cartesian geometry.

Key properties:
- J_m(0) = 0 for m ≥ 1 (the origin has no displacement for m ≥ 1)
- J_0(0) = 1 (the origin is an antinode for the axisymmetric mode)
- J_m(x) oscillates with slowly decreasing amplitude as x → ∞ (unlike sin/cos which are undamped)
- The zeros of J_m are all real, simple, and positive

## Computing Bessel Zeros

Quick calculation methods:
1. **McMahon's expansion** (high accuracy for large zeros): `j_mn ≈ β − (4m²−1)/(8β) − 4(4m²−1)(28m²−31)/(3(8β)³) + ...` where `β = (n + m/2 − 1/4)π`
2. **Halley's method** starting from McMahon's estimate: converges in 2–3 iterations
3. **Table lookup**: for m ≤ 7, n ≤ 5, the table above is sufficient

In GLSL, we use the asymptotic approximation `J_m(x) ≈ sqrt(2/πx)·cos(x − mπ/2 − π/4)` which is accurate to within 1% for x > 3 and sufficient for visual rendering of nodal patterns.

## References

- Abramowitz, M. & Stegun, I.A. (1964). *Handbook of Mathematical Functions*, Chapter 9. NIST.
- Rayleigh, Lord (1877). *The Theory of Sound*, Vol. II, Chapter XII. Macmillan.
- McLachlan, N.W. (1955). *Bessel Functions for Engineers*. Oxford University Press.
- Watson, G.N. (1922). *A Treatise on the Theory of Bessel Functions*. Cambridge University Press.

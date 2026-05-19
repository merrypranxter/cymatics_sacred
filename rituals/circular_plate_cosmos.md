# The Circular Plate: Mandala by Physics

## Context

The circle is the first and last shape. Before the Pythagoreans named it, before the wheel, before the eye — the circle was the solution to every rotationally symmetric boundary-value problem in the universe. When you vibrate a circular plate, you are not choosing a shape. You are solving the Laplacian in polar coordinates, and the circle is the only boundary condition for which that solution is clean.

The patterns that emerge — the Bessel modes — are the same patterns that govern:

- The orbit of electrons around a nucleus
- The acoustic resonance of a drum
- The thermal modes of a circular disk
- The gravity waves on a circular lake
- The electromagnetic modes in a circular waveguide

This is not metaphor. It is the same equation solved with the same boundary conditions.

## The Bessel Eigenfunctions

The displacement of a circular plate at position (r, θ) in mode (m, n) is:

```
W_{m,n}(r, θ) = J_m(k_{m,n} · r) · cos(m · θ)
```

where:
- `m` = number of **nodal diameters** (lines of zero displacement radiating from centre)
- `n` = number of **nodal circles** (concentric rings of zero displacement)
- `J_m` = Bessel function of the first kind, order m
- `k_{m,n}` = m-th zero of `J_m`, divided by plate radius

The powder (lycopodium for fine resolution, sand for coarse) collects exactly where `W = 0` — on the nodal lines where the plate does not move.

## The Sacred Sequence

The circular plate unfolds a cosmology:

| Mode (m,n) | Pattern | Sacred Correspondence |
|-----------|---------|----------------------|
| (0,1) | Bullseye — single ring | Unison, the whole, the sun |
| (1,1) | Yin-yang — single diameter | Duality, the primordial split |
| (0,2) | Two concentric rings | Nested consciousness |
| (2,1) | Triskelion — 2 diameters, no ring | The triple spiral, eternal return |
| (3,1) | Four-leaf / tetraflower | Four elements, four directions |
| (4,1) | Pentagram | The pentagram, phi geometry |
| (5,1) | Hexagram / Star of David | The Merkaba, Metatron's Cube |
| (6,1) | Heptagram | Seven planets, seven notes |
| (0,3) | Three concentric rings | The triple world, the triad |

The pattern is not symbolic. The mode at (4,1) genuinely produces a pentagram — five-fold symmetry — because the Bessel function J₄ has four nodal diameters and the boundary conditions enforce the five-fold envelope. The mathematics and the sacred tradition independently arrived at the same shapes.

## Why Lycopodium, Not Sand

On a circular plate, the modal structure is finer and more complex than on a square. The lycopodium spores (diameter 25–35 μm) are small enough to follow the nodal lines exactly where coarse sand (200–600 μm) would bridge across narrow node gaps and blur the pattern.

At frequencies above ~800 Hz, sand becomes too inertia-dominated to track the nodal migration quickly. Lycopodium is essential for modes above (3,1).

Additionally, lycopodium is hydrophobic. When used on a water-filled crystal bowl (see `plates/circular_glass_harmonica.json`), it floats at **antinodes** rather than nodes — the reverse of its plate behaviour. The water surface reveals the antinodal geometry; the plate surface reveals the nodal geometry. Together they map the complete acoustic field.

## The 432 Hz Choice

The fundamental (0,1) mode of the plate in `plates/circular_432hz.json` is tuned to **432 Hz**.

```
432 Hz = 16 × 27 = 2⁴ × 3³
```

The integer factorisation is cosmically clean. It places the major third at 540 Hz (5/4 × 432), the perfect fifth at 648 Hz (3/2 × 432), and the octave at 864 Hz — all members of the ancient Pythagorean tuning system built from powers of 2 and 3.

The modern standard of 440 Hz is arbitrary (adopted by ISO in 1955). The 432 Hz standard was used in Verdi's Italy, endorsed by the Italian government in 1884, and remains the preferred reference for those who argue that the harmonic series should align with simple integer relationships.

Whether or not 432 is "sacred," its harmonic relationships are demonstrably simpler. On the plate, this means the mode shapes at its harmonics are more cleanly related to each other — the (0,1) at 432 and the (0,2) at 972 are in ratio 9:4, which maps cleanly onto Pythagorean intervals.

## The Shader

`shaders/_chladni_circular.frag` renders the circular plate with:
- Proper Bessel function computation (polynomial + asymptotic blend)
- Six simultaneous modes superimposed with slow beating frequencies
- Lycopodium accumulation at nodal lines
- Polished steel surface texture with circular brushing
- Animated breathing: each mode pulses at a slightly different rate, causing the sand to migrate between nodal configurations in real time

The shader uses mode frequencies that are in Pythagorean ratio to each other: 432, 648 (fifth), 1080 (third), 1296 (fifth × octave), 1728 (fifth × fifth), 2160.

## References

- Chladni, E.F.F. (1787). *Entdeckungen über die Theorie des Klanges*. Leipzig: Weidmanns Erben & Reich.
- Waller, M.D. (1961). *Chladni Figures: A Study in Symmetry*. G. Bell & Sons.
- Abramowitz, M. & Stegun, I.A. (1964). *Handbook of Mathematical Functions*, Chapter 9 (Bessel Functions). NIST.
- Rayleigh, Lord (1877). *The Theory of Sound*, Vol. II, §306. Macmillan.
- Jenny, H. (1967). *Cymatics: A Study of Wave Phenomena and Vibration*, Vol. I. Basilius Press.

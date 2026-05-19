# cymatics_sacred

A creative coding project exploring cymatics — the visible patterns of sound vibration — through the lens of sacred geometry, temple acoustics, and harmonic resonance.

## What This Is

Not "sound visualizers" with bouncing spectrum bars. This project renders **actual physical cymatic phenomena**: Chladni figures, Faraday waves, singing bowl harmonics, granular nodal patterns, Rosensweig ferrofluid instabilities, spherical harmonics. The geometry emerges from frequency and boundary conditions, not from aesthetic defaults.

## Project Structure

```
shaders/          # GLSL fragment shaders — one per phenomenon
plates/           # Chladni plate configurations: shape, boundary, material, modes
harmonics/        # Frequency series, Bessel zeros, ratio-to-cymatic maps
rituals/          # Sacred context: temple geometry, healing spaces, cosmology
media/            # Sand, water, lycopodium, ferrofluid, cornstarch, colloidal silica
examples/         # Python code: eigenvalue solvers, mode visualisers
```

## Running

Open `viewer.html` in any modern browser — no server required. All eight shaders run in WebGL directly in the page. Use the frequency slider to sweep through modal structure; `u_freq` is most meaningful for `temple_resonance`, `ferrofluid`, and `sri_yantra`.

Shaders are also self-contained GLSL fragment shaders compatible with any WebGL environment (Shadertoy, Three.js, custom).

## Current Phenomena

- [x] **chladni_square** — square brass plate, nodal lines, sand at nodes, (m,n) Chladni modes, 432 Hz
- [x] **faraday_hex** — water surface, vertical forcing, subharmonic instability, hexagonal tessellation
- [x] **singing_bowl** — Tibetan bronze bowl, n=2..5 shell modes, water fountains at antinodes
- [x] **temple_resonance** — Hal Saflieni Hypogeum, 110 Hz standing wave map, oracle aperture focus
- [x] **circular_bessel** — circular steel disc, Bessel J_m eigenfunctions (A&S polynomial approx), lycopodium, 9 modes beating
- [x] **ferrofluid** — Rosensweig hexagonal spike instability, acoustic-magnetic modulation
- [x] **spherical_harmonics** — Y(l,m) modes l=0..4, equirectangular projection, cycles all 19 real harmonics
- [x] **sri_yantra** — nine interlocked Shakti/Shiva triangles (SDF), AUM wave interference, pulsing Bindu

## Plates

| File | Shape | Material | Fundamental |
|------|-------|----------|-------------|
| `square_432hz.json` | Square | Brass | 432 Hz |
| `circular_432hz.json` | Circular, clamped center | Steel | 432 Hz |
| `circular_free_edge.json` | Circular, free rim | Brass | 432 Hz |
| `triangular_plate.json` | Equilateral triangle | Aluminium 6061 | 528 Hz |
| `singing_bowl_tibetan.json` | Hemispherical shell | Panchaloga bronze | 226 Hz |
| `hypogeum_chamber.json` | Ellipsoidal cavity | Limestone | 110 Hz |

## Media

| File | Type | Behaviour |
|------|------|-----------|
| `sand.json` | Dry granular | Migrates to **nodes** |
| `lycopodium.json` | Fine powder | Migrates to nodes (on plates); antinodes on water |
| `water.json` | Newtonian fluid | Faraday standing waves, hexagonal Instability |
| `ferrofluid.json` | Magnetic colloid | Rosensweig spike array |
| `cornstarch.json` | Non-Newtonian (dilatant) | Accumulates at **antinodes** (inverted polarity) |
| `colloidal_silica.json` | Mie-scattering colloid | High-resolution nodal imaging (Tyndall glow) |

## Harmonic Reference

| Ratio | Name | Cymatic Effect |
|-------|------|---------------|
| 2:1 | Octave | Doubles nodal count, same shape family |
| 3:2 | Fifth | Creates 5-fold and 3-fold hybrid patterns |
| 5:4 | Major Third | Sweet, stable tessellations |
| 7:4 | Harmonic Seventh | Rare, tense, quasi-periodic |
| φ:1 | Golden Ratio | Fractal self-similarity in nodal branching |

See `harmonics/bessel_zeros.md` for the complete Bessel zero table and frequency formulas.  
See `harmonics/interval_cymatic_map.md` for ratio-by-ratio cymatic geometry analysis.

## Rituals

| File | Subject |
|------|---------|
| `square_plate_earth.md` | The square plate as Earth alignment, 432 Hz, fourfold sacred geometry |
| `circular_plate_sky.md` | The circular plate as solar disc, Buddhist wheel, Eye of Horus |
| `singing_bowl.md` | Tibetan bowl physics, panchaloga alloy, Buddhist consciousness map |
| `temple_hypogeum.md` | Hal Saflieni Hypogeum, 110 Hz EEG effects, oracle acoustics |
| `faraday_water_temples.md` | Delphi, Karnak, Chichen Itza — ancient water cymatics |
| `ferrofluid_iron_geometry.md` | Rosensweig instability, iron alchemy, 3D acoustic sculpture |

## Python Examples

```bash
pip install numpy scipy matplotlib

# Print mode frequency table for default steel plate
python examples/bessel_modes.py --list

# Show mode closest to 432 Hz
python examples/bessel_modes.py --freq 432

# Show specific mode (4, 1) — the pentagram
python examples/bessel_modes.py --mode 4 1

# 4×4 grid of first 16 mode shapes
python examples/bessel_modes.py --grid

# Use brass plate, 200 mm radius
python examples/bessel_modes.py --material brass --radius 0.1 --grid
```

## References

- Chladni, E. (1787). *Entdeckungen über die Theorie des Klanges*.
- Jenny, H. (1967, 1974). *Cymatics*, Vols. I & II.
- Leissa, A.W. (1993). *Vibration of Plates*. NASA SP-160.
- Lubman, D. (2002). "Ancient acoustic spaces." *Journal of the Acoustical Society of America*.
- Cook, I.A. et al. (2008). Ancient architectural acoustic resonance and regional brain activity. *Time and Mind*.
- Rosensweig, R.E. (1985). *Ferrohydrodynamics*. Cambridge University Press.
- Abramowitz, M. & Stegun, I.A. (1964). *Handbook of Mathematical Functions*. §9.4 (Bessel functions).

---

*The geometry is not chosen. It is revealed by the vibration.*


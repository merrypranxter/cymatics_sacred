# cymatics_sacred

A creative coding project exploring cymatics — the visible patterns of sound vibration — through the lens of sacred geometry, temple acoustics, and harmonic resonance.

## What This Is

Not "sound visualizers" with bouncing spectrum bars. This project renders **actual physical cymatic phenomena**: Chladni figures, Faraday waves, singing bowl harmonics, granular nodal patterns. The geometry emerges from frequency and boundary conditions, not from aesthetic defaults.

## Project Structure

```
shaders/          # GLSL fragments — one per phenomenon
plates/           # Chladni plate configurations: shape, boundary, material
harmonics/        # Frequency series, Bessel zeros, intonation systems
rituals/          # Sacred context: temple geometry, healing spaces, alignment
media/            # Sand, salt, water, lycopodium, ferrofluid, cornstarch properties
```

## Running

Open `viewer.html` in any modern browser — no server required. All ten shaders run in WebGL directly in the page. Use the frequency slider to sweep through modal structure; it is most meaningful for `_temple_resonance` (room modes), `_cymascope_water` (Bessel wave scaling), `_ferrofluid_rosensweig` (acoustic pattern speed), and `_lissajous_sand` (selects harmonic ratio).

Shaders are also self-contained GLSL fragment shaders compatible with any WebGL environment (Shadertoy, Three.js, custom).

## Current Phenomena

- [x] _chladni_square — square brass plate, nodal lines, sand accumulation at nodes
- [x] _chladni_circular — circular steel plate, Bessel J_m(k·r)·cos(m·θ) modes, lycopodium powder
- [x] _faraday_hex — water surface, vertical forcing, subharmonic instability, hexagonal tessellation
- [x] _singing_bowl — Tibetan bronze bowl, water fountains at antinodes, n=2..5 shell modes
- [x] _cymascope_water — water Cymascope dish, Bessel radial modes, lycopodium at antinodes
- [x] _temple_resonance — Hal Saflieni Hypogeum, 110 Hz standing wave map, oracle aperture focus
- [x] _ferrofluid_rosensweig — Rosensweig instability, hexagonal spike array, acoustic height modulation
- [x] _lissajous_sand — square plate dual-frequency driving, sand at Lissajous nodal intersections
- [x] _quasiperiodic — 5-fold Penrose-like + 7-fold golden-ratio dual waves, aperiodic geometry
- [x] _spherical_harmonics — Y_l^m(θ,φ) eigenfunctions, l=2..4, equirectangular sphere map

## Harmonic Reference

| Ratio | Name | Cymatic Effect |
|-------|------|---------------|
| 2:1 | Octave | Doubles nodal count, same shape family |
| 3:2 | Fifth | Creates 5-fold and 3-fold hybrid patterns |
| 5:4 | Major Third | Sweet, stable tessellations |
| 7:4 | Harmonic Seventh | Rare, tense, quasi-periodic |
| φ:1 | Golden Ratio | Fractal self-similarity in nodal branching |

See `harmonics/reference.md` for the full Pythagorean / just intonation / Solfeggio tables.  
See `harmonics/bessel_zeros.md` for the complete Bessel zero atlas and circular-plate eigenfrequency table.  
See `harmonics/intonation_systems.md` for a comparative analysis of tuning systems and their cymatic consequences.

## Plates

| File | Shape | Fundamental | Medium | Notes |
|------|-------|-------------|--------|-------|
| square_432hz.json | Square brass | 432 Hz | Sand | Earth modes (2,2)→(4,4) |
| circular_432hz.json | Circular steel | 432 Hz | Lycopodium | Bessel modes (0,1)→(6,1) |
| singing_bowl_tibetan.json | Hemispherical bronze | 226 Hz | Water | n=2..5 rim modes |
| circular_glass_harmonica.json | Hemispherical quartz | 432 Hz | Water + lycopodium | High-Q crystal bowl |
| hexagonal_plate.json | Hexagonal brass | 396 Hz | Sand | C6v modes — true hexagrams |
| hypogeum_chamber.json | Ellipsoidal cavity | 110 Hz | Air | Hal Saflieni acoustic map |

## Media

| File | Type | Use |
|------|------|-----|
| sand.json | Granular coarse | Square/circular plates, 50–400 Hz |
| lycopodium.json | Granular fine | Fine-resolution nodal mapping above 500 Hz |
| salt.json | Granular cubic | Demonstrations 30–400 Hz; hygroscopic fossil effect |
| water.json | Fluid | Faraday waves, Cymascope, singing bowl surface |
| ferrofluid.json | Magnetic colloid | Rosensweig instability + acoustic spike modulation |
| cornstarch.json | Non-Newtonian | Shear-thickening acoustic columns — the most dramatic demo |

## References

- Chladni, E. (1787). *Entdeckungen über die Theorie des Klanges*.
- Jenny, H. (1967, 1974). *Cymatics*, Vols. I & II.
- Lubman, D. (2002). "Ancient acoustic spaces." *Journal of the Acoustical Society of America*.
- Rosensweig, R.E. (1985). *Ferrohydrodynamics*. Cambridge University Press.
- Lissajous, J.A. (1857). Mémoire sur l'étude optique des mouvements vibratoires.
- Abramowitz, M. & Stegun, I.A. (1964). *Handbook of Mathematical Functions*, Chapter 9.

---

*The geometry is not chosen. It is revealed by the vibration.*

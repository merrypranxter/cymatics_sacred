# cymatics_sacred

A creative coding project exploring cymatics — the visible patterns of sound vibration — through the lens of sacred geometry, temple acoustics, and harmonic resonance.

## What This Is

Not "sound visualizers" with bouncing spectrum bars. This project renders **actual physical cymatic phenomena**: Chladni figures, Faraday waves, singing bowl harmonics, granular nodal patterns. The geometry emerges from frequency and boundary conditions, not from aesthetic defaults.

## Project Structure

```
shaders/          # GLSL fragments — one per phenomenon
plates/           # Chladni plate configurations: shape, boundary, material
harmonics/        # Frequency series: Pythagorean, just intonation, Solfeggio
rituals/          # Sacred context: temple geometry, healing spaces, alignment
media/            # Sand, water, powder, fluid properties
```

## Running

Open `viewer.html` in any modern browser — no server required. All four shaders run in WebGL directly in the page. Use the frequency slider to sweep through modal structure; the `u_freq` uniform is most meaningful for `_temple_resonance`.

Shaders are also self-contained GLSL fragment shaders compatible with any WebGL environment (Shadertoy, Three.js, custom).

## Current Phenomena

- [x] _chladni_square — square brass plate, nodal lines, sand accumulation at nodes
- [x] _faraday_hex — water surface, vertical forcing, subharmonic instability, hexagonal tessellation
- [x] _singing_bowl — Tibetan bronze bowl, water fountains at antinodes, n=2..5 shell modes
- [x] _temple_resonance — Hal Saflieni Hypogeum, 110 Hz standing wave map, oracle aperture focus

## Harmonic Reference

| Ratio | Name | Cymatic Effect |
|-------|------|---------------|
| 2:1 | Octave | Doubles nodal count, same shape family |
| 3:2 | Fifth | Creates 5-fold and 3-fold hybrid patterns |
| 5:4 | Major Third | Sweet, stable tessellations |
| 7:4 | Harmonic Seventh | Rare, tense, quasi-periodic |
| φ:1 | Golden Ratio | Fractal self-similarity in nodal branching |

## References

- Chladni, E. (1787). *Entdeckungen über die Theorie des Klanges*.
- Jenny, H. (1967, 1974). *Cymatics*, Vols. I & II.
- Lubman, D. (2002). "Ancient acoustic spaces." *Journal of the Acoustical Society of America*.

---

*The geometry is not chosen. It is revealed by the vibration.*

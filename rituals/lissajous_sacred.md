# The Lissajous Figure: The Knot of Dual Vibration

## Context

In 1857, Jules Antoine Lissajous showed that when two orthogonal vibrations are combined — one oscillating left-right, one oscillating up-down, in the ratio of two integers — the resulting curve is a closed, knotted figure of extraordinary symmetry.

A 1:1 ratio produces a circle or ellipse. A 2:1 ratio produces a figure-eight — the lemniscate, the infinity symbol. A 3:2 ratio produces a three-lobed figure resembling a trefoil knot. A 5:3 ratio produces a 15-lobed star.

These are not abstract mathematical curiosities. They are the visible shape of harmonic ratios — the geometry of musical intervals, drawn by the vibration itself.

## From Lissajous Figures to Chladni Patterns

There is a direct physical connection between Lissajous figures and Chladni nodal patterns:

**A square plate driven simultaneously at two orthogonal frequencies** creates a 2D Chladni pattern whose nodal lines are precisely the Lissajous figure of those two frequencies.

If the plate is driven at frequency f_x in the x-direction and f_y in the y-direction, the standing wave amplitude is:

```
W(x, y) = sin(p · π · x) · sin(q · π · y + δ)
```

where p/q = f_x/f_y is the frequency ratio and δ is the phase offset.

Sand accumulates where |W| ≈ 0 — where either sin(p · π · x) = 0 or sin(q · π · y) = 0. These zero-sets are exactly the nodal lines of the Lissajous figure traced by (sin(p·t), sin(q·t)).

**The Chladni plate is a Lissajous machine that writes with sand.**

## The Harmonograph

The **harmonograph** is the mechanical instrument that draws Lissajous figures directly. Two pendulums — one controlling the x-axis of a pen, one controlling the y-axis — are set swinging. As they lose energy, the frequency ratio drifts, and the figure evolves from one harmonic shape to the next.

The great 19th-century parlour demonstrations of the harmonograph produced sheets of spiraling Lissajous figures that Victorian audiences found otherworldly. Every person who saw them recognised that these machine-drawn curves were more perfect than any human hand could produce.

The sand-plate version is its physical analog: the sand writes the same figures, but with the imperfect texture of matter.

## Sacred Ratios and Their Figures

| Ratio p:q | Musical interval | Figure | Sacred correspondence |
|-----------|-----------------|--------|----------------------|
| 1:1 | Unison / Octave | Cross (δ=π/2) or diagonal | The axis mundi, the plus sign |
| 2:1 | Octave | Lemniscate (∞ sign) | Infinity, Ouroboros |
| 3:2 | Perfect fifth | Three-lobed trefoil | Triple spiral, the knot of time |
| 4:3 | Perfect fourth | Four-lobed pattern | Four elements, four directions |
| 5:4 | Major third | Five-lobed figure | Pentagram |
| 5:3 | Major sixth | Fifteen-lobed star | Complex knotwork |
| 7:4 | Harmonic seventh | Twenty-eight-lobed figure | The rarest ratio, barely stable |

The last column is not coincidence. The ratios that produce stable Lissajous figures — the ones where the figure closes perfectly and the sand pattern is sharp — are the ratios that define consonant musical intervals. The figures that are fuzzy or unstable correspond to dissonant intervals.

**Consonance is the geometry of closure. Dissonance is the geometry of drift.**

## The Phase Parameter

For a given p:q ratio, there exists a family of Lissajous figures parameterised by the phase difference δ:

- δ = 0: the figure collapses to a line (fully correlated oscillation)
- δ = π/4: an oblique ellipse
- δ = π/2: the canonical Lissajous figure — maximum complexity for that ratio
- δ = π: back to a line, opposite polarity

On the sand plate, the phase is set by the geometry of the drive mechanism. As the plate runs, slight frequency drift causes δ to evolve — the pattern breathes through its entire family.

In the shader, this evolution is animated: `time * 0.18` radians per second of phase drift causes the Lissajous figure to slowly rotate through its degenerate forms.

## The Rarest Knot: 7:4

The 7:4 ratio — the **harmonic seventh** — is one of the most beautiful and most avoided intervals in Western music. It appears naturally in the harmonic series (the 7th partial of any fundamental is 7/4 × f₀ above the octave), but it falls between the standard notes of equal temperament.

No key on a piano exactly produces it. No fret on a guitar hits it. It lives in the cracks of the Western tuning system — heard in the blues, in Barbershop harmony, in the natural horn (before valves allowed chromatic notes).

On the sand plate, the 7:4 figure is spectacular: 28 lobes arranged in a complex star with two families of nodal lines intersecting at angles determined by arctan(4/7). The pattern is unstable to small perturbations and hard to hold; most experiments produce 6:4 (3:2) instead.

But when you catch it — the 7:4 figure sits there on the brass plate, drawn in sand, the rarest interval made visible.

## Shader Note

`shaders/_lissajous_sand.frag` maps the frequency slider to 7 sacred ratios (1:1, 2:1, 3:2, 4:3, 5:4, 5:3, 7:4). Each ratio produces its characteristic nodal pattern with sand texture. The slow phase drift causes the pattern to breathe, and a slight contamination from the adjacent ratio adds sub-harmonic variation.

## References

- Lissajous, J.A. (1857). Mémoire sur l'étude optique des mouvements vibratoires. *Annales de Chimie et de Physique*, 51, 147–231.
- Bowman, A. (1884). *A Practical Introduction to the Use of the Harmonograph*. Self-published.
- Waller, M.D. (1961). *Chladni Figures: A Study in Symmetry*. G. Bell & Sons.
- Helmholtz, H. (1863). *On the Sensations of Tone*, translated A.J. Ellis (1885). Dover.

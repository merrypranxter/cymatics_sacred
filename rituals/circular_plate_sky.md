# The Circular Plate: Sky, Sun, Eye of Heaven

## Context

If the square plate is Earth — fourfold, cardinal, anchored — then the circular plate is **Sky**. No corners, no preferential direction, continuous symmetry. The circle is the form that sounds most purely, most completely.

When Chladni first drove circular plates, he saw what no theory predicted: patterns of infinite grace. Bullseyes and triskelions and pentagrams, each emerging from a single frequency, each as inevitable as a snowflake. The plate does not choose its pattern. The frequency chooses it.

## The Geometric Sequence of Modes

The circular plate's modes do not progress in the orderly way of a square plate's grid. They spiral through a more complex sequence, governed by the irrational spacing of Bessel zeros:

```
Mode (0,1): α = 2.405 → Bullseye       — the unbroken circle
Mode (1,1): α = 3.832 → Yin-Yang split — the first division
Mode (2,1): α = 5.136 → Triskelion     — the triple spiral
Mode (0,2): α = 5.520 → Double ring    — nested infinities
Mode (3,1): α = 6.380 → Four-leaf      — the directions
Mode (4,1): α = 7.588 → Pentagram      — the golden form
Mode (5,1): α = 8.772 → Hexagram       — Star of David
Mode (6,1): α = 9.936 → Heptagram      — the planets' wheel
```

This sequence contains — in order of frequency — the whole lexicon of sacred geometry. The plate does not know this. It is simply solving the wave equation.

## The Solar Disc

In ancient Egyptian cosmology, Ra travels through the sky as a disc. The **Aten** (sun disc) of Akhenaten's revolution was considered the primary god — pure geometry, undivided, radiating outward.

The circular plate vibrating at its fundamental (0,1) mode **is** the solar disc in acoustic form:
- Maximum amplitude at the rim (the sun's corona)
- Nodal circle at 63% of the radius (the chromosphere, the transition zone)
- Minimum at the center (the dark umbra of the sunspot)

The analogy is not metaphorical. The sun vibrates. Solar p-modes (pressure waves) traverse the solar interior in patterns that are, rigorously, spherical harmonics of the same family as the circular plate's Bessel modes. The sun is singing. We have been measuring its song since the 1960s.

## The Buddhist Wheel (Dharmachakra)

The eight-spoked Wheel of Dharma (*dharmachakra*) is the central symbol of Buddhism. **Eight spokes** divide the wheel into eight equal sectors.

The circular plate's mode (6,1) — six nodal diameters — gives 12 sectors (alternating positive and negative amplitude). The mode (3,1) — three nodal diameters — gives 6 sectors. Neither is the eight. But the mode (7,1) — seven nodal diameters — gives the octagram: 14 sectors that closely approximate the eight-spoked wheel.

The eight-fold path (samma ditthi, samma sankappo...) mapped to eight plate sectors: each sector is a mode of awareness, each vibrating at its natural frequency.

## The Eye of Horus

Horus, the falcon god, has one eye that is the sun and one eye that is the moon. The Eye of Horus (wedjat) is a compound symbol: part eye, part falcon markings, part fraction series (1/2 + 1/4 + 1/8 + 1/16 + 1/32 + 1/64 = 63/64 ≈ 1).

The circular plate in its (0,1) mode shows exactly this structure: a central dark spot (the pupil), a bright intermediate ring (the iris), and the bright rim (the outer eye). The ratio of nodal circle radius to rim radius for the (0,1) mode is α_{0,0}/α_{0,1} = 0/2.405 = 0 (no inner zero — the only inner zero of J_0 before 2.405 is the origin). The *first* inner zero appears in the (0,2) mode at r = R · 2.405/5.520 = **0.436 R**.

The double-ring (0,2) mode — with its inner ring at 43.6% of the radius — is structurally identical to the Eye of Horus's proportions.

## Driving the Circular Plate: The Yogi's Technique

The traditional Chladni method uses a violin bow drawn across the rim. For a circular plate this requires subtlety: the drive point must not lie on a nodal diameter of the desired mode.

For the (m,1) modes with m nodal diameters:
- **Touch the plate** at one point on a nodal diameter (this is the constraint that forces that diameter to be nodal)
- **Bow the plate** at a point 90°/m away from the touch point (the antinode)
- The result: a stable (m,1) Chladni pattern

This is the acoustic equivalent of meditation: **hold one point silent, vibrate at another, and the pattern reveals itself**.

## Comparison with the Square Plate

| Property | Square Plate | Circular Plate |
|----------|-------------|----------------|
| Symmetry group | C₄ (fourfold) | C∞ (infinite) |
| Lowest mode | (1,1) cross | (0,1) bullseye |
| Mode spectrum | Commensurate (near-integer ratios) | Incommensurate (Bessel zero ratios) |
| Overtone character | Nearly harmonic | Distinctly inharmonic |
| Sacred domain | Earth, foundation, matter | Sky, spirit, consciousness |
| Powder medium | Sand (coarser) | Lycopodium (finer) |
| Typical size | 300 mm square | 300 mm diameter |
| Driving frequency | 432 Hz (Earth tone) | 432–864 Hz (solar octave) |

The square plate resolves into the grid; the circular plate resolves into the mandala. Both are solutions to the same equation on different domains.

## Using the Shader

`shaders/_circular_bessel.frag` renders nine Bessel modes simultaneously with time-varying amplitudes. The modes beat against each other slowly (one cycle every 8–15 seconds), causing the lycopodium powder pattern to breathe and reorganise.

To freeze a single mode, set u_time to the value where only one amplitude term is dominant:
- t ≈ 0: mode (0,1) dominant — bullseye
- t ≈ 2.2: mode (0,2) dominant — double ring
- t ≈ 3.6: mode (4,1) dominant — pentagram

## References

- Waller, M.D. (1961). *Chladni Figures: A Study in Symmetry*. London: Bell.
- Elmore, W.C. & Heald, M.A. (1985). *Physics of Waves*. Dover. Chapter 7.
- Christensen-Dalsgaard, J. et al. (1996). The current state of solar modeling. *Science*, 272(5266), 1286–1292. [Solar p-modes as plate modes]
- McLachlan, N.W. (1955). *Bessel Functions for Engineers*. Oxford University Press.

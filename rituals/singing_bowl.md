# The Singing Bowl: Vessel of Resonant Transformation

## Context

The Tibetan singing bowl (Tibetan: *rin gzhong*) is a standing bell inverted — a hemispherical metal shell, struck or continuously driven at the rim. Unlike a plate, its boundary is **free**; the rim vibrates freely, and the pattern depends entirely on the vessel's shape, alloy, and how it is played.

When half-filled with water and driven continuously, the bowl becomes a three-dimensional Cymascope: the water surface reveals the interior acoustic field as a living sculpture of fountains, standing waves, and jet eruptions.

## The Panchaloga Alloy

Traditional bowls are cast from *panchaloga* — five metals (copper, tin, zinc, iron, lead) with trace gold and sometimes mercury. The specific alloy ratio affects:

- The fundamental frequency (higher tin → higher pitch, brighter tone)
- The overtone series spacing (more complex alloys produce inharmonic series)
- The decay time (the "singing" quality)

The golden ratio between successive overtone frequencies in the finest bowls is not accidental.

## Physics of the Water Fountains

At the bowl's fundamental mode (n=2, four antinodes at 90° intervals), the rim deflects in a quadrupole pattern. This injects pressure pulses into the water at the antinode positions — **four water jets erupt symmetrically**. As frequency climbs to the n=3 mode (six antinodes), six fountains appear.

The fountain height scales with driving amplitude: `h ≈ A² · ω² / (2g)` where A is antinode displacement amplitude.

## Sacred Dimension

The singing bowl is used in Buddhist ritual to mark the beginning and end of meditation periods, to purify space, and to guide consciousness through frequency entrainment. The harmonic series of the bowl mirrors the Buddhist enumeration of consciousness states — from the gross (fundamental) to the subtle (upper partials).

The water in the bowl represents *samsara* — the world of appearance. The standing wave pattern is *dharma* — the underlying structure that organizes appearance into recognizable form.

## Shader Note

`shaders/_singing_bowl.frag` renders the bowl's n=2 to n=5 modes, with water surface simulation and four-to-twelve jet eruptions driven by the mode index.

## References

- Inácio, O., Antunes, J. & Wright, M.C.M. (2006). Acoustics of Tibetan singing bowls. *Acta Acustica*.
- Terwagne, D. & Bush, J.W.M. (2011). Tibetan singing bowls. *Nonlinearity*.

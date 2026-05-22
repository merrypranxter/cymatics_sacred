# Intonation Systems: The Geometry of Tuning

## Overview

Every tuning system is a decision about which frequency ratios are considered consonant — and therefore which will produce clean Chladni patterns when used to drive a vibrating plate.

This is not metaphor. A plate driven at a frequency that is in a simple integer ratio with its fundamental will produce a crisp, symmetric nodal pattern. A plate driven at an irrational or near-rational frequency will produce a blurred, unstable pattern. **The tuning system is written in the sand.**

---

## Pythagorean Tuning (3-Limit Just Intonation)

All intervals built from the prime factors 2 and 3 only. The ancient Greek system.

```
Generator: perfect fifth, ratio 3:2
Each fifth: multiply by 3/2 (reduce by octave if needed: × 3/4 to stay < 2)
```

| Interval Name     | Ratio   | Cents | Hz at A=432 | Cymatic Character |
|-------------------|---------|-------|-------------|-------------------|
| Unison            | 1:1     | 0     | 432.0       | Single mode, whole surface |
| Minor Second      | 256:243 | 90    | 455.1       | Complex, no clean pattern |
| Major Second      | 9:8     | 204   | 486.0       | Moderate; grid patterns |
| Minor Third       | 32:27   | 294   | 512.0       | Adequate |
| Major Third       | 81:64   | 408   | 546.8       | Somewhat stable |
| Perfect Fourth    | 4:3     | 498   | 576.0       | 7-fold hybrid |
| Tritone           | 729:512 | 612   | 615.1       | Unstable — the devil's interval |
| Perfect Fifth     | 3:2     | 702   | 648.0       | 5-fold hybrid — clear |
| Minor Sixth       | 128:81  | 792   | 685.3       | Moderate |
| Major Sixth       | 27:16   | 906   | 729.0       | Crystalline lattice |
| Minor Seventh     | 16:9    | 996   | 768.0       | Complex |
| Major Seventh     | 243:128 | 1110  | 820.1       | Near-octave tension |
| Octave            | 2:1     | 1200  | 864.0       | Doubles nodal count, same family |

**Pythagorean comma**: after 12 perfect fifths, you overshoot the octave by 23.46 cents (ratio 531441:524288). This is why 12-tone Pythagorean tuning cannot close a circle of fifths.

---

## Just Intonation (5-Limit)

Adds the prime factor 5, enabling clean major thirds.

| Interval | Ratio | Cents | Vs Pythagorean |
|----------|-------|-------|----------------|
| Major Third | 5:4 | 386.3 | 21.5 cents flatter than 81:64 |
| Minor Third | 6:5 | 315.6 | 21.5 cents sharper than 32:27 |
| Major Sixth | 5:3 | 884.4 | 21.5 cents flatter than 27:16 |
| Minor Seventh | 7:4 | 968.8 | *(7-limit)* |
| Natural Seventh | 7:4 | 968.8 | 31.2 cents flat of 16:9 |

The syntonic comma (81:80 = 21.5 cents) is the difference between the Pythagorean major third (81:64) and the just major third (5:4). In just intonation it disappears; in Pythagorean tuning it is audible as the slight "wolf" quality of thirds.

**Cymatic effect**: Just thirds (5:4) produce dramatically cleaner Chladni patterns than Pythagorean thirds (81:64). The simpler the ratio, the simpler the nodal geometry.

---

## Equal Temperament (12-TET)

Divides the octave into 12 equal semitones. Each semitone = 2^(1/12) ≈ 1.05946.

```
Every interval except the octave is irrational.
f_n = 440 · 2^(n/12) Hz
```

| Interval | ET Ratio | Nearest Just | Deviation (cents) |
|----------|----------|--------------|-------------------|
| Unison | 1.0000 | 1:1 | 0.0 |
| Major Second | 1.1225 | 9:8 | +3.9 |
| Major Third | 1.2599 | 5:4 | +13.7 |
| Perfect Fourth | 1.3348 | 4:3 | −2.0 |
| Perfect Fifth | 1.4983 | 3:2 | −2.0 |
| Major Sixth | 1.6818 | 5:3 | +15.6 |
| Octave | 2.0000 | 2:1 | 0.0 |

**Cymatic consequence**: On a vibrating plate, equal temperament intervals produce *blurred* nodal patterns — not the clean geometric figures of just intonation. The major third at +13.7 cents produces a wobbly, restless figure compared to the stable 5:4 just third.

This is not an argument against equal temperament — it is a practical necessity for fixed-pitch instruments like the piano. But it explains why Chladni demonstrations are always done with just-intonation frequency ratios: simple ratios produce simple, beautiful patterns.

---

## Solfeggio Frequencies

A set of frequencies attributed to Gregorian chant, revived in 20th-century New Age literature.

| Note | Hz    | Factor from 174 | Mathematical Structure |
|------|-------|-----------------|------------------------|
| Ut   | 174   | 1               | 174 = 2 × 3 × 29 |
| Ut   | 396   | 2.276           | 396 = 4 × 99 = 4 × 9 × 11 |
| Re   | 417   | 2.397           | 417 = 3 × 139 |
| Mi   | 528   | 3.034           | 528 = 2⁴ × 3 × 11 |
| Fa   | 639   | 3.672           | 639 = 3² × 71 |
| Sol  | 741   | 4.259           | 741 = 3 × 13 × 19 |
| La   | 852   | 4.897           | 852 = 4 × 3 × 71 |
| Ti   | 963   | 5.534           | 963 = 9 × 107 |

**Assessment**: The Solfeggio frequencies do not form simple integer ratios with each other. The ratio 528/396 = 4/3 is the only clean ratio in the set, and 528/264 = 2:1 (octave). The claim that they have special healing properties is not supported by physics. They are, however, at interesting points in the acoustic spectrum and do produce Chladni patterns — just not especially symmetric ones.

The cymatically meaningful feature of 528 Hz is that it is approximately 12 × 44 = 12th harmonic of 44 Hz, which is close to the Schumann resonance fundamental (7.83 Hz) × some harmonic. These connections are approximate, not exact.

---

## The Harmonic Series

The overtone series of any vibrating string or column:

```
f_n = n × f₁   for n = 1, 2, 3, ...
```

| Partial | Ratio to f₁ | Musical interval | Character |
|---------|------------|------------------|-----------|
| 1 | 1:1 | Fundamental | The root |
| 2 | 2:1 | Octave | Pure doubling |
| 3 | 3:1 (= 3:2 above octave) | Perfect fifth | Bright, open |
| 4 | 4:1 (= 2:1 × 2:1) | Two octaves | Very high octave |
| 5 | 5:4 (above two octaves) | Major third | Warm, stable |
| 6 | 6:5 (above 5th) | Minor third | Darker third |
| 7 | 7:4 (above octave) | Harmonic seventh | Blue, bent |
| 8 | 8:5 (above third) | Minor sixth | Melancholic |
| 9 | 9:8 (above octave) | Major second | Bright step |
| 10 | 10:9 | Minor whole tone | Darker step |
| 11 | 11:8 | Augmented fourth | Mysterious |
| 12 | 12:11 | Near neutral second | Microtonal |
| 13 | 13:8 | Near minor sixth | Unusual |
| 14 | 14:13 | Near half-step | Very narrow |
| 16 | 16:1 | Four octaves above fundamental | |

The harmonic series is the physical basis of all Western music. The intervals that sound consonant are those that correspond to low-integer ratios in the series. The intervals that sound tense or dissonant correspond to higher-integer ratios — the ones that produce complex or unstable Chladni patterns.

---

## 432 vs 440 Hz: A Cymatic Perspective

| Property | A=432 Hz | A=440 Hz |
|----------|----------|----------|
| A₄ | 432 = 2⁴ × 3³ | 440 = 2³ × 5 × 11 |
| C₄ (major third below) | 360 = 2³ × 3² × 5 | 369.99... (irrational in ET) |
| G₃ (perfect fifth below) | 288 = 2⁵ × 3² | 293.33... |
| D₄ (major second above) | 486 = 2 × 3⁵ | 495 = 5 × 99 |
| Integer-ratio harmonics | All harmonics are integers | 440: octaves are integers; rest are irrational |

In just intonation, **432** allows the entire scale to be expressed in small integers. This is the cymatic argument for 432 Hz: the plate patterns at harmonics of 432 are cleaner because the ratios between modes are simpler.

In equal temperament, this advantage disappears because all intervals are irrational anyway.

---

## References

- Helmholtz, H.L.F. (1863). *On the Sensations of Tone*, translated A.J. Ellis (1885). Dover.
- Barbour, J.M. (1951). *Tuning and Temperament: A Historical Survey*. Michigan State College Press.
- Partch, H. (1949). *Genesis of a Music*, 2nd ed. (1974). Da Capo Press.
- Sethares, W.A. (2005). *Tuning, Timbre, Spectrum, Scale*, 2nd ed. Springer.
- Duffin, R.W. (2007). *How Equal Temperament Ruined Harmony (and Why You Should Care)*. Norton.

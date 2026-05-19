// MEDIUM: Chladni circular plate — clamped-center steel disc, lycopodium powder
// FREQUENCY: 432 Hz fundamental, Bessel eigenfunctions J_m(α_{mn}·r/R)·cos(m·θ)
// GEOMETRY: Circular plate, clamped at center point, free rim
// SACRED: Celestial mandala, wheel of dharma, eye of god, solar disc

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;

#define PI  3.14159265
#define TAU 6.28318530

// ─── Bessel function approximations (Abramowitz & Stegun §9.4) ─────────────

// J0(x): order-0 Bessel function of the first kind
// Error < 5×10⁻⁷ for |x| ≤ 3.75; asymptotic expansion for |x| > 3.75
float J0(float x) {
    float ax = abs(x);
    if (ax < 3.75) {
        float t  = x / 3.75;
        float t2 = t * t;
        return 1.0 + t2 * (-2.2499997
             + t2 * ( 1.2656208
             + t2 * (-0.3163866
             + t2 * ( 0.0444479
             + t2 * (-0.0039444
             + t2 *   0.0002100)))));
    } else {
        float t  = 3.75 / ax;
        float p0 = 0.79788456
             + t * (-0.00000077
             + t * (-0.00552740
             + t * (-0.00009512
             + t * ( 0.00137237
             + t * (-0.00072805
             + t *   0.00014476)))));
        float q0 = -0.78539816
             + t * (-0.04166397
             + t * (-0.00003954
             + t * ( 0.00262573
             + t * (-0.00054125
             + t * (-0.00029333
             + t *   0.00013558)))));
        return p0 / sqrt(ax) * cos(ax + q0);
    }
}

// J1(x): order-1 Bessel function of the first kind
float J1(float x) {
    float ax   = abs(x);
    float sgn  = (x < 0.0) ? -1.0 : 1.0;
    if (ax < 3.75) {
        float t  = x / 3.75;
        float t2 = t * t;
        return sgn * ax * (0.5
             + t2 * (-0.56249985
             + t2 * ( 0.21093573
             + t2 * (-0.03954289
             + t2 * ( 0.00443319
             + t2 * (-0.00031761
             + t2 *   0.00001109))))));
    } else {
        float t  = 3.75 / ax;
        float p1 = 0.79788456
             + t * ( 0.00000156
             + t * ( 0.01659667
             + t * ( 0.00017105
             + t * (-0.00249511
             + t * ( 0.00113653
             + t *  -0.00020033)))));
        float q1 = -2.35619449
             + t * ( 0.12499612
             + t * ( 0.00005650
             + t * (-0.00637879
             + t * ( 0.00074348
             + t * ( 0.00079824
             + t *  -0.00029166)))));
        return sgn * p1 / sqrt(ax) * cos(ax + q1);
    }
}

// J2..J5 via backward recurrence: J_{m+1}(x) = (2m/x)·J_m(x) − J_{m-1}(x)
float J2(float x) {
    if (abs(x) < 1e-4) return 0.0;
    return (2.0 / x) * J1(x) - J0(x);
}
float J3(float x) {
    if (abs(x) < 1e-4) return 0.0;
    return (4.0 / x) * J2(x) - J1(x);
}
float J4(float x) {
    if (abs(x) < 1e-4) return 0.0;
    return (6.0 / x) * J3(x) - J2(x);
}
float J5(float x) {
    if (abs(x) < 1e-4) return 0.0;
    return (8.0 / x) * J4(x) - J3(x);
}
float J6(float x) {
    if (abs(x) < 1e-4) return 0.0;
    return (10.0 / x) * J5(x) - J4(x);
}

// ─── Plate eigenfunctions ────────────────────────────────────────────────────
// Mode (m, n): J_m(α_{mn}·r) · cos(m·θ)
// α_{mn} = n-th positive zero of J_m; normalised so plate rim at r = 1.0
//
// First zeros (α_{m1}):
//   m=0: 2.4048   m=1: 3.8317   m=2: 5.1356
//   m=3: 6.3802   m=4: 7.5883   m=5: 8.7715   m=6: 9.9361
// Second zeros (α_{m2}):
//   m=0: 5.5201   m=1: 7.0156   m=2: 8.4172

float mode(float Jm_val, float m, vec2 uv) {
    float th = atan(uv.y, uv.x);
    return Jm_val * cos(m * th);
}

// Individual named modes
float mode_01(vec2 p) { return J0(2.4048 * length(p)); }
float mode_11(vec2 p) { return mode(J1(3.8317 * length(p)), 1.0, p); }
float mode_21(vec2 p) { return mode(J2(5.1356 * length(p)), 2.0, p); }
float mode_02(vec2 p) { return J0(5.5201 * length(p)); }
float mode_31(vec2 p) { return mode(J3(6.3802 * length(p)), 3.0, p); }
float mode_41(vec2 p) { return mode(J4(7.5883 * length(p)), 4.0, p); }
float mode_51(vec2 p) { return mode(J5(8.7715 * length(p)), 5.0, p); }
float mode_12(vec2 p) { return mode(J1(7.0156 * length(p)), 1.0, p); }
float mode_61(vec2 p) { return mode(J6(9.9361 * length(p)), 6.0, p); }

// Time-varying superposition: modes beat against each other
// Each mode's amplitude oscillates slowly at a distinct angular frequency
float plate_amplitude(vec2 p, float time) {
    float a = 0.0;
    // (0,1) Bullseye — always present, the unison tone
    a += mode_01(p) * 1.00;
    // (1,1) Yin-Yang — duality, beats at ~0.4 rad/s
    a += mode_11(p) * 0.65 * sin(time * 0.43 + 0.0);
    // (2,1) Triskelion — triple spiral, perfect fifth ratio
    a += mode_21(p) * 0.55 * sin(time * 0.71 + 1.1);
    // (0,2) Double ring — second radial harmonic
    a += mode_02(p) * 0.40 * sin(time * 0.93 + 2.2);
    // (3,1) Four-leaf — fourth direction, cross in motion
    a += mode_31(p) * 0.30 * sin(time * 1.23 + 0.5);
    // (4,1) Pentagram — the golden mode, phi in nodal form
    a += mode_41(p) * 0.22 * sin(time * 1.61 + 1.8);
    // (5,1) Hexagram — Star of David, six-fold
    a += mode_51(p) * 0.16 * sin(time * 2.05 + 3.0);
    // (1,2) Second yin-yang — octave harmonic of the split
    a += mode_12(p) * 0.12 * sin(time * 2.45 + 0.9);
    // (6,1) Heptagram — seventh harmony (rare)
    a += mode_61(p) * 0.08 * sin(time * 2.62 + 2.4);
    return a;
}

// Powder accumulation at displacement nodes (amplitude minima)
float powder(vec2 p, float amp) {
    float node = 1.0 - smoothstep(0.0, 0.10, abs(amp));
    float grain = fract(sin(dot(p + 0.5, vec2(127.1, 311.7))) * 43758.5453);
    // Finer texture: lycopodium is much smaller than sand
    float fine  = fract(sin(dot(p * 17.3 + 0.1, vec2(269.5, 183.3))) * 43758.5453);
    return node * (0.65 + 0.20 * grain + 0.15 * fine);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 uv = st * 2.0 - 1.0;
    float r  = length(uv);

    // Circular disc: radius 0.82 of normalized space
    float disc_r    = 0.82;
    float disc_mask = 1.0 - smoothstep(disc_r * 0.96, disc_r, r);

    // Plate-normalised coordinates: p in [−1, 1], rim at r=1
    vec2 p = uv / disc_r;

    vec3 col = vec3(0.05, 0.04, 0.03); // dark bench

    if (disc_mask > 0.01) {
        float amp = plate_amplitude(p, u_time);
        float pwd = powder(p, amp);

        // Polished steel surface: blue-grey with anisotropic sheen
        vec3 steel      = vec3(0.52, 0.54, 0.60);
        // Lycopodium powder: pale cream-yellow (spore colour)
        vec3 lyco_col   = vec3(0.92, 0.90, 0.78);

        vec3 plate_col = mix(steel, lyco_col, pwd * 0.88);

        // Antinodes: subtle amber-gold glow where the plate moves most
        float antinode = smoothstep(0.45, 1.0, abs(amp));
        plate_col += vec3(0.07, 0.04, 0.01) * antinode;

        // Radial sheen: polishing lines outward from center
        float sheen_angle = atan(p.y, p.x);
        float radial_sheen = 0.5 + 0.5 * cos(sheen_angle * 32.0);
        plate_col += vec3(0.04, 0.04, 0.05) * radial_sheen * (1.0 - pwd) * 0.35;

        // Rim bevel: brighter at the free edge
        float rim_bevel = smoothstep(0.76, 0.92, length(p));
        plate_col += vec3(0.09, 0.08, 0.07) * rim_bevel;

        // Center clamp: small dark bolt/post fixing the plate
        float clamp_dot = 1.0 - smoothstep(0.018, 0.038, length(p));
        plate_col = mix(plate_col, vec3(0.18, 0.14, 0.10), clamp_dot);

        col = mix(col, plate_col, disc_mask);
    }

    // Vignette
    col *= 1.0 - smoothstep(0.48, 1.4, r);

    // Film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.96 + 0.04 * grain;

    gl_FragColor = vec4(col, 1.0);
}

// MEDIUM: Chladni circular plate — lycopodium powder, Bessel nodal geometry
// FREQUENCY: 432 Hz base, (m,n) modes — m nodal diameters, n nodal circles
// GEOMETRY: Steel plate 300 mm diameter, clamped at centre, free rim
// SACRED: The mandala, ouroboros, wheel of dharma — the cosmos folds back into itself

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399

// ─── Bessel J_n(x) ────────────────────────────────────────────────────────
// Polynomial approximation for small x (Abramowitz & Stegun §9.4)
// Asymptotic expansion for large x: J_n(x) ~ sqrt(2/πx)·cos(x − nπ/2 − π/4)

float J0(float x) {
    if (x < 0.001) return 1.0;
    if (x < 3.0) {
        float x2 = x * x;
        return 1.0 - x2/4.0 + x2*x2/64.0 - x2*x2*x2/2304.0 + x2*x2*x2*x2/147456.0;
    }
    return sqrt(2.0 / (PI * x)) * cos(x - PI * 0.25);
}

float J1(float x) {
    if (x < 0.001) return x * 0.5;
    if (x < 3.0) {
        float x2 = x * x;
        return (x / 2.0) * (1.0 - x2/8.0 + x2*x2/192.0 - x2*x2*x2/9216.0 + x2*x2*x2*x2/737280.0);
    }
    return sqrt(2.0 / (PI * x)) * cos(x - 3.0 * PI / 4.0);
}

float J2(float x) {
    if (x < 0.001) return x * x / 8.0;
    if (x < 3.0) {
        float x2 = x * x;
        return x2/8.0 * (1.0 - x2/12.0 + x2*x2/384.0 - x2*x2*x2/23040.0);
    }
    return sqrt(2.0 / (PI * x)) * cos(x - 5.0 * PI / 4.0);
}

float J3(float x) {
    if (x < 0.001) return x * x * x / 48.0;
    if (x < 3.0) {
        float x2 = x * x;
        return x2*x/48.0 * (1.0 - x2/16.0 + x2*x2/576.0);
    }
    return sqrt(2.0 / (PI * x)) * cos(x - 7.0 * PI / 4.0);
}

float J4(float x) {
    if (x < 0.001) return x * x * x * x / 384.0;
    if (x < 3.0) {
        float x2 = x * x;
        return x2*x2/384.0 * (1.0 - x2/20.0 + x2*x2/800.0);
    }
    return sqrt(2.0 / (PI * x)) * cos(x - 9.0 * PI / 4.0);
}

float J5(float x) {
    if (x < 0.001) return 0.0;
    if (x < 3.0) {
        float x2 = x * x;
        return x2*x2*x/3840.0 * (1.0 - x2/24.0 + x2*x2/1152.0);
    }
    return sqrt(2.0 / (PI * x)) * cos(x - 11.0 * PI / 4.0);
}

float J6(float x) {
    if (x < 0.001) return 0.0;
    return sqrt(2.0 / (PI * max(x, 0.01))) * cos(x - 13.0 * PI / 4.0);
}

float bessel_jn(float n, float x) {
    x = max(x, 0.0);
    if      (n < 0.5) return J0(x);
    else if (n < 1.5) return J1(x);
    else if (n < 2.5) return J2(x);
    else if (n < 3.5) return J3(x);
    else if (n < 4.5) return J4(x);
    else if (n < 5.5) return J5(x);
    else              return J6(x);
}

// ─── Plate eigenmode W(r,θ) = J_m(k·r)·cos(m·θ) ──────────────────────────
// k = j_mn / R  where j_mn is the n-th positive zero of J_m
// For a free rim the boundary condition shifts zeros slightly — we use clamped-
// centre approximation here (j_mn ≈ first zero of J_m, scaled to plate radius)

float bessel_mode(vec2 p, float m, float k) {
    float r  = length(p);
    float th = atan(p.y, p.x);

    float J  = bessel_jn(m, k * r);

    // Angular: m=0 → axisymmetric; m>0 → m nodal diameters
    float A  = (m < 0.5) ? 1.0 : cos(m * th);

    return J * A;
}

// ─── Animated superposition ────────────────────────────────────────────────
float plate_field(vec2 p, float time) {
    float w = 0.0;

    // (m=0, n=1)  bullseye — j₀₁ ≈ 2.405; 432 Hz
    w += bessel_mode(p, 0.0, 2.405 * 2.40)  * 0.55;

    // (m=2, n=1)  triskelion — j₂₁ ≈ 5.136; 648 Hz = perfect fifth
    w += bessel_mode(p, 2.0, 5.136 * 2.00)  * 0.50 * sin(time * 0.55);

    // (m=3, n=1)  four-leaf  — j₃₁ ≈ 6.380; 1080 Hz
    w += bessel_mode(p, 3.0, 6.380 * 1.78)  * 0.40 * sin(time * 0.82 + 1.05);

    // (m=4, n=1)  pentagram  — j₄₁ ≈ 7.588; 1296 Hz = 3:2×octave
    w += bessel_mode(p, 4.0, 7.588 * 1.60)  * 0.28 * sin(time * 1.18 + 2.09);

    // (m=5, n=1)  hexagram   — j₅₁ ≈ 8.772; 1728 Hz
    w += bessel_mode(p, 5.0, 8.772 * 1.46)  * 0.20 * sin(time * 1.57 + 3.14);

    // (m=0, n=2)  double ring — j₀₂ ≈ 5.520
    w += bessel_mode(p, 0.0, 5.520 * 2.20)  * 0.18 * sin(time * 0.38 + 0.60);

    return w;
}

// ─── Main ──────────────────────────────────────────────────────────────────
void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;

    // Aspect-correct centred coordinates
    vec2 uv = (st * 2.0 - 1.0) * vec2(ar, 1.0);
    float r = length(uv);

    float plate_r  = 0.82;
    float plate_mask = 1.0 - smoothstep(plate_r, plate_r + 0.06, r);
    float rim_mask   = smoothstep(plate_r - 0.04, plate_r, r)
                     * (1.0 - smoothstep(plate_r, plate_r + 0.055, r));

    vec3 col = vec3(0.05, 0.04, 0.06);  // dark velvet table

    if (plate_mask > 0.01) {
        vec2 pn    = uv / plate_r;        // normalised coords [−1, 1] at rim
        float field = plate_field(pn, u_time);

        // Lycopodium at nodal lines (|field| ≈ 0)
        float node = 1.0 - smoothstep(0.0, 0.10, abs(field));

        // Fine granular texture — spore powder
        vec2 gv = uv * 95.0;
        float grain = fract(sin(dot(gv, vec2(127.1, 311.7))) * 43758.5453);
        node *= 0.80 + 0.20 * grain;

        // Polished steel surface with circular brushing
        float radial_brush = fract(r * 38.0 + 0.04 * sin(atan(uv.y, uv.x) * 14.0));
        vec3  steel = vec3(0.58, 0.59, 0.62) * (0.88 + 0.12 * radial_brush);

        // Lycopodium: pale yellow-cream spore powder
        vec3  lycop = vec3(0.95, 0.92, 0.74);

        // Antinode: subtle warm glow at amplitude maxima
        float antinode = smoothstep(0.55, 1.0, abs(field));

        vec3  plate_col = mix(steel, lycop, node * 0.92);
        plate_col += vec3(0.07, 0.05, 0.01) * antinode;

        // Polished rim edge
        plate_col = mix(plate_col, vec3(0.78, 0.78, 0.82), rim_mask * 0.65);

        col = mix(col, plate_col, plate_mask);
    }

    // Centre drive screw: small brass fitting
    float centre = 1.0 - smoothstep(0.020, 0.038, r);
    col = mix(col, vec3(0.65, 0.50, 0.22), centre);

    // Vignette
    col *= 1.0 - smoothstep(0.72, 1.5, r);

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

// MEDIUM: Water surface — Cymascope dish, lycopodium floating at antinodes
// FREQUENCY: Driven at u_freq (default 432 Hz); harmonics and golden-ratio partials
// GEOMETRY: Circular glass dish, Bessel radial modes + azimuthal symmetry
// SACRED: Water makes sound visible — the ur-cymascope, older than any instrument

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;  // driving frequency Hz; default 432

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399

// ─── Bessel-informed radial mode ──────────────────────────────────────────
// Approximate standing wave on a circular water surface:
//   h(r, θ, t) = J_m(k·r) · cos(m·θ + θ_offset) · cos(ω·t + t_offset)
// where k = ω·(dispersion factor) and J_m is the Bessel function (approximated).

float radial_mode(vec2 p, float m_ang, float k, float t_phase, float th_phase) {
    float r  = length(p);
    float th = atan(p.y, p.x);

    // Radial: approximate Bessel with damped oscillation
    float J;
    if (r < 0.01) {
        J = (m_ang < 0.5) ? 1.0 : 0.0;
    } else {
        float x = k * r;
        // Asymptotic Bessel approximation, blended with near-origin behaviour
        float asym = sqrt(2.0 / (PI * max(x, 0.5))) * cos(x - m_ang * PI * 0.5 - PI * 0.25);
        float near = 1.0 - x * x / 4.0;  // J0 polynomial approximation
        J = mix(near, asym, smoothstep(0.8, 2.5, x));
    }

    // Radial envelope: decay at dish walls (evanescent fringe)
    float env = exp(-r * r * 0.55);

    // Angular: m=0 axisymmetric; m>0 → m nodal diameters
    float ang = (m_ang < 0.5) ? 1.0 : cos(m_ang * th + th_phase);

    // Temporal
    float T = cos(t_phase);

    return J * env * ang * T;
}

// ─── Full water surface height field ─────────────────────────────────────
float water_height(vec2 p, float time, float freq) {
    float h = 0.0;

    // Scale wave number with frequency: k ~ freq * constant (deep-water dispersion ≈ sqrt(g*k))
    float k0 = freq * 0.012;

    // Primary mode: axisymmetric (m=0)
    h += radial_mode(p, 0.0, k0,           time * freq * 0.012,        0.0) * 0.50;

    // Octave: doubles the wave number
    h += radial_mode(p, 0.0, k0 * 2.0,     time * freq * 0.024 + 1.0,  0.0) * 0.22;

    // First azimuthal (m=2): quadrupole — four lobes at 90°
    h += radial_mode(p, 2.0, k0 * 1.50,    time * freq * 0.018 + 0.6,  time * 0.20) * 0.32;

    // Second azimuthal (m=3): sextupole — six lobes
    h += radial_mode(p, 3.0, k0 * 2.00,    time * freq * 0.024 + 1.2,  time * 0.15) * 0.22;

    // Third azimuthal (m=4): octupole — eight lobes
    h += radial_mode(p, 4.0, k0 * 2.50,    time * freq * 0.030 + 1.8,  time * 0.10) * 0.14;

    // Golden-ratio partial: incommensurate → quasiperiodic ripple texture
    h += radial_mode(p, 0.0, k0 * PHI,     time * freq * 0.012 * PHI,  0.0) * 0.10;

    // Sub-harmonic (½ frequency): Faraday-like instability
    h += radial_mode(p, 0.0, k0 * 0.50,    time * freq * 0.006,        0.0) * 0.08;

    return h;
}

// ─── Caustic intensity ────────────────────────────────────────────────────
// Light focusing through curved water surface → bright caustic patches at crests
float caustic(vec2 p, float time, float freq) {
    float eps = 0.025;
    float h0  = water_height(p, time, freq);
    float hx  = water_height(p + vec2(eps, 0.0), time, freq) - h0;
    float hy  = water_height(p + vec2(0.0, eps), time, freq) - h0;
    // Divergence of gradient ≈ laplacian: negative laplacian → focussing
    float curv = (hx + hy) / eps;
    return max(0.0, -curv * 4.0);
}

void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;
    vec2 uv  = (st * 2.0 - 1.0) * vec2(ar, 1.0);
    float r  = length(uv);

    float freq = (u_freq > 0.0) ? u_freq : 432.0;

    float dish_r    = 0.86;
    float dish_mask = 1.0 - smoothstep(dish_r, dish_r + 0.07, r);
    float rim_mask  = smoothstep(dish_r - 0.05, dish_r, r)
                    * (1.0 - smoothstep(dish_r, dish_r + 0.06, r));

    vec3 col = vec3(0.07, 0.06, 0.08);  // dark surround (black velvet)

    if (dish_mask > 0.01) {
        vec2 pn = uv / dish_r;
        float h = water_height(pn, u_time, freq);

        // ─── Water colour ─────────────────────────────────────────────────
        vec3 deep  = vec3(0.03, 0.10, 0.24);
        vec3 mid   = vec3(0.10, 0.27, 0.48);
        vec3 crest = vec3(0.62, 0.80, 0.92);

        float depth_t = clamp(0.42 + h * 0.72, 0.0, 1.0);
        vec3  water   = mix(deep, mid, depth_t);
        water = mix(water, crest, smoothstep(0.28, 0.58, h));

        // Caustic shimmer from wave focusing
        float caus = caustic(pn, u_time, freq);
        water += vec3(0.45, 0.55, 0.38) * caus * 0.50;

        // Lycopodium powder: hydrophobic, floats at antinodes (crests)
        // This is the OPPOSITE of sand on plates — lycopodium rides the peaks.
        float lyco_t = smoothstep(0.22, 0.52, h);
        vec2  gv     = uv * 88.0;
        float grain  = fract(sin(dot(gv, vec2(127.1, 311.7))) * 43758.5453);
        lyco_t *= 0.70 + 0.30 * grain;
        water = mix(water, vec3(0.92, 0.89, 0.70), lyco_t * 0.38);

        // Nodal ring: darker water where wave cancels
        float cancel = smoothstep(-0.12, 0.0, h) * (1.0 - smoothstep(0.0, 0.12, h));
        water = mix(water, deep * 0.70, cancel * 0.38);

        // Meniscus at dish wall: surface tension curve
        float menisc = smoothstep(0.82, 0.88, length(pn));
        water = mix(water, crest * 0.80, menisc * 0.25);

        col = mix(col, water, dish_mask);

        // Rim: white glazed ceramic
        col = mix(col, vec3(0.88, 0.85, 0.82), rim_mask * 0.72);
    }

    // Vignette
    col *= 1.0 - smoothstep(0.62, 1.45, r);

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

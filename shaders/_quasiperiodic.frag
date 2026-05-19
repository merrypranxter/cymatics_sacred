// MEDIUM: Quasiperiodic tiling — powder at nodal lines of incommensurate waves
// FREQUENCY: Golden-ratio pairing (f and f·φ); 5-fold and 7-fold plane-wave sums
// GEOMETRY: Infinite non-repeating pattern — the "forbidden" 5-fold symmetry
// SACRED: Penrose tiles, Islamic girih, Dürer's pentagon — the geometry of aperiodic eternity

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399   // golden ratio

// ─── Quasiperiodic wave sum ───────────────────────────────────────────────
// The N-wave sum  Σ cos(k_i · p + φ_i)  where k_i are unit vectors at 2πi/N
// produces a quasiperiodic pattern when N is not a divisor of 4 (i.e. N=5,7,9…).
//
// Five plane waves at 72° spacing → 5-fold symmetry (Penrose-like)
// Seven plane waves at 360/7 ≈ 51.4° spacing → 7-fold (Islamic 7-star)

float wave5(vec2 p, float k, float time, float drift) {
    float f = 0.0;
    // N = 5: unrolled for WebGL ES 1.0 compatibility
    float a0 = 0.0  * TAU / 5.0; f += cos(k*(p.x*cos(a0)+p.y*sin(a0)) + time*drift + 0.0*PHI);
    float a1 = 1.0  * TAU / 5.0; f += cos(k*(p.x*cos(a1)+p.y*sin(a1)) + time*drift + 1.0*PHI);
    float a2 = 2.0  * TAU / 5.0; f += cos(k*(p.x*cos(a2)+p.y*sin(a2)) + time*drift + 2.0*PHI);
    float a3 = 3.0  * TAU / 5.0; f += cos(k*(p.x*cos(a3)+p.y*sin(a3)) + time*drift + 3.0*PHI);
    float a4 = 4.0  * TAU / 5.0; f += cos(k*(p.x*cos(a4)+p.y*sin(a4)) + time*drift + 4.0*PHI);
    return f / 5.0;
}

float wave7(vec2 p, float k, float time, float drift) {
    float f = 0.0;
    float a0 = 0.0 * TAU / 7.0; f += cos(k*(p.x*cos(a0)+p.y*sin(a0)) + time*drift + 0.0*PHI);
    float a1 = 1.0 * TAU / 7.0; f += cos(k*(p.x*cos(a1)+p.y*sin(a1)) + time*drift + 1.0*PHI);
    float a2 = 2.0 * TAU / 7.0; f += cos(k*(p.x*cos(a2)+p.y*sin(a2)) + time*drift + 2.0*PHI);
    float a3 = 3.0 * TAU / 7.0; f += cos(k*(p.x*cos(a3)+p.y*sin(a3)) + time*drift + 3.0*PHI);
    float a4 = 4.0 * TAU / 7.0; f += cos(k*(p.x*cos(a4)+p.y*sin(a4)) + time*drift + 4.0*PHI);
    float a5 = 5.0 * TAU / 7.0; f += cos(k*(p.x*cos(a5)+p.y*sin(a5)) + time*drift + 5.0*PHI);
    float a6 = 6.0 * TAU / 7.0; f += cos(k*(p.x*cos(a6)+p.y*sin(a6)) + time*drift + 6.0*PHI);
    return f / 7.0;
}

// ─── Full quasiperiodic field ─────────────────────────────────────────────
// Three superimposed layers:
//   Layer A: 5-fold at base wave number k₁            (Penrose-like)
//   Layer B: 5-fold at k₁·φ (incommensurate)         (golden-ratio dual)
//   Layer C: 7-fold at k₁·φ² (second golden power)   (deep complexity)
float full_field(vec2 p, float time) {
    float k1 = 3.60;          // base wave number
    float k2 = k1 * PHI;      // golden dual
    float k3 = k1 * PHI * PHI; // second golden power

    float A = wave5(p, k1, time, 0.14);
    float B = wave5(p, k2, time * PHI, 0.09);
    float C = wave7(p, k3, time * (PHI - 1.0), 0.06) * 0.40;

    // Product of A and B creates envelope: the quasiperiodic amplitude modulation
    float AB = A * B;

    return A * 0.55 + AB * 0.35 + C;
}

void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;
    vec2 uv  = (st * 2.0 - 1.0) * vec2(ar, 1.0);

    float field = full_field(uv * 3.20, u_time);

    // Normalise
    float fn = clamp(field * 0.80, -1.0, 1.0);

    // ─── Colour palette: Islamic tilework — gold powder on deep indigo/jade ──
    vec3 bg_col   = vec3(0.04, 0.03, 0.07);
    vec3 pos_col  = vec3(0.18, 0.14, 0.42);   // deep indigo: positive lobe
    vec3 neg_col  = vec3(0.08, 0.20, 0.16);   // deep jade: negative lobe
    vec3 node_col = vec3(0.92, 0.83, 0.58);   // warm gold: nodal powder

    float pos = max(0.0,  fn);
    float neg = max(0.0, -fn);

    vec3 col = bg_col;
    col = mix(col, pos_col, smoothstep(0.0, 0.5, pos) * 1.7 * pos);
    col = mix(col, neg_col, smoothstep(0.0, 0.5, neg) * 1.5 * neg);

    // Nodal powder lines
    float node = 1.0 - smoothstep(0.0, 0.14, abs(fn));
    col = mix(col, node_col, node * 0.88);

    // Antinode highlights: the loudest points glow
    float anti = smoothstep(0.72, 1.0, abs(fn));
    col += mix(pos_col, neg_col, step(0.0, -fn)) * anti * 0.22;

    // ─── 5-fold symmetry guide lines ──────────────────────────────────────
    float ang = atan(uv.y, uv.x);
    float r5 = abs(fract(ang / TAU * 5.0 + 0.5) - 0.5);
    float sym_line = 1.0 - smoothstep(0.015, 0.035, r5);
    col += vec3(0.12, 0.09, 0.03) * sym_line * 0.18;

    // ─── Vignette ─────────────────────────────────────────────────────────
    float r = length(uv);
    col *= 1.0 - smoothstep(0.95, 1.65, r);

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

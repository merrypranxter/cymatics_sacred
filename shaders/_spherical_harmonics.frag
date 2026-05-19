// MEDIUM: Spherical harmonics — Y(l,m) eigenfunctions on the 2-sphere
// FREQUENCY: No acoustic driver — pure eigenfunction visualization
// GEOMETRY: Full sphere mapped equirectangularly to rectangle; cycles l=0..5
// SACRED: Atomic orbitals, planetary shells, the alphabet of standing waves in 3D

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;

#define PI  3.14159265
#define TAU 6.28318530
#define SQRT2  1.41421356
#define SQRT3  1.73205081
#define SQRT5  2.23606798
#define SQRT6  2.44948975
#define SQRT10 3.16227766
#define SQRT15 3.87298335

// ─── Real spherical harmonics (Racah's normalisation) ──────────────────────
// Convention: Y_l^m where m ≥ 0 uses cosine; m < 0 uses sine
// Evaluated at colatitude theta (0=north pole) and longitude phi.

// l=0
float Y00(float ct, float st, float cp, float sp) {
    return 0.28209479; // 1/(2√π)
}

// l=1
float Y10(float ct, float st, float cp, float sp) {
    return 0.48860251 * ct;                        // √(3/4π) · cos θ
}
float Y11c(float ct, float st, float cp, float sp) {
    return 0.48860251 * st * cp;                   // √(3/4π) · sin θ · cos φ
}
float Y11s(float ct, float st, float cp, float sp) {
    return 0.48860251 * st * sp;                   // √(3/4π) · sin θ · sin φ
}

// l=2
float Y20(float ct, float st, float cp, float sp) {
    return 0.31539157 * (3.0*ct*ct - 1.0);         // √(5/16π) · (3cos²θ−1)
}
float Y21c(float ct, float st, float cp, float sp) {
    return 1.09254843 * st * ct * cp;              // √(15/4π) · sin θ cos θ cos φ
}
float Y21s(float ct, float st, float cp, float sp) {
    return 1.09254843 * st * ct * sp;
}
float Y22c(float ct, float st, float cp, float sp) {
    return 0.54627422 * st * st * (cp*cp - sp*sp); // √(15/16π) · sin²θ · cos 2φ
}
float Y22s(float ct, float st, float cp, float sp) {
    return 1.09254843 * st * st * cp * sp;         // √(15/4π) · sin²θ · sin 2φ
}

// l=3
float Y30(float ct, float st, float cp, float sp) {
    float c = ct;
    return 0.37317633 * (5.0*c*c*c - 3.0*c);      // √(7/16π) · (5cos³θ−3cosθ)
}
float Y31c(float ct, float st, float cp, float sp) {
    return 0.45704580 * st * (5.0*ct*ct - 1.0) * cp;
}
float Y31s(float ct, float st, float cp, float sp) {
    return 0.45704580 * st * (5.0*ct*ct - 1.0) * sp;
}
float Y32c(float ct, float st, float cp, float sp) {
    return 1.44530573 * st*st * ct * (cp*cp - sp*sp);
}
float Y32s(float ct, float st, float cp, float sp) {
    return 2.89061145 * st*st * ct * cp * sp;
}
float Y33c(float ct, float st, float cp, float sp) {
    float s3 = st*st*st;
    return 0.59004358 * s3 * (cp*cp*cp - 3.0*cp*sp*sp);
}
float Y33s(float ct, float st, float cp, float sp) {
    float s3 = st*st*st;
    return 0.59004358 * s3 * (3.0*sp*cp*cp - sp*sp*sp);
}

// l=4
float Y40(float ct, float st, float cp, float sp) {
    float c = ct; float c2 = c*c;
    return 0.10578554 * (35.0*c2*c2 - 30.0*c2 + 3.0);
}
float Y44c(float ct, float st, float cp, float sp) {
    float s4 = st*st*st*st;
    float cos4 = 1.0 - 8.0*sp*sp*(1.0 - sp*sp); // cos(4φ)
    return 0.62583573 * s4 * cos4;
}
float Y44s(float ct, float st, float cp, float sp) {
    float s4 = st*st*st*st;
    float sin4 = 4.0 * cp*sp * (cp*cp - sp*sp);
    return 0.62583573 * s4 * sin4;
}

// ─── Mode cycling ─────────────────────────────────────────────────────────
// Evaluates one Y_l^m at a time, cycling smoothly with time.
// Returns a signed value in approximately [-1, 1].

float eval_mode(int idx, float ct, float st, float cp, float sp) {
    if (idx == 0)  return Y00(ct,st,cp,sp)  / 0.28;
    if (idx == 1)  return Y10(ct,st,cp,sp)  / 0.49;
    if (idx == 2)  return Y11c(ct,st,cp,sp) / 0.49;
    if (idx == 3)  return Y11s(ct,st,cp,sp) / 0.49;
    if (idx == 4)  return Y20(ct,st,cp,sp)  / 0.63;
    if (idx == 5)  return Y21c(ct,st,cp,sp) / 1.09;
    if (idx == 6)  return Y21s(ct,st,cp,sp) / 1.09;
    if (idx == 7)  return Y22c(ct,st,cp,sp) / 1.09;
    if (idx == 8)  return Y22s(ct,st,cp,sp) / 1.09;
    if (idx == 9)  return Y30(ct,st,cp,sp)  / 0.75;
    if (idx == 10) return Y31c(ct,st,cp,sp) / 0.92;
    if (idx == 11) return Y31s(ct,st,cp,sp) / 0.92;
    if (idx == 12) return Y32c(ct,st,cp,sp) / 1.45;
    if (idx == 13) return Y32s(ct,st,cp,sp) / 1.45;
    if (idx == 14) return Y33c(ct,st,cp,sp) / 1.77;
    if (idx == 15) return Y33s(ct,st,cp,sp) / 1.77;
    if (idx == 16) return Y40(ct,st,cp,sp)  / 0.85;
    if (idx == 17) return Y44c(ct,st,cp,sp) / 1.88;
    return Y44s(ct,st,cp,sp) / 1.88;
}

// ─── Colour map for spherical harmonics ────────────────────────────────────
// + lobe: warm gold-orange  ·  − lobe: cool indigo-violet  ·  node: near-black

vec3 sh_palette(float val) {
    float pos = max(0.0,  val);
    float neg = max(0.0, -val);
    vec3 pos_col = mix(vec3(0.08, 0.06, 0.04), vec3(0.95, 0.72, 0.20), sqrt(pos));
    vec3 neg_col = mix(vec3(0.06, 0.05, 0.08), vec3(0.30, 0.22, 0.80), sqrt(neg));
    return pos_col + neg_col;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Equirectangular projection:
    //   x → longitude φ ∈ [−π, π]
    //   y → colatitude θ ∈ [0, π]   (y=0 is north pole)
    float phi   =  (st.x * 2.0 - 1.0) * PI;   // -π … +π
    float theta =  st.y * PI;                  // 0 … π

    float ct = cos(theta);
    float st2 = sin(theta);
    float cp = cos(phi);
    float sp = sin(phi);

    // Slow cycle through 19 modes, spending ~4 s on each, with cross-fade
    int N_modes = 19;
    float period  = 4.0;
    float t_mod   = mod(u_time, float(N_modes) * period);
    float phase   = t_mod / period;             // 0 .. N_modes (continuous)
    int   cur     = int(mod(floor(phase), float(N_modes)));
    int   nxt     = int(mod(float(cur + 1), float(N_modes)));
    float blend   = smoothstep(0.7, 1.0, fract(phase));  // cross-fade at 70%

    float val_a = eval_mode(cur, ct, st2, cp, sp);
    float val_b = eval_mode(nxt, ct, st2, cp, sp);
    float val   = mix(val_a, val_b, blend);

    vec3 col = sh_palette(val);

    // Nodal lines: thin dark stripes at zero crossings
    float nodal = 1.0 - smoothstep(0.0, 0.04, abs(val));
    col *= 1.0 - nodal * 0.75;

    // Latitude grid lines every 30°
    float lat_line = 1.0 - smoothstep(0.0, 0.008, abs(sin(theta * 6.0)));
    float lon_line = 1.0 - smoothstep(0.0, 0.008, abs(sin(phi   * 6.0)));
    col *= 1.0 - 0.18 * max(lat_line, lon_line);

    // Pole singularity fade (equirectangular distorts poles)
    float pole_fade = smoothstep(0.0, 0.08, theta) * smoothstep(PI, PI - 0.08, theta);
    col *= pole_fade;

    // Mode label: display l, m values as subtle overlay pulse
    float pulse = 0.5 + 0.5 * sin(u_time * PI * 2.0 / period);

    // Vignette
    vec2 uv_vig = st * 2.0 - 1.0;
    col *= 1.0 - smoothstep(0.7, 1.2, length(uv_vig));

    // Film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * grain;

    gl_FragColor = vec4(col, 1.0);
}

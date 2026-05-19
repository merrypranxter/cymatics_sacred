// MEDIUM: Ferrofluid — magnetic colloidal suspension, Rosensweig instability
// FREQUENCY: Audio-frequency magnetic field modulation, 30–200 Hz spike forcing
// GEOMETRY: Hexagonal spike lattice driven by standing acoustic/magnetic field
// SACRED: Iron alchemized by sound, magnetic mandalas, the lodestone speaks

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;

#define PI  3.14159265
#define TAU 6.28318530
#define SQRT3 1.73205081

// ─── Hexagonal lattice tiling ────────────────────────────────────────────────
// Returns the vector from the nearest hex lattice point (in hex cell space).
// Two offset grids cover all hexagonal cells without gaps.
vec2 hex_nearest(vec2 p) {
    // Hex basis: unit cell is (1, 0) and (0.5, √3/2)
    vec2 h = vec2(1.0, SQRT3);
    vec2 a = mod(p, h) - h * 0.5;
    vec2 b = mod(p + h * 0.5, h) - h * 0.5;
    return (dot(a, a) < dot(b, b)) ? a : b;
}

// ─── Acoustic/magnetic standing-wave envelope ────────────────────────────────
// Three-wave hexagonal standing wave at the driving frequency.
// Superposing plane waves at 0°, 60°, 120° (three of six hex directions)
// gives the hexagonal Faraday pattern that seeds Rosensweig spikes.
float acoustic_envelope(vec2 p, float time, float freq) {
    float k   = freq * 0.06;          // spatial wave-number (visual scale)
    float w   = freq * 0.008;         // temporal frequency (slowed for visibility)
    float f1  = cos(k *  p.x                          + w * time);
    float f2  = cos(k * (p.x * 0.5 + p.y * 0.866025) + w * time * 1.03);
    float f3  = cos(k * (p.x * 0.5 - p.y * 0.866025) + w * time * 0.97);
    float env = (f1 + f2 + f3) / 3.0;  // range [-1, 1]
    return clamp(env * 0.5 + 0.5, 0.0, 1.0); // remap to [0, 1]
}

// ─── Spike profile (view from directly above) ───────────────────────────────
// At each hex lattice center, a spike pierces the fluid surface.
// From above: dark tip surrounded by a bright metallic annular shoulder,
// then a flat fluid surface between spikes.
vec3 spike_color(float cell_dist, float spike_h, float pattern_env, float time) {
    // spike_h in [0, 1]: relative height from standing-wave modulation
    // cell_dist: distance to nearest lattice center (in cell units, 0–0.5)

    float max_r = 0.42;               // spike base radius (in cell units)
    float tip_r = max_r * 0.28;       // tip radius scales with spike height

    // Apparent spike radius expands with height (perspective foreshortening)
    float eff_r = max_r * (0.4 + 0.6 * spike_h);

    // Tip: darkest point (top of spike viewed from above)
    float tip_mask = 1.0 - smoothstep(0.0, tip_r * spike_h + 0.01, cell_dist);

    // Metallic shoulder annulus: where light grazes the conical surface
    float shoulder_inner = eff_r * 0.55;
    float shoulder_outer = eff_r * 0.85;
    float shoulder = smoothstep(shoulder_inner, shoulder_outer, cell_dist)
                   * (1.0 - smoothstep(shoulder_outer, eff_r, cell_dist));

    // Iridescent oil-film tint on shoulder: hue shifts with pattern
    float hue_shift = pattern_env * 2.0 + time * 0.08;
    vec3 iridescent = vec3(
        0.5 + 0.5 * cos(hue_shift + 0.0),
        0.5 + 0.5 * cos(hue_shift + 2.094),
        0.5 + 0.5 * cos(hue_shift + 4.189));
    iridescent = mix(vec3(0.45, 0.32, 0.18), iridescent, 0.4); // warm metal base

    // Flat fluid surface between spikes
    float fluid_zone = 1.0 - smoothstep(eff_r * 0.9, eff_r * 1.1, cell_dist);

    // Fluid meniscus: very slight brightening at outer spike base
    float meniscus = smoothstep(eff_r * 0.9, eff_r * 1.1, cell_dist)
                   * (1.0 - smoothstep(eff_r * 1.1, eff_r * 1.35, cell_dist));

    // Fluid surface color: almost black with deep dark-amber undertone
    float fluid_ripple = 0.5 + 0.5 * sin(time * 0.5 + cell_dist * 40.0) * 0.15;
    vec3  fluid_col = vec3(0.04, 0.025, 0.015) * fluid_ripple;

    // Spike tip color: deepest black
    vec3  tip_col = vec3(0.01, 0.008, 0.005);

    // Compose
    vec3 col = fluid_col;
    col = mix(col, iridescent, shoulder * spike_h * 0.8);
    col = mix(col, tip_col, tip_mask * fluid_zone);
    col += vec3(0.12, 0.08, 0.04) * meniscus * spike_h; // meniscus glow
    return col;
}

// ─── Caustic reflections on fluid surface ───────────────────────────────────
// The modulated magnetic field creates interference on the flat surface.
vec3 surface_caustics(vec2 p, float time, float freq) {
    float k  = freq * 0.04;
    float c1 = pow(abs(sin(k * p.x + time * 0.3) * sin(k * p.y * SQRT3 * 0.5 - time * 0.2)), 2.5);
    float c2 = pow(abs(sin(k * (p.x * 0.5 + p.y * 0.866) + time * 0.25)), 2.0);
    float caus = c1 * 0.5 + c2 * 0.5;
    return vec3(0.15, 0.10, 0.05) * caus * 0.4;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 uv = st * 2.0 - 1.0;
    float r  = length(uv);

    // Circular vessel (shallow Petri dish / magnetic tray)
    float vessel_r    = 0.88;
    float vessel_mask = 1.0 - smoothstep(vessel_r * 0.96, vessel_r, r);
    float rim_mask    = smoothstep(vessel_r * 0.90, vessel_r * 0.94, r)
                      * (1.0 - smoothstep(vessel_r * 0.94, vessel_r * 0.99, r));

    float freq = (u_freq > 0.0) ? u_freq : 80.0;

    vec3 col = vec3(0.08, 0.06, 0.04); // bench surface

    if (vessel_mask > 0.01) {
        // Hex lattice scale: spike spacing ~0.2 in normalized coords
        float cell_scale = 7.5;
        vec2  cell_p     = uv * cell_scale;
        vec2  cell_local = hex_nearest(cell_p);
        float cell_dist  = length(cell_local);

        // Standing-wave envelope determines spike height at this location
        float env      = acoustic_envelope(uv, u_time, freq);
        float spike_h  = 0.3 + 0.7 * env; // always at least 0.3 — spikes always present

        // Rosensweig pattern: above critical field all spikes appear
        // with the standing wave modulating their amplitude
        float subcrit_fade = 0.0; // fully above critical field here

        vec3  spike_col = spike_color(cell_dist, spike_h, env, u_time);
        spike_col      += surface_caustics(uv, u_time, freq);

        // Vessel wall: dark oxidised steel annulus
        vec3 wall_col = vec3(0.18, 0.14, 0.10)
                      + vec3(0.08, 0.06, 0.03) * (0.5 + 0.5 * sin(uv.y * 40.0 + u_time * 0.1));

        col = mix(col, spike_col, vessel_mask * (1.0 - rim_mask));
        col = mix(col, wall_col,  rim_mask);
    }

    // Subtle ambient glow from the electromagnet below: deep amber
    float magnet_glow = 0.5 + 0.5 * sin(u_time * (u_freq > 0.0 ? u_freq * 0.008 : 0.6));
    col += vec3(0.12, 0.06, 0.01) * (1.0 - smoothstep(0.3, 0.9, r)) * magnet_glow * 0.18;

    // Vignette
    col *= 1.0 - smoothstep(0.45, 1.3, r);

    // Film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * grain;

    gl_FragColor = vec4(col, 1.0);
}

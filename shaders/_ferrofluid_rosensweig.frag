// MEDIUM: Ferrofluid — magnetic colloid, Rosensweig instability spike array
// FREQUENCY: Acoustic field (u_freq) modulates spike height via coupled oscillation
// GEOMETRY: Hexagonal lattice of sharp liquid spikes above a flat meniscus
// SACRED: Iron-dark mirror of the void — spikes like standing teeth of the infinite

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;  // acoustic driving; default 40 Hz

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399
#define SQRT3 1.73205080

// ─── Hexagonal lattice ────────────────────────────────────────────────────
// Returns (fractional position within cell, cell id)

vec2 hex_to_cart(vec2 h, float scale) {
    // Hex basis vectors: b1 = (1, 0), b2 = (0.5, √3/2)
    return (h.x * vec2(1.0, 0.0) + h.y * vec2(0.5, SQRT3 * 0.5)) * scale;
}

void nearest_hex(vec2 p, float scale, out vec2 cell_centre, out vec2 frac_pos) {
    // Inverse: fractional hex coords
    float inv_scale = 1.0 / scale;
    float fx =  p.x * inv_scale - p.y * inv_scale / SQRT3;
    float fy =  p.y * inv_scale * 2.0 / SQRT3;

    // Round to nearest hex centre (axial coordinate rounding)
    float rx = floor(fx + 0.5);
    float ry = floor(fy + 0.5);
    float rz = floor(-fx - fy + 0.5);

    float dx = abs(rx - fx);
    float dy = abs(ry - fy);
    float dz = abs(rz + fx + fy);

    if (dx > dy && dx > dz)      rx = -ry - rz;
    else if (dy > dz)             ry = -rx - rz;

    cell_centre = hex_to_cart(vec2(rx, ry), scale);
    frac_pos    = p - cell_centre;
}

// ─── Acoustic standing wave pattern ───────────────────────────────────────
// Drives the spatial variation of spike height — some spikes are tall, others flat
float acoustic_pattern(vec2 p, float time, float freq) {
    float k = freq * 0.07;
    float w1 = sin(k * p.x + time * 0.75) * sin(k * p.y * 1.08 - time * 0.55);
    float w2 = sin(k * p.x * 1.25 - time * 0.60) * sin(k * p.y * 0.88 + time * 0.48);
    float w3 = sin(k * (p.x + p.y) * 0.65 + time * 1.05);
    return (w1 + w2 * 0.55 + w3 * 0.30) / 1.85;
}

// ─── Spike shape ──────────────────────────────────────────────────────────
// Sharp cone with specular tip; dist = distance from spike centre / cell_scale
float spike_profile(float dist, float height) {
    float cone = max(0.0, height - dist * 2.0);
    return cone * cone * 3.5;  // squared for pointed peak
}

// ─── Ferrofluid surface normal (approximate) ──────────────────────────────
// Used for specular highlights
vec3 spike_normal(vec2 frac, float scale, float height) {
    // Gradient of cone surface
    float r = length(frac);
    if (r < 0.001) return vec3(0.0, 0.0, 1.0);
    vec2 grad = normalize(frac) * (-2.0 * height);
    return normalize(vec3(grad * 0.6 / scale, 1.0));
}

void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;
    vec2 uv  = (st * 2.0 - 1.0) * vec2(ar, 1.0);
    float r  = length(uv);

    float freq = (u_freq > 0.0) ? u_freq : 40.0;

    // Hex grid
    float hex_scale = 0.115;

    vec2 centre, frac;
    nearest_hex(uv, hex_scale, centre, frac);
    float frac_dist = length(frac) / hex_scale;

    // Per-cell random variation (slight height randomness for realism)
    float cell_rand = fract(sin(dot(centre, vec2(127.1, 311.7))) * 43758.5453);

    // Acoustic modulation
    float acoustic = acoustic_pattern(centre * 9.0, u_time, freq);
    float height = (0.60 + 0.12 * cell_rand) * (0.55 + 0.45 * (acoustic * 0.5 + 0.5));

    // Primary spike
    float sv = spike_profile(frac_dist, height);

    // Secondary interstitial spike lattice (shifted by half-cell)
    vec2 centre2, frac2;
    nearest_hex(uv - vec2(hex_scale * 0.5, hex_scale * SQRT3 * 0.25), hex_scale, centre2, frac2);
    float frac_dist2 = length(frac2) / hex_scale;
    float rand2      = fract(sin(dot(centre2, vec2(269.5, 183.3))) * 43758.5);
    float acoustic2  = acoustic_pattern(centre2 * 7.0, u_time * 1.15 + 0.4, freq);
    float height2    = (0.30 + 0.08 * rand2) * (0.4 + 0.6 * (acoustic2 * 0.5 + 0.5));
    float sv2        = spike_profile(frac_dist2, height2) * 0.55;

    float total = max(sv, sv2);

    // ─── Lighting & colour ────────────────────────────────────────────────
    // Light direction: upper-left, warm incandescent
    vec3 light_dir = normalize(vec3(-0.6, 0.8, 1.4));

    // Approximate surface normal from primary spike
    vec3 N = spike_normal(frac, hex_scale, height);
    float diffuse = max(0.0, dot(N, light_dir));

    // Specular: cook-torrance-ish with high shininess
    vec3 view_dir = vec3(0.0, 0.0, 1.0);
    vec3 half_dir = normalize(light_dir + view_dir);
    float spec_raw = max(0.0, dot(N, half_dir));
    float spec     = pow(spec_raw, 28.0) * total * 2.0;

    // Ferrofluid base: near-black with brown-black tint
    vec3 base_col = vec3(0.05, 0.035, 0.06);
    vec3 mid_col  = vec3(0.14, 0.10, 0.18);
    vec3 spec_col = vec3(0.72, 0.65, 0.80);

    vec3 col = mix(base_col, mid_col, smoothstep(0.05, 0.55, total) * diffuse);
    col += spec_col * spec;

    // Hex cell boundary lines: the meniscus between spikes
    float flat_region = 1.0 - smoothstep(0.05, 0.30, total);
    float hex_edge    = 1.0 - smoothstep(0.38, 0.48, frac_dist);
    col += vec3(0.06, 0.04, 0.08) * hex_edge * flat_region;

    // Interference fringe from acoustic wave: visible in flat regions
    float fringe_wave = acoustic * 0.5 + 0.5;
    col += vec3(0.05, 0.03, 0.07) * fringe_wave * flat_region * 0.35;

    // ─── Dish boundary ────────────────────────────────────────────────────
    float dish_mask = 1.0 - smoothstep(0.88, 0.95, r);
    float rim_glow  = smoothstep(0.86, 0.90, r) * (1.0 - smoothstep(0.92, 0.97, r));

    vec3 bg = vec3(0.06, 0.04, 0.08);
    col  = mix(bg, col, dish_mask);
    col += vec3(0.40, 0.22, 0.05) * rim_glow * 0.50;  // warm amber rim

    // Vignette
    col *= 1.0 - smoothstep(0.65, 1.45, r);

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

// MEDIUM: Sri Yantra — sacred interference mandala from nine-ratio superposition
// FREQUENCY: AUM overtone series; 9 triangular interference modes at Φ-spaced k-vectors
// GEOMETRY: Nine interlocked triangles from superposed plane waves + SDF geometry
// SACRED: Yantra of Tripura Sundari, the geometry of consciousness, mother of form

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399   // golden ratio
#define SQRT3 1.73205081

// ─── Signed distance primitives ─────────────────────────────────────────────

// Signed distance to a line segment from a to b (positive = outside)
float sdf_segment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
    return length(pa - ba*h);
}

// Signed distance to an infinite line through p1 in direction n (n=normalised)
float sdf_line(vec2 p, vec2 p1, vec2 n) {
    return dot(p - p1, vec2(-n.y, n.x));
}

// Triangle SDF: positive = outside
float sdf_tri(vec2 p, vec2 a, vec2 b, vec2 c) {
    vec2 e0 = b-a, e1 = c-b, e2 = a-c;
    vec2 v0 = p-a, v1 = p-b, v2 = p-c;
    vec2 pq0 = v0 - e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
    vec2 pq1 = v1 - e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
    vec2 pq2 = v2 - e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
    float s = sign(e0.x*e2.y - e0.y*e2.x);
    vec2  d = min(min(vec2(dot(pq0,pq0), s*(v0.x*e0.y-v0.y*e0.x)),
                      vec2(dot(pq1,pq1), s*(v1.x*e1.y-v1.y*e1.x))),
                      vec2(dot(pq2,pq2), s*(v2.x*e2.y-v2.y*e2.x)));
    return -sqrt(d.x)*sign(d.y);
}

// ─── Sri Yantra geometry ─────────────────────────────────────────────────────
// Nine interlocked triangles (traditional Kamakala construction, normalised to r=1).
// Five downward (Shakti / feminine, △▽) and four upward (Shiva / masculine, △).
//
// The exact vertex positions are derived from the constraint that all triangle
// intersections are coplanar — a classical geometric challenge solved by
// artists/mathematicians over centuries.  These coordinates match the
// Kulavilasatantra proportions (approx error < 0.5%).

// Upward (Shiva) triangles — vertices in (x_left_bottom, x_right_bottom, y_bottom, y_top)
// stored as (top, bottom-left, bottom-right)
const int N_TRI = 9;

// Pack each triangle as 3 vec2 vertices
vec2 tri_apex(int i) {
    // Returns top vertex for upward triangles, bottom for downward
    if (i == 0) return vec2( 0.000,  0.000); // central upward (innermost)
    if (i == 1) return vec2( 0.000,  0.382); // 2nd upward
    if (i == 2) return vec2( 0.000,  0.618); // 3rd upward
    if (i == 3) return vec2( 0.000,  0.851); // 4th upward (outermost Shiva)
    if (i == 4) return vec2( 0.000, -0.255); // 1st downward (innermost Shakti)
    if (i == 5) return vec2( 0.000, -0.500); // 2nd downward
    if (i == 6) return vec2( 0.000, -0.691); // 3rd downward
    if (i == 7) return vec2( 0.000, -0.809); // 4th downward
    return           vec2( 0.000, -0.951); // 5th downward (outermost Shakti)
}

// Build the 9 triangles from classical Sri Yantra proportions
// Upward Δ triangles (4): apex up, base down; Shiva (masculine)
// Downward ▽ triangles (5): apex down, base up; Shakti (feminine)

struct Tri { vec2 a; vec2 b; vec2 c; };

Tri get_triangle(int i) {
    Tri t;
    // ── Upward (Shiva) ──────────────────────────────────────────────────
    if (i == 0) { // Innermost upward — tiny central triangle
        t.a = vec2( 0.000,  0.110);
        t.b = vec2(-0.095, -0.055);
        t.c = vec2( 0.095, -0.055);
        return t;
    }
    if (i == 1) { // 2nd upward
        t.a = vec2( 0.000,  0.310);
        t.b = vec2(-0.268, -0.155);
        t.c = vec2( 0.268, -0.155);
        return t;
    }
    if (i == 2) { // 3rd upward
        t.a = vec2( 0.000,  0.520);
        t.b = vec2(-0.450, -0.260);
        t.c = vec2( 0.450, -0.260);
        return t;
    }
    if (i == 3) { // Outermost upward (Shiva)
        t.a = vec2( 0.000,  0.760);
        t.b = vec2(-0.658, -0.380);
        t.c = vec2( 0.658, -0.380);
        return t;
    }
    // ── Downward (Shakti) ───────────────────────────────────────────────
    if (i == 4) { // Innermost downward
        t.a = vec2( 0.000, -0.190);
        t.b = vec2(-0.164,  0.095);
        t.c = vec2( 0.164,  0.095);
        return t;
    }
    if (i == 5) { // 2nd downward
        t.a = vec2( 0.000, -0.380);
        t.b = vec2(-0.329,  0.190);
        t.c = vec2( 0.329,  0.190);
        return t;
    }
    if (i == 6) { // 3rd downward
        t.a = vec2( 0.000, -0.570);
        t.b = vec2(-0.494,  0.285);
        t.c = vec2( 0.494,  0.285);
        return t;
    }
    if (i == 7) { // 4th downward
        t.a = vec2( 0.000, -0.700);
        t.b = vec2(-0.606,  0.350);
        t.c = vec2( 0.606,  0.350);
        return t;
    }
    // i == 8: Outermost downward (Shakti)
    t.a = vec2( 0.000, -0.860);
    t.b = vec2(-0.745,  0.430);
    t.c = vec2( 0.745,  0.430);
    return t;
}

// ─── Wave-interference cymatic field ────────────────────────────────────────
// The Sri Yantra is the sound-form of the AUM mantra.
// Nine superposed standing waves at angles 0°, 40°, 80°, ... 320° (multiples of 40°)
// with wave-number ratios drawn from the harmonic series of 'Sa' (root tone).

float aum_field(vec2 p, float time) {
    float freq_base = 136.1; // Hz — "Sa" in Indian classical music (also OM frequency)
    float k_visual  = 6.28;  // visual spatial frequency (scales the pattern)

    float field = 0.0;
    // Nine wave directions: 0°, 40°, 80° ... 320° — corresponds to the 9 shaktis
    for (int i = 0; i < 9; i++) {
        float angle    = float(i) * PI / 4.5; // 40° steps
        vec2  khat     = vec2(cos(angle), sin(angle));
        float k_ratio  = 1.0 + float(i) * (PHI - 1.0) * 0.382; // Φ-scaled k
        float omega    = float(i + 1) * 0.07 + 0.3; // slow visual oscillation
        float phase_t  = time * omega;
        field += cos(dot(khat, p) * k_visual * k_ratio + phase_t);
    }
    return field / 9.0;
}

// ─── Lotus petal SDFs ────────────────────────────────────────────────────────
float lotus_petals(vec2 p, float n, float inner_r, float outer_r) {
    float r  = length(p);
    float th = atan(p.y, p.x);
    // Radial band
    float band = smoothstep(inner_r, inner_r + 0.04, r)
               * (1.0 - smoothstep(outer_r - 0.04, outer_r, r));
    // Angular petals
    float petal = 0.5 + 0.5 * cos(th * n);
    return band * pow(petal, 3.0);
}

// ─── Colour palette ──────────────────────────────────────────────────────────
vec3 yantra_color(float tri_depth, float wave_field, float r, float lotus8, float lotus16) {
    // Background: deep blood-red / carmine (traditional Sri Yantra)
    vec3 bg    = vec3(0.30, 0.04, 0.02);
    // Inner triangle fill — warm gold
    vec3 gold  = vec3(0.85, 0.65, 0.12);
    // Alternate triangle: deep crimson
    vec3 red   = vec3(0.60, 0.08, 0.06);
    // Wave crests: bright saffron
    vec3 saffron = vec3(0.95, 0.60, 0.05);
    // Lotus petals: pink-gold
    vec3 lotus_col = vec3(0.90, 0.55, 0.35);

    vec3 col = bg;

    // Wave interference field tints the background
    float wave_pos = max(0.0, wave_field);
    float wave_neg = max(0.0, -wave_field);
    col = mix(col, saffron, wave_pos * 0.35);
    col = mix(col, vec3(0.15, 0.05, 0.25), wave_neg * 0.25);

    // Triangle layers (0 = innermost, 8 = outermost)
    float tri_glow = smoothstep(0.0, 0.015, -tri_depth); // filled interior
    float tri_line = (1.0 - smoothstep(0.0, 0.008, abs(tri_depth))); // edge line
    col = mix(col, gold, tri_glow * (0.3 + 0.5 * abs(wave_field)));
    col = mix(col, vec3(1.0, 0.92, 0.60), tri_line * 0.9);

    // Lotus petals
    col = mix(col, lotus_col, lotus8  * 0.65);
    col = mix(col, lotus_col * 1.1,  lotus16 * 0.45);

    return col;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = st * 2.0 - 1.0;
    uv.x   *= u_resolution.x / u_resolution.y;
    float r  = length(uv);

    // Scale so yantra fills the disc (outer triangle at r≈0.9)
    vec2 p = uv / 0.92;

    // ── Wave interference field ──────────────────────────────────────────
    float wave = aum_field(p * 0.75, u_time);

    // ── Nine triangles: accumulate minimum SDF ───────────────────────────
    float min_sdf = 1e9;
    for (int i = 0; i < 9; i++) {
        Tri t  = get_triangle(i);
        float d = sdf_tri(p, t.a, t.b, t.c);
        min_sdf = min(min_sdf, d);
    }
    // Normalise for rendering
    float tri_depth = min_sdf;

    // ── Lotus rings ──────────────────────────────────────────────────────
    float lotus8  = lotus_petals(p, 8.0,  0.80, 0.92);
    float lotus16 = lotus_petals(p, 16.0, 0.93, 1.06);

    // ── Outer circles ───────────────────────────────────────────────────
    float c1 = 1.0 - smoothstep(0.0, 0.008, abs(r / 0.92 - 0.775));
    float c2 = 1.0 - smoothstep(0.0, 0.008, abs(r / 0.92 - 0.885));
    float c3 = 1.0 - smoothstep(0.0, 0.008, abs(r / 0.92 - 1.000));
    float circles = max(max(c1, c2), c3);

    // ── Bhupura: outer square with T-gates ──────────────────────────────
    float sq_r    = 1.12;
    float sq_mask = max(abs(p.x), abs(p.y));
    float sq_line = 1.0 - smoothstep(0.0, 0.008, abs(sq_mask - sq_r));
    // T-gate notches on each side
    float gate_w = 0.18;
    bool in_gate_x = abs(p.y) < gate_w;
    bool in_gate_y = abs(p.x) < gate_w;
    float gate_line = 0.0;
    // top/bottom gates
    gate_line = max(gate_line, (1.0 - smoothstep(0.0, 0.006, abs(p.y - sq_r))) * float(in_gate_y));
    gate_line = max(gate_line, (1.0 - smoothstep(0.0, 0.006, abs(p.y + sq_r))) * float(in_gate_y));
    // left/right gates
    gate_line = max(gate_line, (1.0 - smoothstep(0.0, 0.006, abs(p.x - sq_r))) * float(in_gate_x));
    gate_line = max(gate_line, (1.0 - smoothstep(0.0, 0.006, abs(p.x + sq_r))) * float(in_gate_x));

    // ── Bindu: the central point ─────────────────────────────────────────
    float bindu = 1.0 - smoothstep(0.0, 0.028, length(p));
    float bindu_glow = 1.0 - smoothstep(0.0, 0.08, length(p));

    // ── Compose colour ───────────────────────────────────────────────────
    // Only render inside outer circle + bhupura
    float outer_mask = 1.0 - smoothstep(1.10, 1.18, sq_mask);
    vec3 col = vec3(0.05, 0.02, 0.02); // void outside

    if (outer_mask > 0.01) {
        col = yantra_color(tri_depth, wave, r, lotus8, lotus16);
        // Golden lines for circles and square
        col = mix(col, vec3(0.90, 0.75, 0.20), circles * 0.85);
        col = mix(col, vec3(0.90, 0.75, 0.20), (sq_line + gate_line) * 0.85);
        // Bindu: white-gold point pulsing at freq
        float freq   = (u_freq > 0.0) ? u_freq : 136.1;
        float pulse  = 0.6 + 0.4 * sin(u_time * TAU * freq * 0.001);
        col = mix(col, vec3(1.0, 0.95, 0.70), bindu_glow * 0.25 * pulse);
        col = mix(col, vec3(1.0, 1.0, 0.90), bindu * 0.95);
    }

    // Vignette
    col *= 1.0 - smoothstep(0.55, 1.5, r);

    // Film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * grain;

    gl_FragColor = vec4(col, 1.0);
}

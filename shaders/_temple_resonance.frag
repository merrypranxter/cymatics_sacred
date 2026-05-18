// MEDIUM: Hal Saflieni Hypogeum — carved limestone cavity, standing acoustic pressure
// FREQUENCY: 110 Hz fundamental (3rd harmonic of chamber length), infrasound at 18-19 Hz
// GEOMETRY: Ellipsoidal cavity 8.5m × 5m × 4m, Oracle aperture focus
// SACRED: Oracle, earth-voice, right-hemisphere consciousness, threshold between worlds

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;   // driving frequency, default 110.0 Hz

#define PI  3.14159265
#define TAU 6.28318530

// 2D standing wave pressure field in a rectangular cavity
// Models the horizontal cross-section of the Hypogeum main chamber
// Room modes: p_mn(x,y) = cos(m*PI*x/Lx) * cos(n*PI*y/Ly) * sin(omega*t)
float room_mode(vec2 p, float m, float n, float Lx, float Ly, float time, float freq) {
    float kx   = m * PI / Lx;
    float ky   = n * PI / Ly;
    float omega = TAU * freq;

    // Pressure standing wave (cosine for pressure; sine for velocity)
    float Px = cos(kx * p.x);
    float Py = cos(ky * p.y);
    float T  = sin(omega * time);

    return Px * Py * T;
}

// Resonance at 110 Hz: superposition of first few modes that are near-resonant
float chamber_pressure(vec2 p, float time, float freq) {
    // Chamber dimensions (normalised: 1.0 = 8.5 m length)
    float Lx = 1.0;           // 8.5 m along x
    float Ly = 5.0 / 8.5;    // 5.0 m along y

    float pr = 0.0;

    // (3,0): primary resonance at 110 Hz — the oracle frequency
    float f30 = 343.0 / (2.0 * 8.5 / 3.0);   // ≈ 60.5 Hz × 3 / something ...
    // For rendering we drive all modes at the user-supplied freq but weight by resonance
    float w30 = 1.0 / (1.0 + pow((freq - 110.0) / 8.0, 2.0));
    pr += room_mode(p, 3.0, 0.0, Lx, Ly, time, freq) * w30 * 1.0;

    // (0,2): transverse mode ~137 Hz
    float w02 = 1.0 / (1.0 + pow((freq - 137.0) / 8.0, 2.0));
    pr += room_mode(p, 0.0, 2.0, Lx, Ly, time, freq) * w02 * 0.5;

    // (3,1): cross mode ~144 Hz
    float w31 = 1.0 / (1.0 + pow((freq - 144.0) / 8.0, 2.0));
    pr += room_mode(p, 3.0, 1.0, Lx, Ly, time, freq) * w31 * 0.4;

    // (4,0): 4th longitudinal ~160 Hz
    float w40 = 1.0 / (1.0 + pow((freq - 160.0) / 8.0, 2.0));
    pr += room_mode(p, 4.0, 0.0, Lx, Ly, time, freq) * w40 * 0.3;

    // Infrasound at 18–19 Hz: (1,0) mode of the full complex — broad pulse
    float infrasons = sin(TAU * 18.5 * time) * 0.18 * exp(-4.0 * pow(p.x - 0.5, 2.0));
    pr += infrasons;

    return pr;
}

// Oracle aperture: the carved hole that focuses the oracle's voice
float oracle_aperture(vec2 p) {
    // Located at (x=0.22, y=0.5) in normalised chamber coordinates
    vec2 aperture = vec2(0.22, 0.5);
    float dist    = length(p - aperture);
    // Focused beam spreading from aperture
    float beam_angle = atan(p.y - aperture.y, p.x - aperture.x);
    float beam_spread = exp(-pow(beam_angle, 2.0) * 8.0);
    float beam_decay  = exp(-dist * 3.0);
    return beam_spread * beam_decay;
}

// Map pressure to color: red = antinode (loud), blue = node (silence)
vec3 pressure_to_color(float pr, float aperture) {
    // Pressure sign and magnitude
    float pos = max(0.0, pr);
    float neg = max(0.0, -pr);

    // Antinodes: deep red-orange (the voice of the earth)
    vec3 antinode_pos = vec3(0.85, 0.30, 0.10);
    // Negative pressure antinodes: deep indigo
    vec3 antinode_neg = vec3(0.15, 0.12, 0.55);
    // Nodes: near-black slate
    vec3 node_col     = vec3(0.06, 0.05, 0.07);

    vec3 col = node_col;
    col = mix(col, antinode_pos, smoothstep(0.0, 0.6, pos) * 0.85);
    col = mix(col, antinode_neg, smoothstep(0.0, 0.6, neg) * 0.7);

    // Oracle aperture glow: gold light from the carved opening
    vec3 oracle_gold = vec3(0.90, 0.72, 0.20);
    col = mix(col, oracle_gold, aperture * 0.65);

    return col;
}

// Stone wall texture: carved limestone
vec3 stone_texture(vec2 p) {
    float grain1 = fract(sin(dot(p * 40.0, vec2(127.1, 311.7))) * 43758.5);
    float grain2 = fract(sin(dot(p * 12.0, vec2(269.5, 183.3))) * 43758.5);
    float stone  = 0.6 + 0.15 * grain1 + 0.08 * grain2;
    return vec3(0.65, 0.60, 0.52) * stone;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Aspect-correct: map to chamber proportions (8.5 / 5.0 ≈ 1.7)
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = st;
    p.x *= aspect;

    // Normalise to chamber [0..1] in both axes
    float chamber_aspect = 8.5 / 5.0;
    p /= vec2(chamber_aspect, 1.0);

    // Default frequency when uniform is not provided
    float freq = (u_freq > 0.0) ? u_freq : 110.0;

    // Inside chamber
    float margin = 0.04;
    bool in_chamber = (p.x > margin && p.x < 1.0 - margin &&
                       p.y > margin && p.y < 1.0 - margin);

    vec3 col = stone_texture(st) * 0.3; // exterior stone, dark

    if (in_chamber) {
        float pr  = chamber_pressure(p, u_time, freq);
        float ap  = oracle_aperture(p);
        vec3  pcol = pressure_to_color(pr, ap);

        // Stone surface base — the carved limestone shows through the wave
        vec3  stone = stone_texture(p) * vec3(0.55, 0.50, 0.42);

        // Blend: pressure field floats above the stone
        col = mix(stone, pcol, 0.78);

        // Pillar / column occlusions (symbolic structural elements)
        float pillar1 = smoothstep(0.03, 0.0, length(p - vec2(0.15, 0.18)));
        float pillar2 = smoothstep(0.03, 0.0, length(p - vec2(0.15, 0.82)));
        float pillar3 = smoothstep(0.03, 0.0, length(p - vec2(0.85, 0.18)));
        float pillar4 = smoothstep(0.03, 0.0, length(p - vec2(0.85, 0.82)));
        float pillars = max(max(pillar1, pillar2), max(pillar3, pillar4));
        col = mix(col, stone_texture(p) * vec3(0.72, 0.66, 0.58), pillars);

        // Doorway node markers: the threshold of silence
        float door1  = smoothstep(0.015, 0.0, length(p - vec2(0.25, 0.5)));
        float door2  = smoothstep(0.015, 0.0, length(p - vec2(0.75, 0.5)));
        col = mix(col, vec3(0.08, 0.08, 0.12), max(door1, door2) * 0.8);
    }

    // Vignette: the darkness surrounds the lit chamber
    float vig = 1.0 - smoothstep(0.3, 0.85, length(st - 0.5));
    col *= vig;

    // Subtle film grain — old stone, old light
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.96 + 0.04 * grain;

    gl_FragColor = vec4(col, 1.0);
}

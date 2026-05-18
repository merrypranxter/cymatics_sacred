// MEDIUM: Tibetan singing bowl — hemispherical metal shell, water surface
// FREQUENCY: 226 Hz fundamental, n=2 quadrupole mode (4 antinodes)
// GEOMETRY: Circular vessel, free rim, hemispherical shell eigenmodes
// SACRED: Purification, consciousness, the voice of transformation

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399

// Shell vibration: free-rim hemispherical bowl mode n
// n = number of nodal diameters (antinodes = 2n around rim)
float bowl_mode(vec2 p, float n, float phase) {
    vec2 uv  = p * 2.0 - 1.0;
    float r  = length(uv);
    float th = atan(uv.y, uv.x);

    // Rim deflection: cos(n*theta) pattern
    float rim_pattern = cos(n * th + phase);

    // Radial envelope: mode shape of hemispherical shell
    // Approximate: decreases toward center (nodal circle at ~0.63r for n=2)
    float radial = sin(r * PI) * exp(-r * r * 0.2);

    // Combine
    return rim_pattern * radial;
}

// Water surface height: superposition of driven bowl modes
float water_surface(vec2 p, float time) {
    float h = 0.0;

    // n=2 quadrupole: fundamental, 4 antinodes
    float phase2 = time * 1.0;
    h += bowl_mode(p, 2.0, phase2) * 0.5;

    // n=3 sextupole: octave harmonic, 6 antinodes  
    float phase3 = time * 2.0 + PI * 0.3;
    h += bowl_mode(p, 3.0, phase3) * 0.25;

    // n=4 octupole: third partial, 8 antinodes
    float phase4 = time * 3.7 + PI * 0.7;
    h += bowl_mode(p, 4.0, phase4) * 0.12;

    // n=5: 10 antinodes — faint overtone shimmer
    float phase5 = time * 5.8;
    h += bowl_mode(p, 5.0, phase5) * 0.06;

    return h;
}

// Water jet: erupts at antinode positions when driven hard enough
float water_jet(vec2 p, float n, float time) {
    vec2 uv = p * 2.0 - 1.0;
    float r  = length(uv);
    float th = atan(uv.y, uv.x);

    // Antinodes at angles k * PI/n for k in {0,1,...,2n-1}
    float jet_angle_dist = abs(sin(n * th));
    float jet_mask = smoothstep(0.75, 1.0, jet_angle_dist);

    // Only near the rim
    float rim_zone = smoothstep(0.60, 0.72, r) * (1.0 - smoothstep(0.78, 0.88, r));

    // Pulsing driven by time
    float pulse = pow(abs(sin(time * 1.0)), 3.0);

    return jet_mask * rim_zone * pulse;
}

// Caustics and metallic bowl color
vec3 bowl_metal(vec2 p) {
    vec2 uv = p * 2.0 - 1.0;
    float r  = length(uv);
    float th = atan(uv.y, uv.x);

    // Patinated bronze: warm dark with green oxidation
    vec3 bronze    = vec3(0.55, 0.38, 0.18);
    vec3 patina    = vec3(0.22, 0.38, 0.26);
    float ox = smoothstep(0.55, 0.85, r) * (0.5 + 0.5 * sin(th * 7.0 + r * 12.0));
    vec3 metal = mix(bronze, patina, ox * 0.4);

    // Hammered texture
    float hammer = fract(sin(dot(uv * 8.0, vec2(127.1, 311.7))) * 43758.5);
    metal *= 0.85 + 0.15 * hammer;

    // Rim highlight: the singing edge
    float rim = smoothstep(0.72, 0.80, r) * (1.0 - smoothstep(0.84, 0.90, r));
    metal += vec3(0.7, 0.55, 0.3) * rim * 0.6;

    return metal;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x   *= u_resolution.x / u_resolution.y;

    // Bowl mask: circular vessel
    vec2 uv = st * 2.0 - 1.0;
    float r = length(uv);

    // Outer wall
    float bowl_mask  = 1.0 - smoothstep(0.88, 0.96, r);
    float water_mask = 1.0 - smoothstep(0.74, 0.80, r);

    vec3 col = vec3(0.06, 0.05, 0.04); // dark altar cloth

    if (bowl_mask > 0.01) {
        // Metal bowl body
        vec3 metal = bowl_metal(st);
        col = mix(col, metal, bowl_mask);

        if (water_mask > 0.01) {
            // Water surface
            float h = water_surface(st, u_time);

            // Water color: dark reflective pool with surface shimmer
            vec3 deep    = vec3(0.04, 0.12, 0.20);
            vec3 mid     = vec3(0.15, 0.32, 0.45);
            vec3 crest   = vec3(0.70, 0.80, 0.90);

            float depth  = clamp(0.5 + h * 0.6, 0.0, 1.0);
            vec3  water  = mix(deep, mid, depth);
            float crest_mask = smoothstep(0.25, 0.50, h);
            water = mix(water, crest, crest_mask * 0.6);

            // Caustic shimmer
            vec2 cuv = st * 5.0;
            float cx = sin(cuv.x * 8.0 + u_time * 1.2) * sin(cuv.y * 9.0 - u_time * 0.8);
            cx = pow(abs(cx), 2.5);
            water += vec3(0.25, 0.35, 0.25) * cx * crest_mask * 0.4;

            // Water jets at antinodes (n=2 primary)
            float jet = water_jet(st, 2.0, u_time);
            vec3  jet_col = vec3(0.85, 0.92, 0.98);
            water = mix(water, jet_col, jet * 0.8);

            // Secondary jets from n=3 mode
            float jet3 = water_jet(st, 3.0, u_time * 1.95 + 0.4);
            water = mix(water, jet_col * 0.8, jet3 * 0.35);

            col = mix(col, water, water_mask * 0.95);
        }
    }

    // Bowl glow: the vessel is alive
    float glow_r = smoothstep(0.88, 1.4, r);
    float pulse  = 0.5 + 0.5 * sin(u_time * 0.9);
    col += vec3(0.15, 0.08, 0.03) * (1.0 - glow_r) * pulse * 0.12;

    // Vignette
    float vig = 1.0 - smoothstep(0.4, 1.3, r);
    col *= vig;

    // Subtle film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * grain;

    gl_FragColor = vec4(col, 1.0);
}

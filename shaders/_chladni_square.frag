// MEDIUM: Chladni plate — rigid square surface, sand accumulation at nodes
// FREQUENCY: Fundamental 432 Hz, first 6 harmonics, Pythagorean ratio series
// GEOMETRY: Square plate, clamped edges, isotropic material
// SACRED: Earth alignment, foundation, fourfold stability

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265
#define TAU 6.28318530

// Plate vibration mode for square plate with clamped edges
// Approximate solution: product of beam mode shapes
float chladni_mode(vec2 p, float m, float n) {
    // Normalized coordinates [-1, 1]
    vec2 uv = p * 2.0 - 1.0;
    
    // Clamped-edge beam mode shape (approximate with cosine)
    float Xm = cos(m * PI * uv.x * 0.5) * cos(PI * uv.x * 0.5); // m nodal lines in x
    float Yn = cos(n * PI * uv.y * 0.5) * cos(PI * uv.y * 0.5); // n nodal lines in y
    
    // Combined mode
    float mode = Xm * Yn;
    
    // Also include anti-symmetric modes
    float mode_anti = sin(m * PI * uv.x * 0.5) * sin(n * PI * uv.y * 0.5);
    
    return abs(mode) + abs(mode_anti) * 0.3;
}

// Sand particle: accumulates where amplitude is minimum (nodes)
float sand_accumulation(vec2 p, float mode_val) {
    // Sand migrates to nodes (minimum vibration amplitude)
    float node_strength = 1.0 - smoothstep(0.0, 0.15, mode_val);
    
    // Add some randomness for granular texture
    float grain = fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    node_strength *= 0.8 + 0.2 * grain;
    
    return node_strength;
}

// Multi-frequency forcing: fundamental + harmonics
float multi_mode(vec2 p, float time) {
    float m1 = 2.0, n1 = 2.0;  // Fundamental: (2,2) mode
    float m2 = 3.0, n2 = 2.0;  // First harmonic
    float m3 = 2.0, n3 = 3.0;  // Second harmonic
    float m4 = 3.0, n4 = 3.0;  // Third harmonic
    float m5 = 4.0, n5 = 2.0;  // Fourth
    float m6 = 2.0, n6 = 4.0;  // Fifth
    
    float mode = chladni_mode(p, m1, n1);
    mode += chladni_mode(p, m2, n2) * 0.5 * sin(time * 0.7);  // beating
    mode += chladni_mode(p, m3, n3) * 0.3 * sin(time * 1.1);
    mode += chladni_mode(p, m4, n4) * 0.2;
    mode += chladni_mode(p, m5, n5) * 0.15;
    mode += chladni_mode(p, m6, n6) * 0.1;
    
    return mode;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Plate view
    vec2 plate_uv = st;
    
    // Clip to square plate
    float plate_mask = 1.0 - smoothstep(0.45, 0.5, max(abs(plate_uv.x - 0.5), abs(plate_uv.y - 0.5) * u_resolution.y / u_resolution.x));
    
    vec3 col = vec3(0.08, 0.06, 0.04); // dark wood table
    
    if (plate_mask > 0.01) {
        // Vibrating mode
        float mode = multi_mode(plate_uv, u_time);
        
        // Sand accumulation at nodes
        float sand = sand_accumulation(plate_uv, mode);
        
        // Plate surface: polished brass
        vec3 brass = vec3(0.72, 0.55, 0.28);
        
        // Sand color: crushed white quartz
        vec3 sand_col = vec3(0.92, 0.90, 0.85);
        
        // Node lines: where sand collects
        vec3 plate_col = mix(brass, sand_col, sand * 0.9);
        
        // Vibration blur: the plate is moving
        float blur = mode * 0.05;
        plate_col *= 1.0 - blur;
        
        // Edge highlight: the rim is fixed, brighter
        float edge = smoothstep(0.35, 0.45, max(abs(plate_uv.x - 0.5), abs(plate_uv.y - 0.5) * u_resolution.y / u_resolution.x));
        plate_col += vec3(0.1, 0.08, 0.05) * edge;
        
        // Frequency indicator: subtle glow at antinodes
        float antinode = smoothstep(0.6, 1.0, mode);
        plate_col += vec3(0.05, 0.0, 0.0) * antinode;
        
        col = mix(col, plate_col, plate_mask);
    }
    
    // Vignette
    float vig = 1.0 - smoothstep(0.5, 1.5, length(st - 0.5));
    col *= vig;
    
    // Film grain
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.96 + 0.04 * grain;
    
    gl_FragColor = vec4(col, 1.0);
}

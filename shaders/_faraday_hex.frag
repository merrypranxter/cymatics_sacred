// MEDIUM: Faraday waves — water surface vibrated vertically
// FREQUENCY: 80 Hz fundamental, subharmonic forcing, hexagonal tessellation
// GEOMETRY: Circular vessel, flat bottom, vertical oscillation
// SACRED: Water temple, flow, purification, hexagonal bee-hive pattern

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265
#define TAU 6.28318530

// Faraday wave pattern: standing waves on a fluid surface
// The pattern depends on forcing frequency, fluid depth, and surface tension
float faraday_wave(vec2 p, float time, float freq, float depth) {
    vec2 uv = p * 2.0 - 1.0;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Radial modes
    float radial = sin(r * freq * PI) * exp(-r * r * 0.5);
    
    // Azimuthal modes: hexagonal symmetry
    float azimuthal = cos(angle * 6.0) * 0.5 + 0.5;
    
    // Temporal oscillation
    float temporal = sin(time * freq * 0.5) * 0.5 + 0.5;
    
    // Depth-dependent damping
    float damping = exp(-depth * r);
    
    return radial * azimuthal * temporal * damping;
}

// Water surface height field
float water_height(vec2 p, float time) {
    float h = 0.0;
    
    // Fundamental hexagonal mode
    h += faraday_wave(p, time, 3.0, 0.5) * 0.4;
    
    // Harmonic modes
    h += faraday_wave(p, time * 1.5 + 1.0, 5.0, 0.3) * 0.2;
    h += faraday_wave(p, time * 0.7 + 2.0, 7.0, 0.2) * 0.1;
    
    // Subharmonic instability: the "magic" frequency where pattern doubles
    float subharmonic = sin(time * 0.25) * 0.5 + 0.5;
    h += faraday_wave(p, time * 0.5, 4.0, 0.4) * subharmonic * 0.3;
    
    return h;
}

// Water color: depth + caustics + meniscus
vec3 water_color(vec2 p, float height, float time) {
    vec3 deep = vec3(0.05, 0.15, 0.25);
    vec3 shallow = vec3(0.2, 0.4, 0.5);
    vec3 crest = vec3(0.6, 0.75, 0.8);
    
    // Depth coloring
    float depth = 0.5 + height * 0.5;
    vec3 col = mix(deep, shallow, depth);
    
    // Crest highlight
    float crest_mask = smoothstep(0.3, 0.5, height);
    col = mix(col, crest, crest_mask);
    
    // Caustics: light focusing through wave peaks
    vec2 caustic_uv = p * 3.0 + vec2(time * 0.1);
    float caustic = sin(caustic_uv.x * 10.0) * sin(caustic_uv.y * 10.0);
    caustic = pow(abs(caustic), 2.0);
    col += vec3(0.3, 0.4, 0.3) * caustic * crest_mask;
    
    // Surface tension meniscus at edges
    vec2 uv = p * 2.0 - 1.0;
    float r = length(uv);
    float meniscus = smoothstep(0.85, 0.95, r);
    col += vec3(0.4, 0.5, 0.6) * meniscus * 0.3;
    
    return col;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;
    
    // Circular vessel
    vec2 uv = st * 2.0 - 1.0;
    float r = length(uv);
    float vessel_mask = 1.0 - smoothstep(0.85, 0.95, r);
    
    vec3 col = vec3(0.1, 0.08, 0.06); // stone vessel exterior
    
    if (vessel_mask > 0.01) {
        // Water surface
        float height = water_height(st, u_time);
        vec3 water = water_color(st, height, u_time);
        
        // Vessel interior
        float interior = smoothstep(0.8, 0.85, r);
        vec3 stone = vec3(0.4, 0.35, 0.3);
        
        col = mix(stone, water, vessel_mask);
        
        // Rim highlight
        float rim = smoothstep(0.88, 0.9, r) * (1.0 - smoothstep(0.92, 0.95, r));
        col += vec3(0.3, 0.25, 0.2) * rim;
    }
    
    // Vignette
    float vig = 1.0 - smoothstep(0.5, 1.2, length(st - 0.5));
    col *= vig;
    
    gl_FragColor = vec4(col, 1.0);
}

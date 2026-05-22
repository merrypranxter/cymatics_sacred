// MEDIUM: Sand — granular accumulation at Lissajous-Chladni nodal intersections
// FREQUENCY: Plate driven at (px : py) ratio; freq slider selects from sacred ratios
// GEOMETRY: Square plate, simultaneous x-axis / y-axis driving — the Harmonograph in 2D
// SACRED: The marriage of polarities — the knot of creation, the Vesica Piscis of motion

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_freq;  // maps to a sacred frequency ratio (see below)

#define PI   3.14159265
#define TAU  6.28318530
#define PHI  1.61803399

// ─── Lissajous-Chladni field ──────────────────────────────────────────────
// Plate driven at frequencies (px · f₀) in x and (py · f₀) in y simultaneously.
// Standing wave amplitude: W(x,y) = sin(px·π·x) · sin(py·π·y + δ)
// Sand collects where |W| is minimum — the nodal curve of the Lissajous figure.
//
// Rational ratio px/py → closed Lissajous knot; irrational → space-filling curve.
float lissajous_field(vec2 p, float px, float py, float delta) {
    float Wx = sin(px * PI * p.x);
    float Wy = sin(py * PI * p.y + delta);
    return Wx * Wy;
}

// ─── Sacred ratio selector ────────────────────────────────────────────────
// u_freq [30..500] is divided into 7 bands, each a sacred harmonic ratio.
//   Band  freq range   px:py   Name               Sacred correspondence
//    0    30–96        1:1     Unison             The axis mundi — two lines
//    1    97–162       2:1     Octave             The lemniscate of infinity
//    2    163–230      3:2     Perfect fifth      Five-pointed star (partial)
//    3    231–296      4:3     Perfect fourth     Squared spiral
//    4    297–362      5:4     Major third        Twisted loop
//    5    363–430      5:3     Major sixth        Complex five-knot
//    6    431–500      7:4     Harmonic seventh   The rarest knot

void get_ratio(float freq,
               out float px, out float py,
               out float delta) {
    float t = clamp((freq - 30.0) / 470.0, 0.0, 0.9999);

    if      (t < 0.1429) { px = 1.0; py = 1.0; delta = PI * 0.50; }
    else if (t < 0.2857) { px = 2.0; py = 1.0; delta = PI * 0.50; }
    else if (t < 0.4286) { px = 3.0; py = 2.0; delta = PI * 0.50; }
    else if (t < 0.5714) { px = 4.0; py = 3.0; delta = PI * 0.50; }
    else if (t < 0.7143) { px = 5.0; py = 4.0; delta = PI * 0.50; }
    else if (t < 0.8571) { px = 5.0; py = 3.0; delta = PI * 0.50; }
    else                 { px = 7.0; py = 4.0; delta = PI * 0.50; }
}

// ─── Animated field with slow phase drift ────────────────────────────────
// The phase δ sweeps slowly — the figure rotates through its degenerate family.
float animated_field(vec2 p, float time, float freq) {
    float px, py, delta;
    get_ratio(freq, px, py, delta);

    // Phase evolution: one full rotation maps out all degenerate orientations
    float phase = delta + time * 0.18;

    float f = lissajous_field(p, px, py, phase);

    // Sub-harmonic contamination: slight breathing from neighbouring ratio
    float f2 = lissajous_field(p, px + 1.0, py, phase * 1.25) * 0.12;

    return f + f2;
}

void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;
    vec2 uv  = (st * 2.0 - 1.0) * vec2(ar, 1.0);
    float r  = length(uv);

    float freq = (u_freq > 0.0) ? u_freq : 220.0;

    // Square plate boundary
    float half      = 0.82;
    float box_dist  = max(abs(uv.x), abs(uv.y));
    float plate_mask = 1.0 - smoothstep(half - 0.01, half + 0.05, box_dist);
    float rim_mask   = smoothstep(half - 0.07, half - 0.02, box_dist)
                     * (1.0 - smoothstep(half - 0.01, half + 0.04, box_dist));

    vec3 col = vec3(0.07, 0.05, 0.04);  // dark felt table

    if (plate_mask > 0.01) {
        vec2 pn     = uv / half;          // normalised [-1, 1]
        float field = animated_field(pn, u_time, freq);

        // Sand at nodal lines (|field| ≈ 0)
        float node  = 1.0 - smoothstep(0.0, 0.11, abs(field));

        // Granular sand texture
        vec2 gv = uv * 105.0;
        float grain = fract(sin(dot(gv, vec2(127.1, 311.7))) * 43758.5453);
        node *= 0.74 + 0.26 * grain;

        // Plate surface: anodised aluminium with fine scratch pattern
        float scratch = fract(r * 32.0 + 0.03 * sin(atan(uv.y, uv.x) * 18.0));
        vec3  plate   = vec3(0.55, 0.55, 0.59) * (0.90 + 0.10 * scratch);

        // Sand: crushed white quartz — slightly warm
        vec3  sand_col = vec3(0.94, 0.91, 0.84);

        // Antinode glow: bright vibrating region
        float antinodal = smoothstep(0.55, 1.0, abs(field));

        vec3  plate_col = mix(plate, sand_col, node * 0.92);
        plate_col += vec3(0.05, 0.03, 0.01) * antinodal;

        // Rim edge: bright polished aluminium
        plate_col = mix(plate_col, vec3(0.72, 0.72, 0.76), rim_mask * 0.55);

        col = mix(col, plate_col, plate_mask);
    }

    // Vignette
    col *= 1.0 - smoothstep(0.85, 1.65, length(uv));

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

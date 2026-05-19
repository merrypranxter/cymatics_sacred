// MEDIUM: Spherical harmonics — eigenfunctions of the Laplacian on S²
// FREQUENCY: l = 0..4 orbital shells; m = −l..l azimuthal indices
// GEOMETRY: Equirectangular map of the sphere: x = φ ∈ [0, 2π], y = θ ∈ [0, π]
// SACRED: Atomic orbitals, planetary vibration modes, the alphabet of God's geometry

precision highp float;

uniform vec2  u_resolution;
uniform float u_time;

#define PI   3.14159265
#define TAU  6.28318530

// ─── Associated Legendre polynomials P_l^|m|(cos θ) ──────────────────────
// Unnormalised; sign conventions following Condon-Shortley where marked

float P00(float c) { return 1.0; }

// l = 1
float P10(float c) { return c; }
float P11(float c) { return -sqrt(max(0.0, 1.0 - c*c)); }

// l = 2
float P20(float c) { return 0.5 * (3.0*c*c - 1.0); }
float P21(float c) { return -3.0 * c * sqrt(max(0.0, 1.0 - c*c)); }
float P22(float c) { return  3.0 * (1.0 - c*c); }

// l = 3
float P30(float c) { return 0.5 * c * (5.0*c*c - 3.0); }
float P31(float c) { float s2 = max(0.0, 1.0-c*c); return -1.5*(5.0*c*c-1.0)*sqrt(s2); }
float P32(float c) { return 15.0 * c * (1.0 - c*c); }
float P33(float c) { float s2 = max(0.0, 1.0-c*c); return -15.0*s2*sqrt(s2); }

// l = 4
float P40(float c) { float c2=c*c; return 0.125*(35.0*c2*c2 - 30.0*c2 + 3.0); }
float P41(float c) { float s2=max(0.0,1.0-c*c); return -2.5*c*(7.0*c*c-3.0)*sqrt(s2); }
float P42(float c) { float c2=c*c; return 7.5*(7.0*c2-1.0)*(1.0-c2); }
float P43(float c) { float s2=max(0.0,1.0-c*c); return -105.0*c*s2*sqrt(s2); }
float P44(float c) { float s2=max(0.0,1.0-c*c); return 105.0*s2*s2; }

// ─── Real spherical harmonics Y_l^m(θ, φ) ────────────────────────────────
// Y_l^0  = N · P_l^0(cosθ)
// Y_l^m  = N · P_l^m(cosθ) · cos(m·φ)   m > 0
// Y_l^-m = N · P_l^m(cosθ) · sin(m·φ)   m < 0
// (Normalisation factors omitted — visual purposes only)

float Ylm(float l, float m, float theta, float phi) {
    float cosT  = cos(theta);
    float absm  = abs(m);

    float angular;
    if (m < -0.5)      angular = sin(absm * phi);
    else if (m < 0.5)  angular = 1.0;
    else               angular = cos(absm * phi);

    float P = 0.0;

    if      (l < 0.5)                      P = P00(cosT);
    else if (l < 1.5 && absm < 0.5)        P = P10(cosT);
    else if (l < 1.5 && absm < 1.5)        P = P11(cosT);
    else if (l < 2.5 && absm < 0.5)        P = P20(cosT);
    else if (l < 2.5 && absm < 1.5)        P = P21(cosT);
    else if (l < 2.5 && absm < 2.5)        P = P22(cosT);
    else if (l < 3.5 && absm < 0.5)        P = P30(cosT);
    else if (l < 3.5 && absm < 1.5)        P = P31(cosT);
    else if (l < 3.5 && absm < 2.5)        P = P32(cosT);
    else if (l < 3.5 && absm < 3.5)        P = P33(cosT);
    else if (l < 4.5 && absm < 0.5)        P = P40(cosT);
    else if (l < 4.5 && absm < 1.5)        P = P41(cosT);
    else if (l < 4.5 && absm < 2.5)        P = P42(cosT);
    else if (l < 4.5 && absm < 3.5)        P = P43(cosT);
    else if (l < 4.5 && absm < 4.5)        P = P44(cosT);

    return P * angular;
}

// ─── Animated superposition: slowly morphs between l-shells ──────────────
float harmonic_field(float theta, float phi, float time) {
    float t = time * 0.22;
    float f = 0.0;

    // l = 2 shell — the d-orbitals; 5 modes
    f += Ylm(2.0,  0.0, theta, phi) * cos(t * 1.00);
    f += Ylm(2.0,  2.0, theta, phi) * cos(t * 1.30 + 1.05);
    f += Ylm(2.0, -2.0, theta, phi) * cos(t * 0.80 + 2.09);
    f += Ylm(2.0,  1.0, theta, phi) * cos(t * 1.55 + 3.14) * 0.6;
    f += Ylm(2.0, -1.0, theta, phi) * cos(t * 0.65 + 4.19) * 0.6;

    // l = 3 shell — the f-orbitals; 7 modes (partial)
    f += Ylm(3.0,  1.0, theta, phi) * cos(t * 1.70 + 0.52) * 0.45;
    f += Ylm(3.0, -1.0, theta, phi) * cos(t * 0.58 + 1.57) * 0.45;
    f += Ylm(3.0,  3.0, theta, phi) * cos(t * 0.62 + 2.62) * 0.35;
    f += Ylm(3.0, -2.0, theta, phi) * cos(t * 1.12 + 0.30) * 0.30;
    f += Ylm(3.0,  0.0, theta, phi) * cos(t * 0.95 + 1.00) * 0.25;

    // l = 4 shell — fine detail
    f += Ylm(4.0,  0.0, theta, phi) * cos(t * 0.87 + 0.77) * 0.22;
    f += Ylm(4.0,  4.0, theta, phi) * cos(t * 1.40 + 2.80) * 0.18;
    f += Ylm(4.0, -4.0, theta, phi) * cos(t * 1.05 + 3.50) * 0.18;
    f += Ylm(4.0,  2.0, theta, phi) * cos(t * 0.72 + 1.20) * 0.14;

    return f;
}

void main() {
    vec2 st  = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;

    // Equirectangular projection
    // x-axis → azimuth φ ∈ [0, 2π]
    // y-axis → polar  θ ∈ [0, π]
    float phi   = st.x * TAU;
    float theta = st.y * PI;

    float Y = harmonic_field(theta, phi, u_time);

    // Normalise for display
    float Yn = clamp(Y * 0.30, -1.0, 1.0);

    float pos = max(0.0,  Yn);
    float neg = max(0.0, -Yn);

    // Colour palette: hot orange-red (positive), deep indigo (negative), black (nodes)
    vec3 pos_col  = vec3(0.92, 0.44, 0.08);
    vec3 neg_col  = vec3(0.10, 0.16, 0.72);
    vec3 node_col = vec3(0.02, 0.02, 0.04);

    vec3 col = node_col;
    col = mix(col, pos_col, smoothstep(0.0, 0.5, pos) * 1.6 * pos);
    col = mix(col, neg_col, smoothstep(0.0, 0.5, neg) * 1.6 * neg);

    // Nodal lines: where Y = 0 (the silence lines of the sphere)
    float nodal = 1.0 - smoothstep(0.0, 0.055, abs(Yn));
    col = mix(col, vec3(0.04, 0.06, 0.08), nodal * 0.75);

    // Faint latitude/longitude grid for orientation
    float lat = smoothstep(0.010, 0.018, abs(fract(st.y * 6.0 + 0.5) - 0.5));
    float lon = smoothstep(0.005, 0.012, abs(fract(st.x * 12.0 + 0.5) - 0.5));
    col *= 0.88 + 0.12 * lat * lon;

    // Equator highlight
    float equator = 1.0 - smoothstep(0.004, 0.014, abs(st.y - 0.5));
    col += vec3(0.08, 0.06, 0.03) * equator * 0.35;

    // Vignette: letterbox the top/bottom poles
    vec2 uv = st * 2.0 - 1.0;
    uv.x *= ar;
    col *= 1.0 - smoothstep(0.85, 1.4, length(uv));

    // Film grain
    float fg = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col *= 0.97 + 0.03 * fg;

    gl_FragColor = vec4(col, 1.0);
}

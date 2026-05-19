"""
bessel_modes.py — Circular plate eigenvalue solver and Chladni visualiser

Computes the vibrational modes of a circular plate using the Bessel function
eigenvalue equation, then renders the nodal patterns as Chladni figures.

Requirements:
    pip install numpy scipy matplotlib

Usage:
    python bessel_modes.py                 # interactive plot of first 16 modes
    python bessel_modes.py --freq 432      # show modes near 432 Hz
    python bessel_modes.py --mode 4 1     # show specific (m, n) mode
    python bessel_modes.py --grid         # 4×4 grid of mode shapes
    python bessel_modes.py --list         # print frequency table
"""

import argparse
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from scipy.special import jn, jn_zeros

# ─── Physical constants ──────────────────────────────────────────────────────

# Default plate: circular steel disc, 300 mm diameter, 1 mm thick
DEFAULTS = {
    "radius_m":        0.150,   # 300 mm diameter
    "thickness_m":     0.001,   # 1 mm thick
    "density_kg_m3":   7850.0,  # steel
    "youngs_GPa":      200.0,   # steel
    "poisson":         0.30,    # steel
}

# ─── Plate physics ─────────────────────────────────────────────────────────

def flexural_rigidity(E_Pa: float, h: float, nu: float) -> float:
    """D = E·h³ / (12·(1−ν²))  [N·m]"""
    return E_Pa * h**3 / (12.0 * (1.0 - nu**2))


def plate_frequency(alpha_mn: float, R: float, h: float,
                    rho: float, E_Pa: float, nu: float) -> float:
    """
    Natural frequency of circular plate mode (m, n).

    f = (α²_mn / (2π R²)) · √(D / (ρ·h))

    where D = E·h³ / (12·(1−ν²)) is the flexural rigidity.

    Parameters
    ----------
    alpha_mn : float — Bessel zero α_{m,n}
    R        : float — plate radius [m]
    h        : float — plate thickness [m]
    rho      : float — material density [kg/m³]
    E_Pa     : float — Young's modulus [Pa]
    nu       : float — Poisson's ratio
    """
    D = flexural_rigidity(E_Pa, h, nu)
    return (alpha_mn**2 / (2.0 * np.pi * R**2)) * np.sqrt(D / (rho * h))


def all_modes(n_m: int = 8, n_n: int = 4, **plate) -> list[dict]:
    """
    Return a sorted list of plate modes (m from 0..n_m, n from 1..n_n).

    Each entry: {m, n, alpha, freq_hz, name}
    """
    R   = plate.get("radius_m",      DEFAULTS["radius_m"])
    h   = plate.get("thickness_m",   DEFAULTS["thickness_m"])
    rho = plate.get("density_kg_m3", DEFAULTS["density_kg_m3"])
    E   = plate.get("youngs_GPa",    DEFAULTS["youngs_GPa"]) * 1e9
    nu  = plate.get("poisson",       DEFAULTS["poisson"])

    modes = []
    for m in range(n_m):
        zeros = jn_zeros(m, n_n)   # first n_n zeros of J_m
        for idx, alpha in enumerate(zeros):
            n = idx + 1
            f = plate_frequency(alpha, R, h, rho, E, nu)
            modes.append({
                "m":       m,
                "n":       n,
                "alpha":   round(alpha, 5),
                "freq_hz": round(f, 3),
                "name":    mode_name(m, n),
            })
    modes.sort(key=lambda x: x["freq_hz"])
    return modes


def mode_name(m: int, n: int) -> str:
    """Human-readable name for a (m, n) mode."""
    names = {
        (0, 1): "Bullseye",
        (1, 1): "Yin-Yang",
        (2, 1): "Triskelion",
        (0, 2): "Double ring",
        (3, 1): "Four-leaf",
        (1, 2): "Split + ring",
        (4, 1): "Pentagram",
        (2, 2): "Triskelion + ring",
        (5, 1): "Hexagram",
        (0, 3): "Three rings",
        (6, 1): "Heptagram",
        (3, 2): "Four-leaf + ring",
        (7, 1): "Octagram",
        (4, 2): "Pentagram + ring",
    }
    return names.get((m, n), f"({m},{n})")


# ─── Mode shape functions ─────────────────────────────────────────────────────

def mode_shape(m: int, n: int, N: int = 512) -> np.ndarray:
    """
    Evaluate the displacement eigenfunction ψ_{m,n}(r, θ) on an N×N grid.

    ψ_{m,n}(r, θ) = J_m(α_{mn} · r/R) · cos(m·θ)

    Returns an N×N float array, normalised to [-1, 1].
    The plate occupies the unit disc.
    """
    alpha = jn_zeros(m, n)[n - 1]          # n-th zero of J_m
    x = np.linspace(-1.0, 1.0, N)
    y = np.linspace(-1.0, 1.0, N)
    X, Y = np.meshgrid(x, y)
    R_mat = np.sqrt(X**2 + Y**2)
    Th = np.arctan2(Y, X)

    inside = R_mat <= 1.0

    # Radial Bessel part
    psi = np.zeros((N, N))
    psi[inside] = jn(m, alpha * R_mat[inside]) * np.cos(m * Th[inside])

    # Normalise
    p_max = np.abs(psi[inside]).max()
    if p_max > 0:
        psi /= p_max
    psi[~inside] = np.nan
    return psi


def sand_pattern(psi: np.ndarray, sigma: float = 0.06) -> np.ndarray:
    """
    Simulate sand/lycopodium accumulation from a mode shape.

    Sand migrates to NODES (minimum |ψ|). The "density" of sand at each point
    is proportional to exp(−|ψ|² / (2σ²)).

    Parameters
    ----------
    psi   : mode shape array (NaN outside the plate)
    sigma : nodal-line width parameter (smaller = sharper lines)
    """
    # Gaussian centred at zero amplitude
    density = np.exp(-(psi**2) / (2.0 * sigma**2))
    density[np.isnan(psi)] = np.nan
    return density


# ─── Visualisation ─────────────────────────────────────────────────────────

def plot_mode(m: int, n: int, ax: plt.Axes, show_waves: bool = True,
              show_sand: bool = True, **plate) -> None:
    """Render a single mode on the given Axes."""
    R   = plate.get("radius_m",      DEFAULTS["radius_m"])
    h   = plate.get("thickness_m",   DEFAULTS["thickness_m"])
    rho = plate.get("density_kg_m3", DEFAULTS["density_kg_m3"])
    E   = plate.get("youngs_GPa",    DEFAULTS["youngs_GPa"]) * 1e9
    nu  = plate.get("poisson",       DEFAULTS["poisson"])
    alpha = jn_zeros(m, n)[n - 1]
    f     = plate_frequency(alpha, R, h, rho, E, nu)

    psi  = mode_shape(m, n)
    sand = sand_pattern(psi)

    # Background: steel plate (blue-grey)
    plate_img = np.where(~np.isnan(psi),
                         np.full_like(psi, 0.5),   # plate base tone
                         np.nan)

    # Colour: wave displacement (red = positive, blue = negative)
    wave_cmap = mcolors.LinearSegmentedColormap.from_list(
        "wave", ["#1a1450", "#0a0808", "#0a0808", "#8b1a10"])

    # Sand: pale cream
    sand_rgb = np.full((*sand.shape, 4), [0.92, 0.90, 0.82, 0.0])  # RGBA
    valid = ~np.isnan(sand)
    sand_rgb[valid, 3] = sand[valid] * 0.92   # alpha = sand density

    if show_waves:
        psi_show = np.where(np.isnan(psi), np.nan, psi)
        ax.imshow(psi_show, origin="lower", cmap=wave_cmap,
                  vmin=-1, vmax=1, extent=[-1, 1, -1, 1])

    if show_sand:
        ax.imshow(sand_rgb, origin="lower", extent=[-1, 1, -1, 1])

    # Disc outline
    theta = np.linspace(0, 2 * np.pi, 200)
    ax.plot(np.cos(theta), np.sin(theta), color="#3a2a1a", linewidth=1.5, zorder=5)

    # Center clamp dot
    ax.plot(0, 0, "o", color="#2a1a0a", markersize=4, zorder=6)

    ax.set_aspect("equal")
    ax.set_xlim(-1.1, 1.1)
    ax.set_ylim(-1.1, 1.1)
    ax.axis("off")
    ax.set_title(
        f"({m},{n})  {mode_name(m, n)}\n"
        f"α={alpha:.4f}   f={f:.1f} Hz",
        fontsize=8, color="#c8b890", pad=3
    )


def plot_grid(modes: list[dict], cols: int = 4, **plate) -> None:
    """Plot a grid of mode shapes."""
    n_modes = len(modes)
    rows    = (n_modes + cols - 1) // cols
    fig, axes = plt.subplots(rows, cols,
                             figsize=(cols * 3.5, rows * 3.5),
                             facecolor="#0a0808")
    axes = axes.flatten()
    for i, mode in enumerate(modes):
        plot_mode(mode["m"], mode["n"], axes[i], **plate)
    for j in range(i + 1, len(axes)):
        axes[j].set_visible(False)
    fig.suptitle("Circular Plate — Bessel Eigenmodes",
                 color="#d4a44c", fontsize=13, y=1.01)
    plt.tight_layout()
    plt.show()


def print_table(modes: list[dict]) -> None:
    """Print a frequency table of modes."""
    print(f"\n{'Mode':>8}  {'α_mn':>9}  {'Freq (Hz)':>11}  {'Pattern'}")
    print("─" * 54)
    for md in modes:
        tag = f"({md['m']},{md['n']})"
        print(f"{tag:>8}  {md['alpha']:>9.4f}  {md['freq_hz']:>11.2f}  {md['name']}")
    print()


# ─── Closest mode search ─────────────────────────────────────────────────────

def closest_mode(target_hz: float, modes: list[dict]) -> dict:
    return min(modes, key=lambda md: abs(md["freq_hz"] - target_hz))


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Circular plate Bessel mode solver and Chladni visualiser")
    parser.add_argument("--freq",   type=float, default=None,
                        help="Show mode closest to this frequency [Hz]")
    parser.add_argument("--mode",   type=int,   nargs=2, default=None,
                        metavar=("M", "N"),
                        help="Show specific mode (m, n)")
    parser.add_argument("--grid",   action="store_true",
                        help="Show 4×4 grid of first 16 modes")
    parser.add_argument("--list",   action="store_true",
                        help="Print frequency table only")
    parser.add_argument("--radius", type=float, default=DEFAULTS["radius_m"],
                        help="Plate radius [m]  (default: 0.150)")
    parser.add_argument("--thickness", type=float, default=DEFAULTS["thickness_m"],
                        help="Plate thickness [m]  (default: 0.001)")
    parser.add_argument("--material", type=str, default="steel",
                        choices=["steel", "brass", "aluminium"],
                        help="Plate material  (default: steel)")
    args = parser.parse_args()

    # Material presets
    materials = {
        "steel":     {"density_kg_m3": 7850, "youngs_GPa": 200, "poisson": 0.30},
        "brass":     {"density_kg_m3": 8500, "youngs_GPa": 100, "poisson": 0.34},
        "aluminium": {"density_kg_m3": 2700, "youngs_GPa":  69, "poisson": 0.33},
    }
    plate = {
        "radius_m":    args.radius,
        "thickness_m": args.thickness,
        **materials[args.material],
    }

    modes = all_modes(n_m=8, n_n=4, **plate)

    if args.list:
        print_table(modes)
        return

    if args.freq is not None:
        md = closest_mode(args.freq, modes)
        print(f"\nClosest mode to {args.freq} Hz:")
        print(f"  Mode ({md['m']},{md['n']}) — {md['name']}")
        print(f"  α = {md['alpha']},  f = {md['freq_hz']} Hz")
        fig, ax = plt.subplots(figsize=(5, 5), facecolor="#0a0808")
        plot_mode(md["m"], md["n"], ax, **plate)
        plt.tight_layout()
        plt.show()
        return

    if args.mode is not None:
        m, n = args.mode
        fig, ax = plt.subplots(figsize=(5, 5), facecolor="#0a0808")
        plot_mode(m, n, ax, **plate)
        plt.tight_layout()
        plt.show()
        return

    if args.grid:
        first_16 = modes[:16]
        plot_grid(first_16, cols=4, **plate)
        return

    # Default: 4×4 grid of first 16 modes
    print_table(modes[:24])
    plot_grid(modes[:16], cols=4, **plate)


if __name__ == "__main__":
    main()

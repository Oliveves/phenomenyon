import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  LiquidOrb,
  type LiquidOrbPalette,
  type LiquidOrbShape,
} from "@phenomenyon/components"
import { COLORS, FONT_MONO, FONT_SANS, FONT_SERIF, TYPE } from "../../theme"

const GITHUB_URL = "https://github.com/Oliveves/phenomenyon-components"
const RELEASE_URL =
  "https://github.com/Oliveves/phenomenyon-components/releases/tag/v0.4.0"

const REACT_INSTALL_SNIPPET = `npm install github:Oliveves/phenomenyon-components#v0.4.0`

const REACT_USAGE_SNIPPET = `import { LiquidOrb } from "@phenomenyon/components"

export default function Hero() {
  return (
    <section style={{ position: "relative", height: "100vh" }}>
      <LiquidOrb fill palette="sunset" shape="orb" />
    </section>
  )
}`

const COLOR_SNIPPET = `<LiquidOrb
  shape="droplet"
  colors={["#FF6A3D", "#FFB27A", "#79C7C9", "#6F8FD0"]}
  reactivity={1.6}
  grain={0.06}
/>`

const PLATFORMS = ["React", "Next.js", "Remix", "Vite", "Astro (islands)"]

const PALETTES: LiquidOrbPalette[] = [
  "sunset",
  "aurora",
  "magma",
  "ocean",
  "iris",
]
const SHAPES: LiquidOrbShape[] = ["orb", "blob", "droplet"]

const PALETTE_MOODS: Record<LiquidOrbPalette, string> = {
  sunset: "Warm → cool dusk",
  aurora: "Mint to violet drift",
  magma: "Molten amber & red",
  ocean: "Deep blue current",
  iris: "Soft petal spectrum",
}

/* Detail-page typography overrides (matched to SilkWave) */
const LABEL_LG = {
  ...TYPE.label,
  fontSize: "14px",
}
const H2_DETAIL = {
  fontFamily: FONT_SERIF,
  fontWeight: 300,
  fontStyle: "italic" as const,
  fontSize: "clamp(36px, 5.5vw, 64px)",
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
}
const H3_DETAIL = {
  fontFamily: FONT_SERIF,
  fontWeight: 300,
  fontStyle: "italic" as const,
  fontSize: "clamp(26px, 3.5vw, 38px)",
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
}
const BODY_LG = {
  fontFamily: FONT_SANS,
  fontSize: "16px",
  fontWeight: 300,
  lineHeight: 1.65,
}
const TAG_LG = {
  ...TYPE.tag,
  fontSize: "19px",
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches
  )
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return isMobile
}

export default function LiquidOrbPage() {
  const isMobile = useIsMobile()
  return (
    <div style={{ overflowX: "hidden", background: COLORS.bg }}>
      <FloatingNav />
      <HeroSection isMobile={isMobile} />
      <InstallSection isMobile={isMobile} />
      <GalleryShowcase isMobile={isMobile} />
      <PropsSection isMobile={isMobile} />
      <FooterSection isMobile={isMobile} />
    </div>
  )
}

/* ---------- Floating top nav ---------- */

function FloatingNav() {
  const linkStyle: React.CSSProperties = {
    fontFamily: FONT_MONO,
    fontSize: 14,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "inherit",
    textDecoration: "none",
  }
  return (
    <nav
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        right: 24,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderRadius: 999,
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        color: "#ffffff",
        mixBlendMode: "difference",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.background =
          "rgba(255, 255, 255, 0.14)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.background =
          "rgba(255, 255, 255, 0.05)"
      }}
    >
      <Link to="/" style={linkStyle}>
        <span aria-hidden>←</span> phenomenyon
      </Link>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        GitHub
      </a>
    </nav>
  )
}

/* ---------- Section 1 · Hero + palette/shape switcher ---------- */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [palette, setPalette] = useState<LiquidOrbPalette>("sunset")
  const [shape, setShape] = useState<LiquidOrbShape>("orb")

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#0A0A0A",
      }}
    >
      <LiquidOrb fill palette={palette} shape={shape} background="#0A0A0A" />

      {/* top-left label */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? 88 : 96,
          left: isMobile ? 24 : 48,
          zIndex: 1,
          ...LABEL_LG,
          color: "#F5F1EA",
          opacity: 0.75,
          pointerEvents: "none",
        }}
      >
        01 · Liquid Orb
      </div>

      {/* centered h1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "0 24px" : "0 48px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
            color: "#F5F1EA",
            margin: 0,
            textAlign: "center",
            mixBlendMode: "difference",
          }}
        >
          Liquid that follows.
        </h1>
      </div>

      {/* switchers */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: isMobile ? 48 : 64,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? 16 : 22,
          zIndex: 2,
          width: "max-content",
          maxWidth: "92vw",
        }}
      >
        <Switcher
          options={PALETTES}
          active={palette}
          onSelect={setPalette}
          isMobile={isMobile}
        />
        <Switcher
          options={SHAPES}
          active={shape}
          onSelect={setShape}
          isMobile={isMobile}
          dim
        />
      </div>
    </section>
  )
}

function Switcher<T extends string>({
  options,
  active,
  onSelect,
  isMobile,
  dim,
}: {
  options: readonly T[]
  active: T
  onSelect: (v: T) => void
  isMobile: boolean
  dim?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: isMobile ? 18 : 40,
      }}
    >
      {options.map((opt) => {
        const isActive = opt === active
        return (
          <button
            key={opt}
            type="button"
            aria-label={opt}
            aria-pressed={isActive}
            onClick={() => onSelect(opt)}
            style={{
              position: "relative",
              background: "transparent",
              border: "none",
              padding: "14px 6px 8px",
              cursor: "pointer",
              fontFamily: FONT_MONO,
              fontSize: isMobile ? 12 : dim ? 12 : 14,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#F5F1EA",
              opacity: isActive ? 1 : dim ? 0.4 : 0.5,
              transition: "opacity 0.25s",
              outline: "none",
              mixBlendMode: "difference",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "currentColor",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Section 2 · Install ---------- */

function InstallSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: COLORS.bgLight,
        color: COLORS.textDark,
        padding: isMobile ? "80px 24px" : "120px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          marginInline: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        <div>
          <p style={{ ...LABEL_LG, color: COLORS.textDark, opacity: 0.55 }}>
            02 · Install
          </p>
          <p
            style={{
              ...TAG_LG,
              color: COLORS.textDark,
              opacity: 0.85,
              margin: "28px 0 0",
              maxWidth: 640,
            }}
          >
            Cursor-reactive liquid blob on a Canvas. Zero deps, DPR-aware,
            respects reduced motion. Free. MIT.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 60,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
            }}
          >
            <p style={{ ...LABEL_LG, color: COLORS.textDark, opacity: 0.6 }}>
              React
            </p>
            <h2 style={{ ...H3_DETAIL, color: COLORS.textDark, margin: 0 }}>
              Drop it behind the hero.
            </h2>
            <CodeBlock code={REACT_INSTALL_SNIPPET} lightMode />
            <CodeBlock code={REACT_USAGE_SNIPPET} lightMode />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 4,
              }}
            >
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  style={{
                    ...LABEL_LG,
                    color: COLORS.textDark,
                    opacity: 0.7,
                    border: "1px solid rgba(27,27,27,0.15)",
                    borderRadius: 999,
                    padding: "6px 14px",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
            }}
          >
            <p style={{ ...LABEL_LG, color: COLORS.textDark, opacity: 0.6 }}>
              Make it yours
            </p>
            <h2 style={{ ...H3_DETAIL, color: COLORS.textDark, margin: 0 }}>
              Bring your own colors.
            </h2>
            <CodeBlock code={COLOR_SNIPPET} lightMode />
            <p
              style={{
                ...BODY_LG,
                color: COLORS.textDark,
                opacity: 0.8,
                margin: 0,
              }}
            >
              Pass <code style={{ fontFamily: FONT_MONO }}>colors</code>{" "}
              (warm → cool reads best) to override the{" "}
              <code style={{ fontFamily: FONT_MONO }}>palette</code>, pick a{" "}
              <code style={{ fontFamily: FONT_MONO }}>shape</code>, and dial{" "}
              <code style={{ fontFamily: FONT_MONO }}>reactivity</code> for how
              hard the surface leans toward the cursor. Set{" "}
              <code style={{ fontFamily: FONT_MONO }}>fill</code> to fill a
              positioned parent, or omit it and use{" "}
              <code style={{ fontFamily: FONT_MONO }}>size</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 3 · Palette × Shape gallery ---------- */

function GalleryShowcase({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        width: "100vw",
        background: COLORS.bg,
        padding: isMobile ? "80px 0 100px" : "120px 0 140px",
      }}
    >
      <div
        style={{
          padding: isMobile ? "0 24px 56px" : "0 60px 72px",
          textAlign: "center",
        }}
      >
        <p style={{ ...LABEL_LG, color: COLORS.silver, opacity: 0.7 }}>
          03 · Palettes & shapes
        </p>
        <h2 style={{ ...H2_DETAIL, color: COLORS.text, margin: "24px 0 0" }}>
          Five palettes, three silhouettes.
        </h2>
      </div>

      {/* palette rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {PALETTES.map((palette) => (
          <div
            key={palette}
            style={{
              position: "relative",
              width: "100%",
              minHeight: isMobile ? 260 : "clamp(300px, 42vh, 460px)",
              overflow: "hidden",
              background: "#0A0A0A",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LiquidOrb fill palette={palette} shape="blob" background="#0A0A0A" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: isMobile ? "0 24px" : "0 60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  ...LABEL_LG,
                  color: "#F5F1EA",
                  opacity: 0.9,
                  mixBlendMode: "difference",
                }}
              >
                {palette}
              </span>
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: isMobile
                    ? "clamp(1.4rem, 4.6vw, 1.9rem)"
                    : "clamp(2rem, 3.6vw, 3rem)",
                  color: "#F5F1EA",
                  textAlign: "right",
                  letterSpacing: "-0.01em",
                  mixBlendMode: "difference",
                }}
              >
                {PALETTE_MOODS[palette]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* shape trio */}
      <div
        style={{
          padding: isMobile ? "72px 24px 0" : "104px 60px 0",
        }}
      >
        <p
          style={{
            ...LABEL_LG,
            color: COLORS.silver,
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          shape
        </p>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? 32 : 28,
          }}
        >
          {SHAPES.map((shape) => (
            <div
              key={shape}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#0A0A0A",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <LiquidOrb
                  fill
                  palette="iris"
                  shape={shape}
                  background="#0A0A0A"
                />
              </div>
              <span
                style={{
                  ...LABEL_LG,
                  color: COLORS.text,
                  textAlign: "center",
                }}
              >
                {shape}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 4 · Props ---------- */

type PropRow = { name: string; type: string; def: string; desc: string }
const PROPS: PropRow[] = [
  {
    name: "size",
    type: "number (px)",
    def: "420",
    desc: "Diameter when fill is false.",
  },
  {
    name: "fill",
    type: "boolean",
    def: "false",
    desc: "Fill a positioned parent instead of using size.",
  },
  {
    name: "palette",
    type: `"sunset" | "aurora" | "magma" | "ocean" | "iris"`,
    def: `"sunset"`,
    desc: "Named gradient preset.",
  },
  {
    name: "colors",
    type: "string[]",
    def: "—",
    desc: "Custom gradient stops (warm → cool reads best). Overrides palette.",
  },
  {
    name: "shape",
    type: `"orb" | "blob" | "droplet"`,
    def: `"orb"`,
    desc: "Silhouette: round orb, strong blob, or elongated droplet.",
  },
  {
    name: "speed",
    type: "number",
    def: "0.02",
    desc: "Idle wobble tempo. Lower is calmer.",
  },
  {
    name: "reactivity",
    type: "number",
    def: "1",
    desc: "How strongly the surface leans toward the cursor. 0 disables.",
  },
  {
    name: "background",
    type: "string",
    def: `"#0A0A0A"`,
    desc: "Backdrop painted behind the orb.",
  },
  {
    name: "grain",
    type: "number (0–1)",
    def: "0.04",
    desc: "Film-grain opacity over the orb. 0 disables.",
  },
]

function PropsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "80vh",
        background: COLORS.bg,
        color: COLORS.text,
        padding: isMobile ? "96px 24px" : "140px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isMobile ? 40 : 64,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <p style={{ ...LABEL_LG, color: COLORS.silver, opacity: 0.7 }}>
          04 · API
        </p>
        <h2 style={{ ...H2_DETAIL, color: COLORS.text, margin: "24px 0 0" }}>
          Props.
        </h2>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {PROPS.map((p, idx) => (
          <div
            key={p.name}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr 220px",
              gap: isMobile ? 10 : 28,
              padding: isMobile ? "28px 0" : "32px 0",
              borderTop: idx === 0 ? `1px solid ${COLORS.border}` : "none",
              borderBottom: `1px solid ${COLORS.border}`,
              alignItems: "baseline",
            }}
          >
            <div style={{ ...LABEL_LG, color: COLORS.text }}>{p.name}</div>
            <div style={{ minWidth: 0 }}>
              <code
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.95rem",
                  color: COLORS.silver,
                  wordBreak: "break-word",
                }}
              >
                {p.type}
              </code>
              <p style={{ ...BODY_LG, color: COLORS.silver, marginTop: 12 }}>
                {p.desc}
              </p>
            </div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.85rem",
                color: COLORS.silver,
                opacity: 0.7,
                textAlign: isMobile ? "left" : "right",
                wordBreak: "break-word",
              }}
            >
              default: {p.def}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Section 5 · Footer ---------- */

function FooterSection({ isMobile }: { isMobile: boolean }) {
  return (
    <footer
      style={{
        width: "100vw",
        background: COLORS.bg,
        color: COLORS.silver,
        padding: isMobile ? "40px 24px" : "48px 60px",
        borderTop: `1px solid ${COLORS.border}`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 18 : 16,
      }}
    >
      <div style={{ ...LABEL_LG, color: COLORS.silver, opacity: 0.6 }}>
        © Phenomenyon 2026
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 10 : 24,
        }}
      >
        <span style={{ ...LABEL_LG, color: COLORS.silver, opacity: 0.6 }}>
          MIT License
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...LABEL_LG, color: COLORS.silver, textDecoration: "none" }}
        >
          GitHub
        </a>
        <a
          href={RELEASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...LABEL_LG, color: COLORS.silver, textDecoration: "none" }}
        >
          Release v0.4.0
        </a>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 10 : 20,
        }}
      >
        <a
          href="mailto:phenomenyon@gmail.com"
          style={{ ...LABEL_LG, color: COLORS.silver, textDecoration: "none" }}
        >
          phenomenyon@gmail.com
        </a>
        <a
          href="https://instagram.com/phenomenyon.stu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...LABEL_LG, color: COLORS.silver, textDecoration: "none" }}
        >
          Instagram
        </a>
      </div>
    </footer>
  )
}

/* ---------- shared · Code block with copy ---------- */

function CodeBlock({ code, lightMode }: { code: string; lightMode?: boolean }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be unavailable (http/insecure) — silently ignore
    }
  }

  const bg = lightMode ? "#ECEAE4" : "#111111"
  const text = lightMode ? COLORS.textDark : COLORS.text
  const border = lightMode ? "rgba(27,27,27,0.12)" : COLORS.border

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "24px 28px",
        boxSizing: "border-box",
      }}
    >
      <button
        type="button"
        onClick={onCopy}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          ...LABEL_LG,
          background: "transparent",
          color: text,
          opacity: 0.6,
          border: `1px solid ${border}`,
          borderRadius: 999,
          padding: "5px 12px",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>

      <pre
        style={{
          margin: 0,
          fontFamily: FONT_MONO,
          fontSize: "0.9rem",
          lineHeight: 1.65,
          color: text,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          paddingRight: 80,
        }}
      >
        <code style={{ fontFamily: FONT_MONO }}>{code}</code>
      </pre>
    </div>
  )
}

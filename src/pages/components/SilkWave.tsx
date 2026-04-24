import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SilkWave from "../../components/SilkWave"
import ProWaitlist from "../../components/ProWaitlist"
import {
  COLORS,
  FONT_MONO,
  FONT_SANS,
  FONT_SERIF,
  THEME_TEXT_COLOR,
  TYPE,
  type ThemeKey,
} from "../../theme"

const GITHUB_URL = "https://github.com/Oliveves/phenomenyon-components"
const RELEASE_URL =
  "https://github.com/Oliveves/phenomenyon-components/releases/tag/v0.1.0"

const CDN_SNIPPET = `<script src="https://cdn.jsdelivr.net/gh/Oliveves/phenomenyon-components@v0.1.0/silkwave-html/silkwave.min.js"></script>
<div data-silkwave="champagne"></div>`

const REACT_INSTALL_SNIPPET = `# Download from GitHub Release
https://github.com/Oliveves/phenomenyon-components/releases/tag/v0.1.0`

const REACT_USAGE_SNIPPET = `import SilkWave from "./SilkWave"

export default function Hero() {
  return <SilkWave theme="champagne" />
}`

const PLATFORMS = ["Webflow", "WordPress", "Shopify", "Framer", "custom HTML"]

const THEME_MOODS: Record<ThemeKey, string> = {
  champagne: "Fashion · Luxury",
  platinum: "Tech · Minimal Editorial",
  blush: "Beauty · Cosmetics",
  midnight: "Cultural · Fragrance",
}

const THEME_ORDER: ThemeKey[] = ["champagne", "platinum", "blush", "midnight"]

/* Detail-page typography overrides (upsized per spec) */
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

export default function SilkWavePage() {
  const isMobile = useIsMobile()
  return (
    <div style={{ overflowX: "hidden", background: COLORS.bg }}>
      <FloatingNav />
      <HeroSection isMobile={isMobile} />
      <InstallSection isMobile={isMobile} />
      <ThemesShowcase isMobile={isMobile} />
      <PropsSection isMobile={isMobile} />
      <ProWaitlist source="silk-wave-detail" isMobile={isMobile} />
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

/* ---------- Section 1 · Hero + theme switcher ---------- */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [theme, setTheme] = useState<ThemeKey>("champagne")
  const textColor = THEME_TEXT_COLOR[theme]

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SilkWave fill theme={theme} speed={0.008} noiseOpacity={0.02} />

      {/* top-left label */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? 88 : 96,
          left: isMobile ? 24 : 48,
          zIndex: 1,
          ...LABEL_LG,
          color: textColor,
          opacity: 0.75,
          pointerEvents: "none",
        }}
      >
        01 · Silk Wave
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
            color: textColor,
            margin: 0,
            textAlign: "center",
          }}
        >
          Silk that breathes.
        </h1>
      </div>

      {/* dot-indicator theme switcher */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: isMobile ? 60 : 80,
          transform: "translateX(-50%)",
          display: "flex",
          gap: isMobile ? 24 : 60,
          zIndex: 2,
        }}
      >
        {THEME_ORDER.map((t) => {
          const active = theme === t
          return (
            <button
              key={t}
              type="button"
              aria-label={`${t} theme`}
              aria-pressed={active}
              onClick={() => setTheme(t)}
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                padding: "14px 6px 8px",
                cursor: "pointer",
                fontFamily: FONT_MONO,
                fontSize: isMobile ? 12 : 14,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: textColor,
                opacity: active ? 1 : 0.5,
                transition: "opacity 0.25s",
                outline: "none",
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
                  opacity: active ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {t}
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Section 2 · Install (Drop-in + React) ---------- */

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
            Animated silk wave background with grain texture. Free. MIT.
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
          {/* Block A — Drop-in */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              minWidth: 0,
            }}
          >
            <p style={{ ...LABEL_LG, color: COLORS.textDark, opacity: 0.6 }}>
              Drop-in
            </p>
            <h2
              style={{
                ...H3_DETAIL,
                color: COLORS.textDark,
                margin: 0,
              }}
            >
              One line. Any site.
            </h2>
            <CodeBlock code={CDN_SNIPPET} lightMode />
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

          {/* Block B — React */}
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
            <h2
              style={{
                ...H3_DETAIL,
                color: COLORS.textDark,
                margin: 0,
              }}
            >
              For React projects.
            </h2>
            <CodeBlock code={REACT_INSTALL_SNIPPET} lightMode />
            <CodeBlock code={REACT_USAGE_SNIPPET} lightMode />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 3 · Themes showcase ---------- */

function ThemesShowcase({ isMobile }: { isMobile: boolean }) {
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
          03 · Themes
        </p>
        <h2
          style={{
            ...H2_DETAIL,
            color: COLORS.text,
            margin: "24px 0 0",
          }}
        >
          Four moods, one component.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {THEME_ORDER.map((theme) => {
          const textColor = THEME_TEXT_COLOR[theme]
          return (
            <div
              key={theme}
              style={{
                position: "relative",
                width: "100%",
                height: isMobile ? "240px" : "clamp(260px, 38vh, 420px)",
                overflow: "hidden",
              }}
            >
              <SilkWave fill theme={theme} speed={0.006} noiseOpacity={0.02} />
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
                }}
              >
                <span
                  style={{
                    ...LABEL_LG,
                    color: textColor,
                    opacity: 0.85,
                  }}
                >
                  {theme}
                </span>
                <span
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: isMobile
                      ? "clamp(1.6rem, 5vw, 2rem)"
                      : "clamp(2.2rem, 3.8vw, 3.2rem)",
                    color: textColor,
                    textAlign: "right",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {THEME_MOODS[theme]}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Section 4 · Props ---------- */

type PropRow = { name: string; type: string; def: string; desc: string }
const PROPS: PropRow[] = [
  {
    name: "theme",
    type: `"champagne" | "platinum" | "blush" | "midnight"`,
    def: `"champagne"`,
    desc: "Preset palette. Controls gradient and line colors.",
  },
  {
    name: "speed",
    type: "number",
    def: "0.008",
    desc: "Animation tempo. Lower is slower.",
  },
  {
    name: "noiseOpacity",
    type: "number (0–1)",
    def: "0.02",
    desc: "Grain intensity layered over the gradient.",
  },
  {
    name: "fill",
    type: "boolean",
    def: "varies per package",
    desc: "React: false (fullscreen fixed). Vanilla: true (fills parent).",
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
        <h2
          style={{
            ...H2_DETAIL,
            color: COLORS.text,
            margin: "24px 0 0",
          }}
        >
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
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr 200px",
              gap: isMobile ? 10 : 28,
              padding: isMobile ? "28px 0" : "32px 0",
              borderTop: idx === 0 ? `1px solid ${COLORS.border}` : "none",
              borderBottom: `1px solid ${COLORS.border}`,
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                ...LABEL_LG,
                color: COLORS.text,
              }}
            >
              {p.name}
            </div>
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
              <p
                style={{
                  ...BODY_LG,
                  color: COLORS.silver,
                  marginTop: 12,
                }}
              >
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

/* ---------- Section 6 · Footer ---------- */

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
          style={{
            ...LABEL_LG,
            color: COLORS.silver,
            textDecoration: "none",
          }}
        >
          GitHub
        </a>
        <a
          href={RELEASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...LABEL_LG,
            color: COLORS.silver,
            textDecoration: "none",
          }}
        >
          Release v0.1.0
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
          style={{
            ...LABEL_LG,
            color: COLORS.silver,
            textDecoration: "none",
          }}
        >
          phenomenyon@gmail.com
        </a>
        <a
          href="https://instagram.com/phenomenyon.stu"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...LABEL_LG,
            color: COLORS.silver,
            textDecoration: "none",
          }}
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

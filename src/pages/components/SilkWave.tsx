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

const REACT_INSTALL_SNIPPET = `// Download from GitHub Release
https://github.com/Oliveves/phenomenyon-components/releases/tag/v0.1.0`

const REACT_USAGE_SNIPPET = `import SilkWave from "./SilkWave"

export default function Hero() {
  return <SilkWave theme="champagne" />
}`

const NAV_H = 60

const PLATFORMS = ["Webflow", "WordPress", "Shopify", "Framer", "custom HTML"]

const THEME_MOODS: Record<ThemeKey, string> = {
  champagne: "Fashion · Luxury",
  platinum: "Tech · Minimal Editorial",
  blush: "Beauty · Cosmetics",
  midnight: "Cultural · Fragrance",
}

const THEME_ORDER: ThemeKey[] = ["champagne", "platinum", "blush", "midnight"]

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
      <TopNav isMobile={isMobile} />
      <HeroSection isMobile={isMobile} />
      <DropInSection isMobile={isMobile} />
      <ThemesShowcase isMobile={isMobile} />
      <JSAPISection isMobile={isMobile} />
      <ReactInstallSection isMobile={isMobile} />
      <PropsSection isMobile={isMobile} />
      <ProWaitlist source="silk-wave-detail" isMobile={isMobile} />
      <FooterSection isMobile={isMobile} />
    </div>
  )
}

/* ---------- Section 0 · Top nav ---------- */

function TopNav({ isMobile }: { isMobile: boolean }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: NAV_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 18px" : "0 28px",
        background: "rgba(8, 8, 8, 0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        zIndex: 200,
      }}
    >
      <Link
        to="/"
        style={{
          ...TYPE.label,
          color: COLORS.text,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span aria-hidden>←</span>
        <span>phenomenyon</span>
      </Link>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...TYPE.label,
          color: COLORS.text,
          textDecoration: "none",
        }}
      >
        GitHub
      </a>
    </nav>
  )
}

/* ---------- Section 1 · Hero ---------- */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const textColor = THEME_TEXT_COLOR.champagne
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SilkWave fill theme="champagne" speed={0.008} noiseOpacity={0.02} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: isMobile ? `${NAV_H + 32}px 24px 32px` : `${NAV_H + 40}px 48px 48px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div style={{ ...TYPE.label, color: textColor, opacity: 0.7 }}>
          01 · Data-attribute · Auto-init
        </div>

        <h1
          style={{
            ...TYPE.h1,
            color: textColor,
            fontStyle: "italic",
            margin: 0,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          Silk that breathes.
        </h1>

        <p
          style={{
            ...TYPE.tag,
            color: textColor,
            opacity: 0.75,
            margin: 0,
            maxWidth: 640,
          }}
        >
          Animated silk wave background with grain texture. Free. MIT.
        </p>
      </div>
    </section>
  )
}

/* ---------- Section 2 · Drop-in install ---------- */

function DropInSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: COLORS.bgLight,
        color: COLORS.textDark,
        padding: isMobile ? "96px 24px" : "140px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 40 : 56,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <p style={{ ...TYPE.label, color: COLORS.textDark, opacity: 0.55 }}>
          02 · Drop-in Usage
        </p>
        <h2
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
            color: COLORS.textDark,
            margin: "24px 0 0",
          }}
        >
          One line. Any site.
        </h2>
      </div>

      <CodeBlock code={CDN_SNIPPET} lightMode />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: isMobile ? 10 : 14,
        }}
      >
        {PLATFORMS.map((p) => (
          <span
            key={p}
            style={{
              ...TYPE.label,
              color: COLORS.textDark,
              opacity: 0.7,
              border: `1px solid rgba(27,27,27,0.15)`,
              borderRadius: 999,
              padding: "6px 14px",
            }}
          >
            {p}
          </span>
        ))}
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
      }}
    >
      <div
        style={{
          padding: isMobile ? "80px 24px 40px" : "120px 60px 60px",
          textAlign: "center",
        }}
      >
        <p style={{ ...TYPE.label, color: COLORS.silver, opacity: 0.7 }}>
          03 · Themes
        </p>
        <h2
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
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
              <SilkWave
                fill
                theme={theme}
                speed={0.006}
                noiseOpacity={0.02}
              />
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
                    ...TYPE.label,
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
                      ? "clamp(1.4rem, 5vw, 1.8rem)"
                      : "clamp(2rem, 3.5vw, 3rem)",
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

/* ---------- Section 4 · JS API ---------- */

function JSAPISection({ isMobile }: { isMobile: boolean }) {
  const [theme, setTheme] = useState<ThemeKey>("platinum")
  const textColor = THEME_TEXT_COLOR[theme]

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <SilkWave
        key={theme}
        fill
        theme={theme}
        speed={0.008}
        noiseOpacity={0.02}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: isMobile ? "120px 24px 80px" : "160px 60px 120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? 28 : 40,
          zIndex: 1,
        }}
      >
        <p style={{ ...TYPE.label, color: textColor, opacity: 0.7 }}>
          04 · JS API · setTheme()
        </p>

        <h2
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
            color: textColor,
            textAlign: "center",
            margin: 0,
          }}
        >
          Choose your fabric.
        </h2>

        <p
          style={{
            ...TYPE.tag,
            color: textColor,
            opacity: 0.75,
            textAlign: "center",
            margin: 0,
            maxWidth: 620,
          }}
        >
          Runtime theme switching without re-instantiating.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginTop: 8,
          }}
        >
          {THEME_ORDER.map((t) => {
            const active = theme === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                style={{
                  ...TYPE.button,
                  background: active ? textColor : "transparent",
                  color: active
                    ? theme === "midnight"
                      ? COLORS.textDark
                      : COLORS.bgLight
                    : textColor,
                  border: `1px solid ${textColor}`,
                  borderRadius: 999,
                  padding: "9px 18px",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  textTransform: "capitalize",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 5 · React install ---------- */

function ReactInstallSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: COLORS.bgLight,
        color: COLORS.textDark,
        padding: isMobile ? "96px 24px" : "140px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 32 : 48,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 900 }}>
        <p style={{ ...TYPE.label, color: COLORS.textDark, opacity: 0.55 }}>
          05 · React
        </p>
        <h2
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
            color: COLORS.textDark,
            margin: "24px 0 0",
          }}
        >
          For React projects.
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: "100%",
          maxWidth: 820,
        }}
      >
        <CodeBlock code={REACT_INSTALL_SNIPPET} lightMode />
        <CodeBlock code={REACT_USAGE_SNIPPET} lightMode />
      </div>
    </section>
  )
}

/* ---------- Section 6 · Props ---------- */

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
        <p style={{ ...TYPE.label, color: COLORS.silver, opacity: 0.7 }}>
          06 · API
        </p>
        <h2
          style={{
            ...TYPE.h1,
            fontStyle: "italic",
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
              gridTemplateColumns: isMobile ? "1fr" : "180px 1fr 180px",
              gap: isMobile ? 10 : 24,
              padding: isMobile ? "24px 0" : "28px 0",
              borderTop: idx === 0 ? `1px solid ${COLORS.border}` : "none",
              borderBottom: `1px solid ${COLORS.border}`,
              alignItems: "baseline",
            }}
          >
            <div
              style={{
                ...TYPE.label,
                color: COLORS.text,
              }}
            >
              {p.name}
            </div>
            <div style={{ minWidth: 0 }}>
              <code
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.8rem",
                  color: COLORS.silver,
                  wordBreak: "break-word",
                }}
              >
                {p.type}
              </code>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: COLORS.silver,
                  marginTop: 10,
                  lineHeight: 1.55,
                }}
              >
                {p.desc}
              </p>
            </div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.75rem",
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

/* ---------- Section 8 · Footer ---------- */

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
      <div style={{ ...TYPE.label, color: COLORS.silver, opacity: 0.6 }}>
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
        <span style={{ ...TYPE.label, color: COLORS.silver, opacity: 0.6 }}>
          MIT License
        </span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...TYPE.label,
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
            ...TYPE.label,
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
            ...TYPE.label,
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
            ...TYPE.label,
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
        maxWidth: 820,
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
          ...TYPE.label,
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
          fontSize: "0.82rem",
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

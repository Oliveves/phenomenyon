import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  ScrollIndicator,
  type ScrollIndicatorVariant,
} from "@phenomenyon/components"
import { COLORS, FONT_MONO, FONT_SANS, FONT_SERIF, TYPE } from "../../theme"

const GITHUB_URL = "https://github.com/Oliveves/phenomenyon-components"
const RELEASE_URL =
  "https://github.com/Oliveves/phenomenyon-components/releases/tag/v0.3.0"

const REACT_INSTALL_SNIPPET = `npm install github:Oliveves/phenomenyon-components#v0.3.0`

const REACT_USAGE_SNIPPET = `import { ScrollIndicator } from "@phenomenyon/components"

export default function Hero() {
  return (
    <section style={{ position: "relative", height: "100vh" }}>
      {/* ...hero content... */}
      <div style={{ position: "absolute", bottom: 40, left: "50%",
                    transform: "translateX(-50%)" }}>
        <ScrollIndicator
          variant="mouse"
          onClick={() => window.scrollTo({
            top: window.innerHeight, behavior: "smooth",
          })}
        />
      </div>
    </section>
  )
}`

const COLOR_SNIPPET = `<ScrollIndicator
  variant="line"
  color="#1b1b1b"
  label="Discover"
  duration={2.4}
/>`

const PLATFORMS = ["React", "Next.js", "Remix", "Vite", "Astro (islands)"]

/* Detail-page typography overrides (matched to SilkWave / OrbitButton) */
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

const VARIANTS: { id: ScrollIndicatorVariant; label: string }[] = [
  { id: "mouse", label: "Mouse" },
  { id: "chevron", label: "Chevron" },
  { id: "line", label: "Line" },
]

type Surface = {
  id: string
  label: string
  blurb: string
  variant: ScrollIndicatorVariant
  panelBg: string
  panelText: string
  indicatorColor: string
}

const SURFACES: Surface[] = [
  {
    id: "ink",
    label: "Mouse",
    blurb: "Classic housing with a falling dot.",
    variant: "mouse",
    panelBg: "#0E0E0E",
    panelText: "#F0EDE8",
    indicatorColor: "#FFFFFF",
  },
  {
    id: "paper",
    label: "Chevron",
    blurb: "Stacked carets, gentle bob.",
    variant: "chevron",
    panelBg: "#ECEAE4",
    panelText: "#1b1b1b",
    indicatorColor: "#1b1b1b",
  },
  {
    id: "plum",
    label: "Line",
    blurb: "A travelling segment down a rail.",
    variant: "line",
    panelBg: "#1A0E1F",
    panelText: "#EFE0F2",
    indicatorColor: "#EFE0F2",
  },
]

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

export default function ScrollIndicatorPage() {
  const isMobile = useIsMobile()
  return (
    <div style={{ overflowX: "hidden", background: COLORS.bg }}>
      <FloatingNav />
      <HeroSection isMobile={isMobile} />
      <InstallSection isMobile={isMobile} />
      <VariantsShowcase isMobile={isMobile} />
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

/* ---------- Section 1 · Hero (matches SilkWave/OrbitButton) ---------- */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [variant, setVariant] = useState<ScrollIndicatorVariant>("mouse")

  const onScrollDown = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: COLORS.bg,
      }}
    >
      {/* top-left label */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? 88 : 96,
          left: isMobile ? 24 : 48,
          zIndex: 1,
          ...LABEL_LG,
          color: COLORS.text,
          opacity: 0.75,
          pointerEvents: "none",
        }}
      >
        01 · Scroll Indicator
      </div>

      {/* centered headline */}
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
            color: COLORS.text,
            margin: 0,
            textAlign: "center",
          }}
        >
          A gentle nudge down.
        </h1>
      </div>

      {/* live indicator, sitting where a real hero hint would */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: isMobile ? 128 : 156,
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <ScrollIndicator
          variant={variant}
          color={COLORS.text}
          onClick={onScrollDown}
        />
      </div>

      {/* variant switcher */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: isMobile ? 48 : 64,
          transform: "translateX(-50%)",
          display: "flex",
          gap: isMobile ? 24 : 60,
          zIndex: 2,
        }}
      >
        {VARIANTS.map((v) => {
          const active = v.id === variant
          return (
            <button
              key={v.id}
              type="button"
              aria-label={`${v.label} variant`}
              aria-pressed={active}
              onClick={() => setVariant(v.id)}
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
                color: COLORS.text,
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
              {v.id}
            </button>
          )
        })}
      </div>
    </section>
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
            Single React file. Zero runtime deps. Styles inject themselves.
            Free. MIT.
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
              Drop it in the hero.
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
              Tune it
            </p>
            <h2 style={{ ...H3_DETAIL, color: COLORS.textDark, margin: 0 }}>
              Match your surface.
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
              Set <code style={{ fontFamily: FONT_MONO }}>color</code> to sit on
              light or dark heroes,{" "}
              <code style={{ fontFamily: FONT_MONO }}>label</code> for the
              caption (<code style={{ fontFamily: FONT_MONO }}>\n</code> for
              multiline), and{" "}
              <code style={{ fontFamily: FONT_MONO }}>duration</code> to slow the
              loop. Respects{" "}
              <code style={{ fontFamily: FONT_MONO }}>prefers-reduced-motion</code>{" "}
              automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 3 · Variants showcase ---------- */

function VariantsShowcase({ isMobile }: { isMobile: boolean }) {
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
          03 · Variants
        </p>
        <h2 style={{ ...H2_DETAIL, color: COLORS.text, margin: "24px 0 0" }}>
          Three hints, one job.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {SURFACES.map((s) => (
          <div
            key={s.id}
            style={{
              position: "relative",
              width: "100%",
              minHeight: isMobile ? 240 : "clamp(280px, 40vh, 440px)",
              background: s.panelBg,
              color: s.panelText,
              padding: isMobile ? "48px 24px" : "0 60px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: isMobile ? 32 : 32,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: 460,
              }}
            >
              <span style={{ ...LABEL_LG, color: s.panelText, opacity: 0.85 }}>
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: isMobile
                    ? "clamp(1.6rem, 5vw, 2rem)"
                    : "clamp(2rem, 3.5vw, 3rem)",
                  color: s.panelText,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.blurb}
              </span>
            </div>

            <ScrollIndicator
              variant={s.variant}
              color={s.indicatorColor}
              label={s.label}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Section 4 · Props ---------- */

type PropRow = { name: string; type: string; def: string; desc: string }
const PROPS: PropRow[] = [
  {
    name: "variant",
    type: `"mouse" | "chevron" | "line"`,
    def: `"mouse"`,
    desc: "Glyph style: mouse housing, bouncing chevrons, or a traveling line segment.",
  },
  {
    name: "label",
    type: "string",
    def: `"Scroll"`,
    desc: "Caption under the glyph. Use \\n for multiple lines. Empty string hides it.",
  },
  {
    name: "ariaLabel",
    type: "string",
    def: `"Scroll to content"`,
    desc: "Accessible name for the button.",
  },
  {
    name: "onClick",
    type: "(e) => void",
    def: "—",
    desc: "Click handler. Typically scrolls to the next section.",
  },
  {
    name: "color",
    type: "string",
    def: `"#FFFFFF"`,
    desc: "Base color for glyph + label. Glyph uses reduced opacities of it.",
  },
  {
    name: "duration",
    type: "number (s)",
    def: "2",
    desc: "Glyph animation loop duration.",
  },
  {
    name: "fadeInDuration",
    type: "number (s)",
    def: "0.5",
    desc: "Fade-in duration on mount.",
  },
  {
    name: "fadeInDelay",
    type: "number (s)",
    def: "0",
    desc: "Delay before the fade-in starts.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Disable the button (drops the pointer cursor).",
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
          Release v0.3.0
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

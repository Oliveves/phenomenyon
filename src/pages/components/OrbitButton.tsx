import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { OrbitButton } from "@phenomenyon/components"
import {
  COLORS,
  FONT_MONO,
  FONT_SANS,
  FONT_SERIF,
  TYPE,
} from "../../theme"

const GITHUB_URL = "https://github.com/Oliveves/phenomenyon-components"
const RELEASE_URL =
  "https://github.com/Oliveves/phenomenyon-components/releases"

const REACT_USAGE_SNIPPET = `import OrbitButton from "./OrbitButton"

export default function CTA() {
  return (
    <>
      <OrbitButton variant="solid">Enter the field</OrbitButton>
      <OrbitButton variant="holographic">Reserve invitation</OrbitButton>
    </>
  )
}`

const REACT_INSTALL_SNIPPET = `# Download from GitHub
https://github.com/Oliveves/phenomenyon-components`

const COLORWAY_SNIPPET = `<OrbitButton
  variant="holographic"
  background="#1B1206"
  textColor="#F2E2C6"
  hologramColors={[
    "#FFE6A8",
    "#E8C58B",
    "#B68A4F",
    "#FFE6A8",
  ]}
>
  Champagne
</OrbitButton>`

const PLATFORMS = ["React", "Next.js", "Remix", "Vite", "Astro (islands)"]

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

type Colorway = {
  id: string
  label: string
  blurb: string
  variant: "solid" | "holographic"
  background: string
  textColor: string
  panelBg: string
  panelText: string
  accentColor?: string
  hologramColors?: string[]
}

const COLORWAYS: Colorway[] = [
  {
    id: "champagne",
    label: "Champagne",
    blurb: "Warm gold streak on lacquered ebony.",
    variant: "holographic",
    background: "#1B1206",
    textColor: "#F2E2C6",
    panelBg: "#1B1206",
    panelText: "#F2E2C6",
    hologramColors: ["#FFE6A8", "#E8C58B", "#B68A4F", "#FFE6A8"],
  },
  {
    id: "midnight",
    label: "Midnight",
    blurb: "Cool iridescent arc across blue-black.",
    variant: "holographic",
    background: "#0A0F1E",
    textColor: "#DCE7F5",
    panelBg: "#0A0F1E",
    panelText: "#DCE7F5",
    hologramColors: ["#A8C8FF", "#C8B6FF", "#B6FFEE", "#FFFFFF"],
  },
  {
    id: "plum",
    label: "Plum",
    blurb: "Soft violet streak over deep aubergine.",
    variant: "holographic",
    background: "#1A0E1F",
    textColor: "#EFE0F2",
    panelBg: "#1A0E1F",
    panelText: "#EFE0F2",
    hologramColors: ["#FFB6E1", "#C8B6FF", "#9D7DFF", "#FFB6E1"],
  },
  {
    id: "forest",
    label: "Forest",
    blurb: "Pale chlorophyll line on mossy ink.",
    variant: "solid",
    background: "#0B1810",
    textColor: "#D7EAD9",
    panelBg: "#0B1810",
    panelText: "#D7EAD9",
    accentColor: "#B8E8B0",
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

export default function OrbitButtonPage() {
  const isMobile = useIsMobile()
  return (
    <div style={{ overflowX: "hidden", background: COLORS.bg }}>
      <FloatingNav />
      <HeroSection isMobile={isMobile} />
      <InstallSection isMobile={isMobile} />
      <ColorwaysShowcase isMobile={isMobile} />
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

/* ---------- Section 1 · Hero with two button variants ---------- */

function HeroSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "120px 24px 96px" : "160px 60px 120px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isMobile ? 48 : 72,
          textAlign: "center",
        }}
      >
        <div>
          <p
            style={{
              ...LABEL_LG,
              color: COLORS.silver,
              opacity: 0.75,
              margin: 0,
            }}
          >
            04 · Orbit Button
          </p>
          <h1
            style={{
              ...TYPE.h1,
              fontStyle: "italic",
              color: COLORS.text,
              margin: "32px 0 0",
            }}
          >
            Light, in orbit.
          </h1>
          <p
            style={{
              ...TAG_LG,
              color: COLORS.silver,
              opacity: 0.8,
              margin: "28px auto 0",
              maxWidth: 620,
            }}
          >
            A button with a single streak of light tracing its edge — solid or
            holographic, paused by <code style={{ fontFamily: FONT_MONO }}>prefers-reduced-motion</code>.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 20 : 28,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrbitButton variant="solid">Enter the field</OrbitButton>
          <OrbitButton variant="holographic">Reserve invitation</OrbitButton>
        </div>
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
            <h2
              style={{
                ...H3_DETAIL,
                color: COLORS.textDark,
                margin: 0,
              }}
            >
              Drop in the file.
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
              Custom colorway
            </p>
            <h2
              style={{
                ...H3_DETAIL,
                color: COLORS.textDark,
                margin: 0,
              }}
            >
              Match your brand.
            </h2>
            <CodeBlock code={COLORWAY_SNIPPET} lightMode />
            <p
              style={{
                ...BODY_LG,
                color: COLORS.textDark,
                opacity: 0.8,
                margin: 0,
              }}
            >
              Override <code style={{ fontFamily: FONT_MONO }}>background</code>,{" "}
              <code style={{ fontFamily: FONT_MONO }}>textColor</code>, and either{" "}
              <code style={{ fontFamily: FONT_MONO }}>accentColor</code> (solid)
              or{" "}
              <code style={{ fontFamily: FONT_MONO }}>hologramColors</code>{" "}
              (holographic). Everything else has a sensible default.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Section 3 · Colorways showcase ---------- */

function ColorwaysShowcase({ isMobile }: { isMobile: boolean }) {
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
          03 · Colorways
        </p>
        <h2
          style={{
            ...H2_DETAIL,
            color: COLORS.text,
            margin: "24px 0 0",
          }}
        >
          Four moods, one streak.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {COLORWAYS.map((cw) => (
          <div
            key={cw.id}
            style={{
              position: "relative",
              width: "100%",
              minHeight: isMobile ? 220 : "clamp(260px, 38vh, 420px)",
              background: cw.panelBg,
              color: cw.panelText,
              padding: isMobile ? "48px 24px" : "0 60px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? 28 : 32,
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
              <span
                style={{
                  ...LABEL_LG,
                  color: cw.panelText,
                  opacity: 0.85,
                }}
              >
                {cw.label}
              </span>
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: isMobile
                    ? "clamp(1.6rem, 5vw, 2rem)"
                    : "clamp(2rem, 3.5vw, 3rem)",
                  color: cw.panelText,
                  letterSpacing: "-0.01em",
                }}
              >
                {cw.blurb}
              </span>
            </div>

            <OrbitButton
              variant={cw.variant}
              background={cw.background}
              textColor={cw.textColor}
              accentColor={cw.accentColor}
              hologramColors={cw.hologramColors}
            >
              {cw.label}
            </OrbitButton>
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
    type: `"solid" | "holographic"`,
    def: `"solid"`,
    desc: "Streak style. Solid = single accent color. Holographic = iridescent palette.",
  },
  {
    name: "duration",
    type: "number",
    def: "4",
    desc: "Seconds for one full orbit. Lower is faster.",
  },
  {
    name: "radius",
    type: "number",
    def: "18",
    desc: "Corner radius in px.",
  },
  {
    name: "thickness",
    type: "number",
    def: "1.5",
    desc: "Ring thickness in px.",
  },
  {
    name: "accentColor",
    type: "string",
    def: `"#FFFFFF"`,
    desc: `Streak color when variant="solid".`,
  },
  {
    name: "hologramColors",
    type: "string[]",
    def: `["#FFB6E1", "#C8B6FF", "#B6FFEE", "#FFE6A8"]`,
    desc: `Streak palette when variant="holographic".`,
  },
  {
    name: "streakWidth",
    type: "number (deg)",
    def: "40 / 140",
    desc: "Width of the bright arc in degrees. Defaults to 40 (solid) or 140 (holographic).",
  },
  {
    name: "streakPeak",
    type: "number (deg)",
    def: "110",
    desc: "Angular phase offset where the streak is centered.",
  },
  {
    name: "background",
    type: "string",
    def: `"#1A1A1A"`,
    desc: "Button fill. Override for light surfaces.",
  },
  {
    name: "textColor",
    type: "string",
    def: "currentColor",
    desc: "Label color. Defaults to inherited text color.",
  },
  {
    name: "paused",
    type: "boolean",
    def: "false",
    desc: "Freeze the streak in place without removing the ring.",
  },
  {
    name: "reverse",
    type: "boolean",
    def: "false",
    desc: "Reverse the orbit direction.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Standard disabled state (50% opacity, not-allowed cursor).",
  },
  {
    name: "fontFamily",
    type: "string",
    def: `"Barlow Semi Condensed", "Inconsolata", sans-serif`,
    desc: "Override to match your brand stack.",
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
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr 220px",
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
          Releases
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

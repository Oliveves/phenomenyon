export const FONT_SERIF = "'Imbue', 'Didot', 'Times New Roman', serif"
export const FONT_SANS =
  "'Barlow Semi Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const FONT_MONO = "'Inconsolata', monospace"

export const COLORS = {
  bg: "#080808",
  bgLight: "#f3f2ef",
  text: "#F0EDE8",
  textDark: "#1b1b1b",
  silver: "#C0C0C0",
  card: "#111111",
  border: "#1a1a1a",
  accent: "#aa3bff",
  muted: "#6B6B6B",
}

export const TYPE = {
  h1: {
    fontFamily: FONT_SERIF,
    fontWeight: 300,
    fontSize: "clamp(48px, 8.5vw, 118px)",
    lineHeight: 0.95,
    letterSpacing: "-0.01em",
  },
  tag: {
    fontFamily: FONT_SANS,
    fontSize: "17px",
    fontWeight: 300,
    letterSpacing: "0.03em",
  },
  label: {
    fontFamily: FONT_MONO,
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0",
    textTransform: "uppercase" as const,
  },
  button: {
    fontFamily: FONT_SANS,
    fontSize: "14px",
    fontWeight: 400,
  },
  body: {
    fontFamily: FONT_SANS,
    color: COLORS.textDark,
  },
}

export const SILKWAVE_THEMES = {
  champagne: {
    bg1: "#FFFFFF",
    bg2: "#F5F0E8",
    bg3: "#EDE4D0",
    lineColor: "180, 145, 60",
    glowColor: "255, 240, 180",
  },
  platinum: {
    bg1: "#FFFFFF",
    bg2: "#F2F4F6",
    bg3: "#E2E8ED",
    lineColor: "150, 170, 185",
    glowColor: "220, 235, 245",
  },
  blush: {
    bg1: "#FFFFFF",
    bg2: "#F9F0F0",
    bg3: "#EED8D8",
    lineColor: "190, 130, 130",
    glowColor: "255, 210, 200",
  },
  midnight: {
    bg1: "#0A0F1E",
    bg2: "#0D1528",
    bg3: "#111D35",
    lineColor: "80, 130, 200",
    glowColor: "100, 160, 255",
  },
}

export type ThemeKey = keyof typeof SILKWAVE_THEMES

export const THEME_TEXT_COLOR: Record<ThemeKey, string> = {
  champagne: COLORS.textDark,
  platinum: COLORS.textDark,
  blush: COLORS.textDark,
  midnight: COLORS.bgLight,
}

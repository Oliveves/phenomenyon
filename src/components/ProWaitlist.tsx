import { useState } from "react"
import { COLORS, FONT_SANS, FONT_SERIF, TYPE } from "../theme"
import { submitWaitlist, type WaitlistSource } from "../lib/supabase"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ProWaitlist({
  source,
  isMobile,
}: {
  source: WaitlistSource
  isMobile: boolean
}) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [errorMsg, setErrorMsg] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === "loading" || state === "success") return
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setState("error")
      setErrorMsg("Enter a valid email.")
      return
    }
    setState("loading")
    setErrorMsg("")
    const res = await submitWaitlist(trimmed, source)
    if (res.ok) {
      setState("success")
    } else {
      console.error("[waitlist]", res.error)
      setState("error")
      setErrorMsg("Something went wrong. Try again.")
    }
  }

  return (
    <section
      style={{
        width: "100vw",
        minHeight: "60vh",
        background: COLORS.bg,
        color: COLORS.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "80px 24px" : "120px 60px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <p
        style={{
          ...TYPE.label,
          color: COLORS.silver,
          marginBottom: 28,
        }}
      >
        Coming Soon
      </p>

      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.4rem)" : "clamp(2.2rem, 4.2vw, 3.6rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: COLORS.text,
          textAlign: "center",
          margin: 0,
          maxWidth: 820,
        }}
      >
        Premium components &amp; templates — for editorial brands.
      </h2>

      <p
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 300,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
          color: COLORS.silver,
          marginTop: 18,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Be the first to know when Pro launches.
      </p>

      {state === "success" ? (
        <p
          style={{
            ...TYPE.label,
            color: COLORS.text,
            marginTop: 8,
          }}
        >
          You&rsquo;re on the list.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "stretch",
            gap: isMobile ? 10 : 0,
            width: "100%",
            maxWidth: 460,
          }}
        >
          <input
            type="email"
            required
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === "error") setState("idle")
            }}
            disabled={state === "loading"}
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              borderRight: isMobile ? `1px solid ${COLORS.border}` : "none",
              borderTopLeftRadius: 999,
              borderBottomLeftRadius: isMobile ? 999 : 999,
              borderTopRightRadius: isMobile ? 999 : 0,
              borderBottomRightRadius: isMobile ? 999 : 0,
              padding: "12px 18px",
              color: COLORS.text,
              fontFamily: FONT_SANS,
              fontSize: "0.9rem",
              letterSpacing: "0.02em",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            style={{
              background: COLORS.text,
              color: COLORS.bg,
              border: `1px solid ${COLORS.text}`,
              borderTopLeftRadius: isMobile ? 999 : 0,
              borderBottomLeftRadius: isMobile ? 999 : 0,
              borderTopRightRadius: 999,
              borderBottomRightRadius: 999,
              padding: "12px 22px",
              fontFamily: FONT_SANS,
              fontWeight: 500,
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: state === "loading" ? "default" : "pointer",
              opacity: state === "loading" ? 0.6 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {state === "loading" ? "Sending…" : "Join waitlist"}
          </button>
        </form>
      )}

      {state === "error" && (
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "0.8rem",
            color: "#d07070",
            marginTop: 16,
          }}
        >
          {errorMsg}
        </p>
      )}
    </section>
  )
}

import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} | Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens duplicated here: next/og renders in isolation, without globals.css.
const ink = "#111111";
const paper = "#f6f1e7";
const yellow = "#ffd93d";
const coral = "#ff6b6b";
const lime = "#c8f04b";
const sky = "#7dd3fc";

// Fetch Space Grotesk as TTF (what next/og can rasterise) for just the glyphs we use.
async function loadGoogleFont(text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("font url not found");
  const res = await fetch(match[1]);
  if (!res.ok) throw new Error("font download failed");
  return res.arrayBuffer();
}

const badges = ["3RD YEAR", "FULL-STACK", "OPEN TO INTERNSHIPS"];
const ticker = ["FULL-STACK DEVELOPER", "TSEC MUMBAI", "OPEN TO INTERNSHIPS"];

export default async function Image() {
  const text = `${site.name}${site.tagline}${badges.join("")}${ticker.join("")}JK jaikukreja.vercel.app0123456789`;
  const fonts: { name: string; data: ArrayBuffer; weight: 700 }[] = [];
  try {
    fonts.push({ name: "Space Grotesk", data: await loadGoogleFont(text), weight: 700 });
  } catch {
    // Fall back to next/og's built-in font rather than failing the build.
  }

  const chip = (label: string, bg: string) => (
    <div
      key={label}
      style={{
        display: "flex",
        border: `4px solid ${ink}`,
        background: bg,
        boxShadow: `4px 4px 0 ${ink}`,
        padding: "8px 18px",
        fontSize: 22,
        letterSpacing: 2,
      }}
    >
      {label}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: paper,
          color: ink,
          fontFamily: "Space Grotesk",
          fontWeight: 700,
        }}
      >
        {/* Frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            margin: 36,
            marginBottom: 0,
            border: `6px solid ${ink}`,
            boxShadow: `14px 14px 0 ${ink}`,
            background: paper,
            padding: "44px 56px",
            position: "relative",
          }}
        >
          {/* Wordmark + site */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                border: `5px solid ${ink}`,
                background: yellow,
                boxShadow: `5px 5px 0 ${ink}`,
                fontSize: 32,
              }}
            >
              {site.initials}
            </div>
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, opacity: 0.7 }}>
              jaikukreja.vercel.app
            </div>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
            {chip(badges[0], paper)}
            {chip(badges[1], sky)}
            {chip(badges[2], lime)}
          </div>

          {/* Name with highlighter bar */}
          <div style={{ display: "flex", position: "relative", marginTop: 28, alignSelf: "flex-start" }}>
            <div
              style={{
                position: "absolute",
                left: -6,
                right: -6,
                bottom: 14,
                height: 34,
                background: yellow,
              }}
            />
            <div style={{ display: "flex", fontSize: 116, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          </div>

          <div style={{ display: "flex", fontSize: 34, marginTop: 22, opacity: 0.8, maxWidth: 900 }}>
            {site.tagline}
          </div>

          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              right: 56,
              bottom: 48,
              width: 120,
              height: 120,
              background: coral,
              border: `6px solid ${ink}`,
              boxShadow: `8px 8px 0 ${ink}`,
              transform: "rotate(-8deg)",
            }}
          />
        </div>

        {/* Ticker strip */}
        <div
          style={{
            display: "flex",
            marginTop: 44,
            background: ink,
            color: paper,
            fontSize: 26,
            letterSpacing: 3,
            padding: "16px 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 28, paddingLeft: 36 }}>
            {Array.from({ length: 3 }, () => ticker)
              .flat()
              .map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <span>{item}</span>
                  <div style={{ width: 14, height: 14, background: coral }} />
                </div>
              ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}

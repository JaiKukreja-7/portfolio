import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffd93d",
          border: "14px solid #111111",
          color: "#111111",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}

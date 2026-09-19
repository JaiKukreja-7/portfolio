import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// "JK" tile in the site's yellow with a hard border — matches the nav wordmark.
export default function Icon() {
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
          border: "6px solid #111111",
          color: "#111111",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}

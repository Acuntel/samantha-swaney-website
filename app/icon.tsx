import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// SS monogram favicon — oxblood circle, cream serif initials.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2B0A14",
        color: "#ffffff",
        fontSize: 16,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        fontWeight: 600,
        borderRadius: 6,
      }}
    >
      SS
    </div>,
    { ...size },
  );
}

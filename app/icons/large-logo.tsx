import { SvgIcon } from "@mui/joy";
import type { JSX } from "react";

export function LargeLogoIcon(): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 120 120">
      <defs>
        <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#8839ef", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#209fb5", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#1e66f5", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#04a5e5", stopOpacity: 1 }}
          />
        </linearGradient>
        <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "#40a02b", stopOpacity: 0.8 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#40a02b", stopOpacity: 0.2 }}
          />
        </radialGradient>
      </defs>

      {/* <!-- Outer keyboard keys arranged in a circle --> */}
      <rect
        x="45"
        y="10"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.7"
      />
      <rect
        x="70"
        y="18"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.6"
      />
      <rect
        x="85"
        y="40"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.5"
      />
      <rect
        x="85"
        y="65"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.6"
      />
      <rect
        x="70"
        y="87"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.7"
      />
      <rect
        x="45"
        y="95"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.8"
      />
      <rect
        x="20"
        y="87"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.7"
      />
      <rect
        x="5"
        y="65"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.6"
      />
      <rect
        x="5"
        y="40"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.5"
      />
      <rect
        x="20"
        y="18"
        width="16"
        height="16"
        rx="3"
        fill="url(#keyGradient)"
        opacity="0.6"
      />

      {/* <!-- Flow lines creating a spiral pattern --> */}
      <path
        d="M 30 30 Q 45 20 60 30 Q 90 45 90 60 Q 90 75 75 90 Q 60 90 45 90 Q 30 90 30 75 Q 30 60 45 60 Q 60 60 60 65"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />

      {/* <!-- Inner flow lines --> */}
      <path
        d="M 40 40 Q 50 35 60 40 Q 70 45 70 55 Q 70 65 60 70 Q 50 70 45 65 Q 40 60 45 55"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* <!-- Center element - typing indicator --> */}
      <circle cx="60" cy="60" r="8" fill="url(#centerGradient)" />
      <circle cx="60" cy="60" r="3" fill="#40a02b">
        <animate
          attributeName="r"
          values="3;6;3"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* <!-- Floating key elements with animation --> */}
      <rect
        x="25"
        y="50"
        width="8"
        height="8"
        rx="2"
        fill="#6c6f85"
        opacity="0.4"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 2,-2; 0,0"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      <rect
        x="80"
        y="50"
        width="8"
        height="8"
        rx="2"
        fill="#6c6f85"
        opacity="0.4"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -2,2; 0,0"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </rect>
    </SvgIcon>
  );
}

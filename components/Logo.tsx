export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 150 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 4-point diamond sparkle */}
      <path
        d="M12 1L14.2 8.8L22 11L14.2 13.2L12 21L9.8 13.2L2 11L9.8 8.8Z"
        fill="#C9A86A"
      />
      {/* Subtle vertical separator */}
      <line x1="29" y1="8" x2="29" y2="24" stroke="#C9A86A" strokeWidth="0.4" opacity="0.45" />
      {/* NIGHTLIFE — Cormorant Garamond serif */}
      <text
        x="37"
        y="17"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="14"
        fontWeight="600"
        fill="#C9A86A"
        letterSpacing="2.6"
      >
        NIGHTLIFE
      </text>
      {/* MILAN — Montserrat wide-tracked */}
      <text
        x="37"
        y="31"
        fontFamily="'Montserrat', 'Helvetica Neue', Arial, sans-serif"
        fontSize="8"
        fontWeight="300"
        fill="#C9A86A"
        letterSpacing="7.5"
      >
        MILAN
      </text>
    </svg>
  );
}

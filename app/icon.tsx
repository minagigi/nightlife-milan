import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#131009',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 4-point diamond sparkle — same path as Logo.tsx, scaled to fill 32x32 */}
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1L14.2 8.8L22 11L14.2 13.2L12 21L9.8 13.2L2 11L9.8 8.8Z"
            fill="#C9A86A"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}

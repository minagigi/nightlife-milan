import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 18,
          background: '#131009',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#DFC58E', // Champagne Gold
          fontWeight: 'bold',
          fontFamily: 'serif',
          borderRadius: '6px',
          border: '2px solid #DFC58E',
        }}
      >
        NM
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

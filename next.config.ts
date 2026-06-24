import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    const eventRedirects = [
      // Slug changes from June → July 2026 date updates
      ['elite-playclub-21-06-2026', 'elite-playclub-19-07-2026'],
      ['dinner-show-friday-55-milano-05-06-2026', 'dinner-show-friday-55-milano-03-07-2026'],
      ['dinner-show-venerdi-55-milano-05-06-2026', 'dinner-show-venerdi-55-milano-03-07-2026'],
      ['studio-55-saturday-06-06-2026', 'studio-55-saturday-04-07-2026'],
      ['studio-55-sabato-06-06-2026', 'studio-55-sabato-04-07-2026'],
      ['dirty-monday-repvblic-01-06-2026', 'dirty-monday-repvblic-06-07-2026'],
      ['repvblic-saturday-06-06-2026', 'repvblic-saturday-04-07-2026'],
      ['repvblic-sabato-06-06-2026', 'repvblic-sabato-04-07-2026'],
      ['11clubroom-saturday-06-06-2026', '11clubroom-saturday-04-07-2026'],
      ['11clubroom-sabato-06-06-2026', '11clubroom-sabato-04-07-2026'],
      ['11clubroom-fashion-week-saturday-20-06-2026', '11clubroom-saturday-18-07-2026'],
      ['11clubroom-sabato-fashion-week-20-06-2026', '11clubroom-sabato-18-07-2026'],
      ['church81-friday-dinner-show-05-06-2026', 'church81-friday-dinner-show-03-07-2026'],
      ['church81-dinner-show-venerdi-05-06-2026', 'church81-dinner-show-venerdi-03-07-2026'],
      ['church81-saturday-dinner-show-06-06-2026', 'church81-saturday-dinner-show-04-07-2026'],
      ['church81-dinner-show-sabato-06-06-2026', 'church81-dinner-show-sabato-04-07-2026'],
      ['terrazza21-sunset-aperitivo-06-06-2026', 'terrazza21-sunset-aperitivo-04-07-2026'],
      ['terrazza21-aperitivo-tramonto-06-06-2026', 'terrazza21-aperitivo-tramonto-04-07-2026'],
      ['terrazza21-mfw-aperitivo-20-06-2026', 'terrazza21-summer-aperitivo-18-07-2026'],
      ['terrazza21-aperitivo-mfw-20-06-2026', 'terrazza21-aperitivo-estivo-18-07-2026'],
      ['voya-rooftop-dj-night-07-06-2026', 'voya-rooftop-dj-night-05-07-2026'],
      ['voya-fashion-week-saturday-20-06-2026', 'voya-rooftop-saturday-18-07-2026'],
      ['voya-fashion-week-sabato-20-06-2026', 'voya-rooftop-sabato-18-07-2026'],
      ['apollo-friday-navigli-05-06-2026', 'apollo-friday-navigli-03-07-2026'],
      ['apollo-venerdi-navigli-05-06-2026', 'apollo-venerdi-navigli-03-07-2026'],
    ];

    return [
      ...eventRedirects.flatMap(([from, to]) => [
        { source: `/events/${from}`, destination: `/events/${to}`, permanent: false },
        { source: `/it/events/${from}`, destination: `/it/events/${to}`, permanent: false },
      ]),
    ];
  },
  // Hide the Next.js dev tools overlay (the floating "N" button) — dev-only, never shown in production
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://images.unsplash.com https://storage.googleapis.com https://www.googletagmanager.com https://img.magnific.com https://img.freepik.com https://ai-images.freepik.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com;",
          }
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [50, 65, 75],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.magnific.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ai-images.freepik.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.freepik.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.freepik.com', pathname: '/**' },
      { protocol: 'https', hostname: 'img.evbuc.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.evbuc.com', pathname: '/**' },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react'],
  },
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;

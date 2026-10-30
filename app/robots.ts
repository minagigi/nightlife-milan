import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/', '/private/'],
      },
      // Explicitly allow all major search engines
      { userAgent: 'Googlebot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Bingbot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Slurp', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      // Allow AI search crawlers — critical for ChatGPT, Perplexity, Claude, Gemini & Apple Intelligence indexing
      { userAgent: 'GPTBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'OAI-SearchBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'ChatGPT-User', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'ClaudeBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'anthropic-ai', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Claude-Web', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'PerplexityBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Google-Extended', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Applebot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Applebot-Extended', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Meta-ExternalAgent', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'Amazonbot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'CCBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
      { userAgent: 'YouBot', allow: ['/', '/llms.txt', '/llms-full.txt'] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

import type { MetadataRoute } from 'next';
import { collections } from '@/data/plugins';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prismaudiolabs.co';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Collection pages
  const collectionPages: MetadataRoute.Sitemap = collections.map((col) => ({
    url: `${baseUrl}/collections/${col.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Plugin pages
  const pluginPages: MetadataRoute.Sitemap = collections.flatMap((col) =>
    col.plugins.map((plugin) => ({
      url: `${baseUrl}/plugins/${plugin.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...collectionPages, ...pluginPages];
}

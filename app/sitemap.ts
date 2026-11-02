import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.dropskenya.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Add other routes as you build them, e.g.:
    // { url: 'https://www.dropskenya.com/about', lastModified: new Date(), priority: 0.8 },
  ]
}
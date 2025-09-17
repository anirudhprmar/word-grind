import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString()
  return [
    {
      url: 'https://wordgrind.top/',
      lastModified, 
      priority: 1,
      changeFrequency:'daily'
    },
    {
      url: 'https://wordgrind.top/pricing',
      lastModified,
      priority: 0.8,
      changeFrequency: 'monthly'
    }
  ]
}
import { type MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://wordgrind.top/',
      lastModified: new Date(),
      priority: 1,
    }
  ]
}
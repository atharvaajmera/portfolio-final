import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://atharva-portfolio.com"; // Replace with your actual domain

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#about`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#skills`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#projects`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/#contact`,
      changeFrequency: "yearly",
      priority: 0.7,
      lastModified: new Date(),
    },
  ];
}

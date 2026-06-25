import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://digital-twin-portfolio-weld-nu.vercel.app/sitemap.xml",
  };
}
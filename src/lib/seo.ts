import type { Metadata } from "next";

export default function seo(title: string, description: string): Metadata {
  return {
    title: `TaskFlow | ${title}`,
    description,
    generator: "Next.js",
    applicationName: "TaskFlow",
    referrer: "origin-when-cross-origin",
    keywords: [
      "task management",
      "productivity",
      "project management",
      "team collaboration",
    ],
    authors: [
      {
        name: "Imed Eddine Abderrahmane SLIMANI",
        url: "https://github.com/slimanimeddine",
      },
    ],
    creator: "Imed Eddine Abderrahmane SLIMANI",
    publisher: "Imed Eddine Abderrahmane SLIMANI",
  };
}

import { Metadata } from 'next'

export default function seo(title: string, description: string): Metadata {
  return {
    title: `AppName | ${title}`,
    description,
    generator: 'Next.js',
    applicationName: 'AppName',
    referrer: 'origin-when-cross-origin',
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    authors: [
      {
        name: 'Slimani Imed Eddine Abderrahmane',
        url: 'https://github.com/slimanimeddine',
      },
    ],
    creator: 'Slimani Imed Eddine Abderrahmane',
    publisher: 'Slimani Imed Eddine Abderrahmane',
  }
}

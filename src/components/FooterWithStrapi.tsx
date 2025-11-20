import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { GlobalData } from '@/lib/globalData'
import { getStrapiMediaUrl } from '@/lib/strapi'
import mechLogo from '@/images/mechanikos-logo.svg'

// Default navigation (fallback)
const defaultNavigation = [
  {
    title: 'Work',
    links: [
      { title: 'PBenterprise', href: '/case-study/PBenterprise' },
      { title: 'TM Payu', href: '/case-study/tm-payu' },
      { title: 'TM Data Lake', href: '/case-study/tm-data-lake' },
      { title: 'ANMS', href: '/case-study/anms' },
      { title: 'BMSS', href: '/case-study/bmss' },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/case-study',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Process', href: '/process' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {defaultNavigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface FooterProps {
  globalData?: GlobalData | null
}

export function FooterWithStrapi({ globalData }: FooterProps) {
  // Get logo from Strapi or use default
  const logoUrl = globalData?.footer?.logo?.image?.url
    ? getStrapiMediaUrl(globalData.footer.logo.image.url)
    : mechLogo

  const logoAlt = globalData?.footer?.logo?.image?.alternativeText || globalData?.footer?.logo?.label || 'Mechanikos'

  // Get footer text from Strapi or use default
  const footerText = globalData?.footer?.text || 
    `© MECHANIKOS SDN BHD - REG.1053509-U ${new Date().getFullYear()}`

  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            {/* Newsletter form can be added here if needed */}
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image
              src={logoUrl}
              alt={logoAlt}
              className="h-8 w-8"
              width={32}
              height={32}
            />
          </Link>
          <p className="text-sm text-neutral-700">{footerText}</p>
        </div>
      </FadeIn>
    </Container>
  )
}


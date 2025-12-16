import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { socialMediaProfiles } from '@/components/SocialMedia'
import mechLogo from '@/images/mechanikos-logo.svg'

const navigation = [
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
      { title: 'Career', href: '/career' },
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
        {navigation.map((section, sectionIndex) => (
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

export function Footer() {
  return (
    <Container as="footer" className="w-full bg-white pt-24 sm:pt-32 lg:pt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end"></div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image src={mechLogo} alt="Mechanikos" className="size-8" />
          </Link>
          <p className="text-sm text-neutral-700">
            © MECHANIKOS SDN BHD - REG.1053509-U {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import mechanikosHeroLogo from '@/images/mechanikos_hero_logo.svg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'
import { ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon, BriefcaseIcon } from '@heroicons/react/20/solid'

const clients = [
  ['Phobia', logoPhobiaLight],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Experience the future with Mechanikos. Our 360 marketing and AI technology services are powered by cutting-edge AI, delivering intelligent solutions for optimal strategies, enhanced engagement, and measurable growth."
        className="mt-24 sm:mt-32 lg:mt-0 xl:mt-0 2xl:mt-0"
      >
        <p>
        At Mechanikos we don’t just offer services, we offer solutions:
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-135 flex-none lg:w-180">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-132 lg:pl-4">
            <ListItem title="Tech">
              <ul className="list-disc list-inside space-y-2">
                <li>Software Development</li>
                <li>Data Intelligence Platform</li>
                <li>Mobile App Development</li>
                <li>Ai Software Development</li>
                <li>Website Development</li>
              </ul>
            </ListItem>
            <ListItem title="Analytics">
              <ul className="list-disc list-inside space-y-2">
                <li>Social Media Listening</li>
                <li>Ai Calling</li>
              </ul>
            </ListItem>
            <ListItem title="Growth Marketing">
              <ul className="list-disc list-inside space-y-2">
                <li>CRM</li>
                <li>SEM</li>
                <li>SEO</li>
                <li>Performance Marketing</li>
              </ul>
            </ListItem>
            <ListItem title="Creative Production">
              <ul className="list-disc list-inside space-y-2">
                <li>Creative</li>
                <li>Brand Identity</li>
                <li>Video & Audio Production</li>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Ai Audio Production</li>
                  </ul>
              </ul>
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

function Products() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-display text-base font-semibold">Products</h2>
          <p className="mt-2 font-display font-medium tracking-tight text-pretty text-neutral-950 sm:text-5xl text-4xl lg:text-balance">
          We’re not just in the business of offering solutions; we create products that cater to your needs.
          </p>
          {/* <p className="mt-6 text-lg/8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p> */}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                  <feature.icon aria-hidden="true" className="size-5 flex-none" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm/6 font-semibold hover:text-indigo-500">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

// function Clients() {
//   return (
//     <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
//       <Container>
//         <FadeIn className="flex items-center gap-x-8">
//           <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
//             We’ve worked with hundreds of amazing people
//           </h2>
//           <div className="h-px flex-auto bg-neutral-800" />
//         </FadeIn>
//         <FadeInStagger faster>
//           <ul
//             role="list"
//             className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
//           >
//             {clients.map(([client, logo]) => (
//               <li key={client}>
//                 <FadeIn>
//                   <Image src={logo} alt={client} unoptimized />
//                 </FadeIn>
//               </li>
//             ))}
//           </ul>
//         </FadeInStagger>
//       </Container>
//     </div>
//   )
// }

const features = [
  {
    name: 'Cerebrax',
    description:
      'Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu.',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    name: 'PENDAPAT',
    description:
      'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    name: 'MyBuletin',
    description:
      'Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod.',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    name: 'TRAS Auction',
    description:
      'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
    href: '#',
    icon: BriefcaseIcon
  },
]


export const metadata: Metadata = {
  description:
    'Mechanikos is a 360 marketing and AI technology agency. We build systems of growth — combining data, intelligence, creativity, and technology. Delivering intelligent solutions for optimal strategies, enhanced engagement, and measurable growth.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies()).slice(0, 8)

  return (
    <RootLayout>
      <Container className="relative mt-24 sm:mt-32 md:min-h-screen md:flex md:items-center md:justify-start md:mt-0 overflow-hidden">
        {/* Large background logo */}
        <div className="absolute inset-0 flex items-start m-9 justify-center pointer-events-none">
          <Image
            src={mechanikosHeroLogo}
            alt=""
            className="w-full max-w-7xl opacity-75"
            priority
            unoptimized
          />
        </div>
        
        {/* Content */}
        <FadeIn className="relative z-10 max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Data. Tech. Marketing.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
          Mechanikos is a 360 marketing and AI technology agency. We build systems of growth — combining data, intelligence, creativity, and technology. Delivering intelligent solutions for optimal strategies, enhanced engagement, and measurable growth.
          </p>
          <p className="mt-6 text-xl text-neutral-600">
          At the heart of Cyberjaya, is an award-winning agency that turns data into decisions. Strategy into results.
          </p>
        </FadeIn>
      </Container>

      <Services />

      <Products />

      {/* <Clients /> */}

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={
          { 
          name: 'Phobia', 
          logo: logoPhobiaDark 
          }
        }
      >
        Ready to Power Your Brand with 360 marketing and AI technology?
      </Testimonial>

      <ContactSection />
    </RootLayout>
  )
}

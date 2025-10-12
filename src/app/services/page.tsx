import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { RootLayout } from '@/components/RootLayout'

function ServiceCategory({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <FadeInStagger className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-3xl font-semibold text-neutral-950">
          {title}
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-10 border-t border-neutral-200 pt-10">
        {children}
      </div>
    </FadeInStagger>
  )
}

function ServiceList({
  title,
  services,
  subServices,
}: {
  title: string
  services: string[]
  subServices?: { [key: string]: string[] }
}) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-semibold text-neutral-950">
            {title}
          </h3>
        </div>
        <div className="lg:col-span-2">
          <ul className="space-y-4 text-base text-neutral-600">
            {services.map((service) => (
              <li key={service} className="flex items-start">
                <span className="mr-3 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-300" />
                <div className="flex-1">
                  <span className="font-medium text-neutral-950">{service}</span>
                  {subServices && subServices[service] && (
                    <ul className="mt-2 ml-4 space-y-2">
                      {subServices[service].map((subService) => (
                        <li key={subService} className="flex items-start text-sm">
                          <span className="mr-2 mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-200" />
                          <span>{subService}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Experience the future with Mechanikos. Our 360 marketing and AI technology services are powered by cutting-edge AI.',
}

export default function Services() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Our Services" title="Solutions that drive growth">
        <p>
          Experience the future with Mechanikos. Our 360 marketing and AI
          technology services are powered by cutting-edge AI, delivering
          intelligent solutions for optimal strategies, enhanced engagement, and
          measurable growth.
        </p>
      </PageIntro>

      <Container className="mt-16">
        <FadeIn>
          <p className="text-lg font-semibold text-neutral-950">
            At Mechanikos, we don't just offer services, we offer solutions:
          </p>
        </FadeIn>
      </Container>

      <Container>
        {/* Tech Services */}
        <ServiceCategory title="Tech">
          <ServiceList
            title="Development & AI"
            services={[
              'Software Development',
              'Data Intelligence Platform',
              'Mobile App Development',
              'AI Software Development',
              'Website Development',
            ]}
          />
        </ServiceCategory>

        {/* Analytics Services */}
        <ServiceCategory title="Analytics">
          <ServiceList
            title="Data & Insights"
            services={[
              'Social Media Listening',
              'AI-Agent Call Survey',
              'Customer & Audience Analytics',
              'Market & Competitor Analysis',
              'Insights & Reporting',
            ]}
          />
        </ServiceCategory>

        {/* Marketing Services */}
        <ServiceCategory title="Marketing">
          <ServiceList
            title="Digital Marketing"
            services={[
              'Performance Marketing',
              'CRM',
              'SEM',
              'SEO',
              'Social Media',
            ]}
            subServices={{
              'CRM': ['Customer Relationship Management'],
              'SEM': ['Search Engine Marketing'],
              'SEO': ['Search Engine Optimization'],
            }}
          />
          <ServiceList
            title="Brand & Communications"
            services={[
              'Event Marketing',
              'Brand Ideation',
              'PR & Communications',
              'Influencer & KOL Marketing',
            ]}
          />
        </ServiceCategory>

        {/* Creative Production Services */}
        <ServiceCategory title="Creative Production">
          <ServiceList
            title="Design & Content"
            services={[
              'Visual Design',
              'Brand Storytelling',
              'Brand Identity',
              'Motion Graphics & Animation',
              'Copywriting & Content Creation',
            ]}
          />
          <ServiceList
            title="Media Production"
            services={[
              'Video & Audio Production',
              'Creative Consultation',
            ]}
            subServices={{
              'Video & Audio Production': ['AI Video Production'],
            }}
          />
        </ServiceCategory>
      </Container>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-4xl bg-neutral-950 px-6 py-20 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl">
              <SectionIntro
                eyebrow="Ready to get started?"
                title="Let's build something amazing together"
                invert
              >
                <p>
                  Our team is ready to help you leverage AI and technology to
                  transform your business. Get in touch to discuss your project.
                </p>
              </SectionIntro>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}


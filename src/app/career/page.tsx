import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'
import { RootLayout } from '@/components/RootLayout'
// import { fetchGlobalData } from '@/lib/globalData'
import { careerPositions, type CareerPosition } from '@/lib/careerData'

function JobCard({ position }: { position: CareerPosition }) {
  return (
    <FadeIn>
      <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              <Link href={`/career/${position.id}`}>
                <span className="absolute inset-0 rounded-3xl" />
                {position.title}
              </Link>
            </h3>
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-neutral-600">
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {position.location}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                  <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                </svg>
                {position.type}
              </span>
            </p>
          </div>
          <span className="inline-flex items-center text-sm font-semibold text-neutral-950">
            View position
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </article>
    </FadeIn>
  )
}

function OpenPositions() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Open positions
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10">
        <Border as={FadeIn} />
        <div className="mt-10 grid grid-cols-1 gap-6">
          {careerPositions.map((position) => (
            <JobCard key={position.id} position={position} />
          ))}
        </div>
      </FadeInStagger>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Career',
  description:
    'Join the Mechanikos team. We are looking for talented individuals who want to create harmony between man and machine.',
}

export default async function Career() {
  // const globalData = await fetchGlobalData()

  return (
    // <RootLayout globalData={globalData}>
    <RootLayout>
      <PageIntro eyebrow="Career" title="Join our team">
        <p>
          Ready for the paradigm shift? Kick start a career fueled by innovation
          and technology. Contact us today and you can be part of the culture of
          “Engaging People, Driving Performance”.
        </p>
      </PageIntro>

      <OpenPositions />

      <ContactSection />
    </RootLayout>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { careerPositions, type CareerPosition } from '@/lib/careerData'
import { ApplicationModal } from '@/components/ApplicationModal'

function JobMeta({ position }: { position: CareerPosition }) {
  return (
    <FadeIn>
      <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-neutral-950">Location</dt>
          <dd className="mt-1 text-neutral-600">
            {position.location}, Malaysia
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-neutral-950">Employment Type</dt>
          <dd className="mt-1 text-neutral-600">{position.type}</dd>
        </div>
        <div>
          <dt className="font-semibold text-neutral-950">Experience</dt>
          <dd className="mt-1 text-neutral-600">{position.experience}</dd>
        </div>
      </dl>
    </FadeIn>
  )
}

function JobDetails({ position }: { position: CareerPosition }) {
  return (
    <div className="space-y-16">
      {/* Description */}
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          About this role
        </h2>
        <div className="mt-6 space-y-6 text-base text-neutral-600">
          {position.description.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </FadeIn>

      {/* Responsibilities */}
      <FadeIn>
        <Border />
        <h2 className="mt-10 font-display text-2xl font-semibold text-neutral-950">
          Responsibilities
        </h2>
        <ul className="mt-6 space-y-4 text-base text-neutral-600">
          {position.responsibilities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1.5 mr-4 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-950" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </FadeIn>

      {/* Skills */}
      <FadeIn>
        <Border />
        <h2 className="mt-10 font-display text-2xl font-semibold text-neutral-950">
          Requirements
        </h2>
        <ul className="mt-6 space-y-4 text-base text-neutral-600">
          {position.skills.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1.5 mr-4 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-950" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  )
}

function ApplySection({
  position,
  onApply,
}: {
  position: CareerPosition
  onApply: () => void
}) {
  return (
    <FadeIn>
      <div className="sticky top-8 rounded-3xl bg-neutral-50 p-8">
        <h3 className="font-display text-lg font-semibold text-neutral-950">
          Interested in this role?
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          We&apos;d love to hear from you. Submit your application and
          we&apos;ll get back to you soon.
        </p>
        <Button onClick={onApply} className="mt-6 w-full justify-center">
          Apply now
        </Button>
      </div>
    </FadeIn>
  )
}

export default function CareerPosition() {
  const params = useParams()
  const [globalData, setGlobalData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // useEffect(() => {
  //   async function loadGlobalData() {
  //     const { fetchGlobalData } = await import('@/lib/globalData')
  //     const data = await fetchGlobalData()
  //     setGlobalData(data)
  //   }
  //   loadGlobalData()
  // }, [])

  const position = careerPositions.find((p) => p.id === params.slug)

  if (!position) {
    notFound()
  }

  return (
    // <RootLayout globalData={globalData}>
    <RootLayout>
      <PageIntro eyebrow="Career" title={position.title}>
        <p>
          <Link
            href="/career"
            className="text-neutral-600 transition hover:text-neutral-950"
          >
            ← Back to all positions
          </Link>
        </p>
      </PageIntro>

      <Container className="mt-16">
        <JobMeta position={position} />
      </Container>

      <Container className="mt-24 sm:mt-32">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <JobDetails position={position} />
          </div>
          <div className="lg:col-span-1">
            <ApplySection
              position={position}
              onApply={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </Container>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        positionTitle={position.title}
      />
    </RootLayout>
  )
}

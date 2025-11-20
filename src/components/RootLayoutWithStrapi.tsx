'use client'

import { createContext, useContext, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { FooterWithStrapi } from '@/components/FooterWithStrapi'
import { GridPattern } from '@/components/GridPattern'
import { HeaderWithStrapi } from '@/components/HeaderWithStrapi'
import { GlobalData } from '@/lib/globalData'

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

interface RootLayoutInnerProps {
  children: React.ReactNode
  globalData?: GlobalData | null
}

function RootLayoutInner({ children, globalData }: RootLayoutInnerProps) {
  let shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white"
      >
        <motion.div layout className="relative isolate flex w-full flex-col">
          <GridPattern
            className="absolute inset-x-0 top-0 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-neutral-950/5"
            yOffset={-96}
            interactive
          />

          <HeaderWithStrapi globalData={globalData} />

          <main className="w-full flex-auto">{children}</main>

          <FooterWithStrapi globalData={globalData} />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

interface RootLayoutProps {
  children: React.ReactNode
  globalData?: GlobalData | null
}

export function RootLayoutWithStrapi({ children, globalData }: RootLayoutProps) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname} globalData={globalData}>
        {children}
      </RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}



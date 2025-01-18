'use client'

import { motion } from 'framer-motion'
import { TopBanner } from '@/components/top-banner'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Footer } from '@/components/footer'
import { OnboardingGuide } from '@/components/onboarding-guide'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.48, 0.15, 0.25, 0.96] }
}

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 to-orange-100 text-black"
    >
      <motion.div {...fadeInUp}>
        <TopBanner />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <Navbar />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
        <Hero />
      </motion.div>
      <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="mt-auto">
        <Footer />
      </motion.div>
      <OnboardingGuide />
    </motion.div>
  )
}


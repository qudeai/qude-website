import { TopBanner } from './components/top-banner'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { Footer } from './components/footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 to-orange-100 text-black">
      <TopBanner />
      <Navbar />
      <Hero />
      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  )
}


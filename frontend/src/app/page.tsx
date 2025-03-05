import Chat from '../components/chat'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/Hero'
import AboutProject from '@/components/AboutProject'
import AboutNITH from '@/components/AboutNIT'
import AboutMamta from '@/components/AboutMA'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutProject />
      <AboutNITH />
      <AboutMamta />
      <h1 className="text-center text-3xl font-bold mb-4 mt-8">Come Test Our Model</h1>
      <Chat/>
    </main>
  )
}

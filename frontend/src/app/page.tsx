import Image from 'next/image'
import Link from 'next/link'
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
    </main>
  )
}

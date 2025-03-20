"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className={`sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container flex items-center justify-between px-4 py-6 mx-auto"> {/* Increased padding here */}
        <div className="flex items-center">
          <Image
            src="/pics/logo.png"
            alt="NIT Hamirpur Logo"
            width={60}
            height={60}
            className="mr-3"
          />
            <span className="text-2xl font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>NIT Hamirpur</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <button onClick={() => scrollToSection("hero")} className="text-black hover:text-gray-600 transition-colors">
            Home
          </button>
          <button
            onClick={() => scrollToSection("about-project")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About Project
          </button>
          <button
            onClick={() => scrollToSection("about-nith")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About NITH
          </button>
          <button
            onClick={() => scrollToSection("about-mamta")}
            className="text-black hover:text-gray-600 transition-colors"
          >
            About Mamta Awasthi
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container px-4 py-3 mx-auto space-y-2">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about-project")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              Project
            </button>
            <button
              onClick={() => scrollToSection("about-nith")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              About NITH
            </button>
            <button
              onClick={() => scrollToSection("about-mamta")}
              className="block w-full text-left py-2 text-black hover:text-gray-600 transition-colors"
            >
              About Mamta Awasthi
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
